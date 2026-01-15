# Sécurité de l'implémentation Google SSO

## ✅ Ce qui est déjà sécurisé :

1. **OAuth 2.0 de Google** : Protocole standard et éprouvé
2. **Vérification serveur activée** : Les tokens sont vérifiés
3. **Pas de mots de passe** : Vous ne gérez pas de secrets utilisateurs
4. **HTTPS en production** : À condition de déployer sur HTTPS

## ⚠️ Limitations actuelles (OK pour DEV, pas pour PRODUCTION) :

### 1. Session côté client uniquement
```typescript
// ❌ Actuel : Stockage en localStorage
localStorage.setItem('auth_user', JSON.stringify(user))

// ✅ Production : Session serveur + cookies HTTP-only
setCookie(event, 'session_id', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax'
})
```

**Risque** : L'utilisateur peut modifier son rôle dans localStorage

### 2. Rôles basés sur email pattern
```typescript
// ❌ Actuel : N'importe qui avec "alice" dans l'email devient admin
if (email.includes('alice')) return 'admin'

// ✅ Production : Rôles en base de données
const user = await db.users.findOne({ email })
return user?.role || 'developpeur'
```

**Risque** : Quelqu'un avec "alice@gmail.com" pourrait devenir admin

### 3. Pas de révocation de tokens
Si un utilisateur se déconnecte, son token Google reste valide jusqu'à expiration

### 4. Pas de whitelist d'emails/domaines
N'importe qui avec un compte Google peut se connecter

## 🔒 Pour sécuriser en PRODUCTION :

### Option 1 : Session serveur simple (recommandé pour commencer)

```bash
bun add h3-session
```

```typescript
// server/utils/session.ts
import { useSession } from 'h3'

export async function requireAuth(event: H3Event) {
  const session = await useSession(event, {
    password: process.env.SESSION_SECRET || 'change-me-in-production'
  })
  
  const user = await session.data.user
  
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
  
  return user
}
```

### Option 2 : Base de données + JWT (pour échelle)

```typescript
// 1. Après vérification Google, chercher en DB
const dbUser = await db.users.findOne({ 
  googleId: claims.sub,
  email: claims.email 
})

// 2. Vérifier que l'utilisateur est autorisé
if (!dbUser || !dbUser.isActive) {
  throw createError({ statusCode: 403 })
}

// 3. Créer un JWT ou session
const token = signJWT({ userId: dbUser.id, role: dbUser.role })
```

### Option 3 : Whitelist d'emails/domaines

```typescript
// server/utils/auth.ts
const ALLOWED_DOMAINS = ['company.com', 'trusted-partner.com']
const ALLOWED_EMAILS = ['alice@gmail.com', 'bob@gmail.com']

export function isEmailAllowed(email: string): boolean {
  const domain = email.split('@')[1]
  return ALLOWED_DOMAINS.includes(domain) || 
         ALLOWED_EMAILS.includes(email)
}
```

## 🎯 Recommandations par priorité :

### Minimum viable (avant production) :
1. ✅ Ajouter une whitelist d'emails autorisés
2. ✅ Stocker les rôles en base de données
3. ✅ Utiliser des sessions serveur (cookies HTTP-only)

### Idéal pour production :
4. ✅ Ajouter une base de données pour les utilisateurs
5. ✅ Implémenter la révocation de sessions
6. ✅ Logger les connexions
7. ✅ Rate limiting sur les endpoints d'auth
8. ✅ Monitoring et alertes

## 📝 Verdict :

**Pour développement/prototype** : ✅ **OK, c'est suffisant**

**Pour production avec données sensibles** : ⚠️ **Nécessite des améliorations**

**Pour production simple (blog, portfolio)** : ✅ **Acceptable avec whitelist d'emails**

**Pour production entreprise** : ❌ **Nécessite session serveur + DB + monitoring**

## 🚀 Quick Wins pour améliorer maintenant :

Ajoutez au minimum une whitelist d'emails autorisés :

```typescript
// Dans useAuth.ts
const ALLOWED_EMAILS = [
  'alice.dupont@company.com',
  'bob.martin@company.com',
  // ... vos emails autorisés
]

const handleGoogleSignIn = (googleClaims: any) => {
  if (!ALLOWED_EMAILS.includes(googleClaims.email)) {
    throw new Error('Email non autorisé')
  }
  // ... reste du code
}
```

Voulez-vous que j'implémente une de ces solutions de sécurité ?
