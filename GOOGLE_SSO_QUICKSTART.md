# Google SSO Quick Start

## ⚡ Quick Setup (5 minutes)

### 1. Get Your Google Client ID

1. Visit [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client ID (Web application)
3. Add to **Authorized JavaScript origins**: `http://localhost:3000`
4. Copy your Client ID

### 2. Configure Your App

Edit `.env`:
```env
NUXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR-CLIENT-ID.apps.googleusercontent.com
```

### 3. Start Testing

```bash
bun run dev
```

Visit `http://localhost:3000/login` and click the Google Sign-In button!

---

## 📝 How It Works

### Login Flow

1. User clicks Google Sign-In button on `/login` page
2. Google popup opens for authentication
3. After success, `onSuccess` handler receives user claims
4. `handleGoogleSignIn()` creates local user with role mapping
5. User is stored in localStorage and redirected to home

### Files Modified

- ✅ **nuxt.config.ts** - Added `nuxt-google-auth` module
- ✅ **login.vue** - Using `<GoogleLoginButton>` component
- ✅ **useAuth.ts** - Added `handleGoogleSignIn()` function
- ✅ **.env** - Environment variable for Client ID

### Role Assignment

Email domain determines user role:
- `alice.*@*` → Admin
- `bob.*@*` → Chef de Projet  
- `charlie.*@*` → Développeur
- `diana.*@*` or `eva.*@*` → CSM/DT/DTA
- Others → Développeur (default)

---

## 🎯 Usage Examples

### In Components

```vue
<script setup>
const { isAuthenticated, currentUser, logout } = useAuth()
</script>

<template>
  <div v-if="isAuthenticated">
    <p>Welcome {{ currentUser?.name }}!</p>
    <button @click="logout">Logout</button>
  </div>
</template>
```

### Check Permissions

```vue
<script setup>
const { hasRole, hasPermission } = useAuth()
</script>

<template>
  <button v-if="hasRole('admin')">Admin Panel</button>
  <button v-if="hasPermission('manage_projects')">New Project</button>
</template>
```

### Protected Routes

```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})
```

---

## 🔧 Button Customization

```vue
<GoogleLoginButton
  :verify-on-server="true"
  :options="{ 
    theme: 'filled_blue',        // 'outline' | 'filled_blue' | 'filled_black'
    size: 'large',               // 'small' | 'medium' | 'large'
    text: 'signin_with',         // 'signin_with' | 'signup_with' | 'continue_with'
    shape: 'rectangular',        // 'rectangular' | 'pill' | 'circle' | 'square'
    width: 350                   // Width in pixels
  }"
  @success="onSuccess"
  @verified="onVerified"
  @error="onError"
/>
```

---

## 🚨 Common Issues

### Button Not Showing
- Check `.env` has correct `NUXT_PUBLIC_GOOGLE_CLIENT_ID`
- Restart dev server after changing `.env`
- Check browser console for errors

### "Invalid origin" Error
- Add `http://localhost:3000` to Google Console authorized origins
- Match exactly (no trailing slash, correct protocol)

### User Role Not Working
- Edit `getRoleByEmail()` in `app/composables/useAuth.ts`
- Check email pattern matching logic

---

## 📚 Documentation

Full documentation: [GOOGLE_SSO_SETUP.md](./GOOGLE_SSO_SETUP.md)

Module docs: [nuxt-google-auth](https://nuxt.com/modules/nuxt-google-auth)

---

## ✅ Checklist

- [ ] Created Google OAuth Client ID
- [ ] Added Client ID to `.env`
- [ ] Added `http://localhost:3000` to authorized origins in Google Console
- [ ] Started dev server
- [ ] Tested login flow
- [ ] Customized role mapping (optional)

---

**Need help?** Check the full setup guide: `GOOGLE_SSO_SETUP.md`
