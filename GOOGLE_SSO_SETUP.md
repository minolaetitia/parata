# Google SSO Setup Guide (nuxt-google-auth)

This guide explains how to set up Google Single Sign-On using the `nuxt-google-auth` module.

## ✅ What's Already Done

The module has been installed and configured:
- ✅ `nuxt-google-auth` package installed
- ✅ Nuxt config updated with googleAuth settings
- ✅ Login page with GoogleLoginButton component
- ✅ Auth composable updated to handle Google authentication
- ✅ Environment variables templates created

## 📋 Setup Steps

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Configure OAuth consent screen if prompted:
   - User Type: External (or Internal for Google Workspace)
   - Fill in App name, user support email, and developer contact
   - Add scopes: `userinfo.email` and `userinfo.profile`
   - Save and continue

### 2. Create OAuth 2.0 Client ID

1. Application type: **Web application**
2. Name: `Parata Web Client`
3. **Authorized JavaScript origins:**
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
4. **Authorized redirect URIs:**
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
5. Click **Create**
6. Copy the **Client ID** (you won't need the Client Secret for this module)

### 3. Configure Environment Variables

Open `.env` file and add your Client ID:

```env
NUXT_PUBLIC_GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
```

**Important:** Never commit the `.env` file to version control!

### 4. Test the Integration

1. Start the development server:
```bash
bun run dev
```

2. Navigate to `http://localhost:3000/login`
3. Click the Google Sign-In button
4. Authorize the application
5. You should be redirected to the home page

## 🔧 Configuration Details

### Nuxt Config (nuxt.config.ts)

```typescript
export default defineNuxtConfig({
  modules: ["nuxt-google-auth"],
  
  googleAuth: {
    clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    autoLoadScript: true,        // Automatically load Google's GSI script
    promptOneTap: false,          // Disable One Tap prompt
    enableServerVerify: true      // Enable server-side token verification
  }
})
```

### Login Component

The login page uses the `GoogleLoginButton` component:

```vue
<GoogleLoginButton
  :verify-on-server="true"
  :options="{ 
    theme: 'filled_blue', 
    size: 'large',
    width: 350
  }"
  @success="onSuccess"
  @verified="onVerified"
  @error="onError"
/>
```

**Events:**
- `@success` - Fires when Google returns credentials
- `@verified` - Fires after server verification (when verify-on-server is true)
- `@error` - Fires on any error

### Auth Composable

The `useAuth()` composable has been updated:

```typescript
const { 
  currentUser,          // Current authenticated user
  isAuthenticated,      // Boolean authentication status
  isLoading,           // Loading state
  handleGoogleSignIn,  // Process Google sign-in
  logout,              // Logout function
  checkAuth,           // Check authentication status
  hasRole,             // Check user role
  hasPermission        // Check user permission
} = useAuth()
```

## 👤 User Role Mapping

Users are automatically assigned roles based on their email:

| Email Pattern | Role | Permissions |
|--------------|------|-------------|
| `alice.*` | `admin` | Full system access |
| `bob.*` | `chef_projet` | Project management |
| `charlie.*` | `developpeur` | Developer access |
| `diana.*` or `eva.*` | `csm_dt_dta` | Customer success/technical |
| Others | `developpeur` | Default developer access |

### Customize Role Mapping

Edit the `getRoleByEmail` function in `app/composables/useAuth.ts`:

```typescript
const getRoleByEmail = (email: string): UserRole => {
  // Add your custom logic
  if (email.endsWith('@admin.company.com')) return 'admin'
  if (email.endsWith('@manager.company.com')) return 'chef_projet'
  return 'developpeur'
}
```

## 🔐 Security Features

### Server-Side Verification

With `verify-on-server: true`, the ID token is verified on the server using the `/api/auth/google/verify` endpoint provided by the module.

### Session Management

The module handles token verification, but session persistence is managed in `localStorage`:

```typescript
// Stored in localStorage
{
  id: "google-user-id",
  email: "user@example.com",
  name: "User Name",
  avatar: "https://...",
  role: "developpeur",
  createdAt: 1234567890
}
```

## 🎨 Customizing the Login Button

You can customize the Google button appearance using the `options` prop:

```vue
<GoogleLoginButton
  :options="{ 
    theme: 'outline' | 'filled_blue' | 'filled_black',
    size: 'large' | 'medium' | 'small',
    text: 'signin_with' | 'signup_with' | 'continue_with' | 'signin',
    shape: 'rectangular' | 'pill' | 'circle' | 'square',
    width: 350,  // Width in pixels
    logo_alignment: 'left' | 'center'
  }"
/>
```

## 🚀 Production Deployment

### 1. Update Google Console

Add your production domain to:
- Authorized JavaScript origins: `https://yourdomain.com`
- Authorized redirect URIs: `https://yourdomain.com`

### 2. Set Environment Variables

On your hosting platform (Vercel, Netlify, etc.), set:
```
NUXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

### 3. Enable HTTPS

Always use HTTPS in production for secure authentication.

## 🐛 Troubleshooting

### "Popup closed by user" Error

**Cause:** User closed the Google sign-in popup before completing authentication.

**Solution:** This is normal user behavior, handle it gracefully in your error handler.

### "Invalid origin" Error

**Cause:** The origin isn't authorized in Google Console.

**Solution:** 
1. Check authorized origins match exactly (no trailing slashes)
2. Make sure you're using the correct protocol (http/https)
3. For localhost, use `http://localhost:3000` not `http://127.0.0.1:3000`

### Button Not Showing

**Cause:** Google script not loaded or Client ID missing.

**Solution:**
1. Verify `NUXT_PUBLIC_GOOGLE_CLIENT_ID` is set in `.env`
2. Check browser console for errors
3. Ensure `autoLoadScript: true` in nuxt.config.ts

### "Script load failed" Error

**Cause:** Network error or blocked by ad blocker.

**Solution:**
1. Check your internet connection
2. Disable ad blockers temporarily
3. Check browser console for CORS errors

## 📚 API Reference

### GoogleLoginButton Props

```typescript
interface GoogleLoginButtonProps {
  verifyOnServer?: boolean    // Enable server verification
  options?: {
    theme?: 'outline' | 'filled_blue' | 'filled_black'
    size?: 'large' | 'medium' | 'small'
    text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
    shape?: 'rectangular' | 'pill' | 'circle' | 'square'
    width?: number
    logo_alignment?: 'left' | 'center'
  }
}
```

### Events

```typescript
// @success event payload
{
  credential: string,  // JWT ID token
  claims: {
    sub: string,       // Google user ID
    email: string,
    name: string,
    picture: string,
    email_verified: boolean,
    ...
  }
}

// @verified event payload (when verifyOnServer is true)
{
  valid: boolean,
  payload: { ...claims }
}
```

### useGoogleAuth Composable (Advanced)

If you need more control, use the module's built-in composable:

```typescript
const { 
  credential,        // Ref<string | null> - JWT token
  payload,          // Ref<any | null> - Decoded claims
  renderButton,     // (el: HTMLElement, options?) => void
  verifyOnServer    // () => Promise<any>
} = useGoogleAuth()
```

## 🔄 Migration from Mock Auth

Your existing RBAC and permission system continues to work:

```vue
<script setup>
const { hasRole, hasPermission } = useAuth()

// Still works the same way
if (hasRole('admin')) {
  // Admin only
}

if (hasPermission('manage_projects')) {
  // Can manage projects
}
</script>
```

## 📖 Additional Resources

- [nuxt-google-auth Documentation](https://nuxt.com/modules/nuxt-google-auth)
- [Google Identity Services](https://developers.google.com/identity/gsi/web)
- [Google Cloud Console](https://console.cloud.google.com/)

## 💡 Tips

1. **Testing with Multiple Accounts**: Use Chrome profiles to test different user roles
2. **Development**: Keep `promptOneTap: false` to avoid annoying popups during development
3. **Production**: Consider enabling `promptOneTap: true` for better UX
4. **Logout**: Clear `localStorage` on logout to ensure clean state

## 🎯 Next Steps

- [ ] Get Google OAuth Client ID from Google Cloud Console
- [ ] Update `.env` with your Client ID
- [ ] Test login flow
- [ ] Customize role mapping for your organization
- [ ] Configure production environment
- [ ] Implement session persistence with a backend (optional)
- [ ] Add logout functionality to your app's UI
