# Prochaines étapes - Parata

## ✅ Ce qui a été fait

- ✅ Architecture Nuxt 4 avec sidebar et navigation
- ✅ Pages principales (Dashboard, Projets, Équipe, Stock, Historique)
- ✅ Interface Google OAuth (mockée)
- ✅ Système RBAC complet avec 4 rôles
- ✅ Middleware d'authentification et permissions
- ✅ Composants UI shadcn-vue intégrés
- ✅ Données mockées avec localStorage
- ✅ Design responsive avec Tailwind CSS

---

## 🚀 Phase 1: Connexion à Google OAuth (Interface → Intégration réelle)

### Étapes
1. **Créer les credentials Google**:
   - Aller sur [Google Cloud Console](https://console.cloud.google.com/)
   - Créer un nouveau projet
   - Créer des credentials OAuth 2.0
   - Obtenir: Client ID, Client Secret, Redirect URL

2. **Installer le module d'auth**:
   ```bash
   npm install @auth/nuxt
   ```

3. **Configurer dans `nuxt.config.ts`**:
   ```typescript
   export default defineNuxtConfig({
     modules: ['@auth/nuxt'],
     auth: {
       baseURL: process.env.AUTH_ORIGIN,
       provider: {
         type: 'oauth'
       },
       globalAppMiddleware: false
     },
     runtimeConfig: {
       auth: {
         secret: process.env.NUXT_AUTH_SECRET,
         origin: process.env.NUXT_AUTH_ORIGIN,
       }
     }
   })
   ```

4. **Variables d'environnement**:
   ```env
   NUXT_AUTH_SECRET=your_random_secret_key_here
   NUXT_AUTH_ORIGIN=http://localhost:3000
   NUXT_AUTH_GOOGLE_ID=your_client_id
   NUXT_AUTH_GOOGLE_SECRET=your_client_secret
   ```

5. **Remplacer la page login.vue**:
   ```vue
   <script setup>
   const { signIn, status } = useAuth()
   
   const handleGoogleSignIn = async () => {
     await signIn('google', { redirect: false })
   }
   </script>
   ```

---

## 🗄️ Phase 2: Base de données PostgreSQL + Prisma

### 1. Installer Prisma

```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

### 2. Connecter une base de données

**Option A**: Neon (Recommended)
- Créer un compte sur [Neon](https://neon.tech/)
- Copier la connection string
- Mettre dans `.env`:
  ```env
  DATABASE_URL="postgresql://user:password@host/database"
  ```

**Option B**: PostgreSQL local
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/parata"
```

### 3. Créer le schéma Prisma

Fichier: `prisma/schema.prisma`

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User model
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  avatar    String?
  role      Role     @default(DEVELOPPEUR)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  projects      Project[]
  materials     Material[]
  assignments   TeamMember[]
  comments      Comment[]
  historyEvents HistoryEvent[]
}

enum Role {
  ADMIN
  CHEF_PROJET
  DEVELOPPEUR
  CSM_DT_DTA
}

// Project model
model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  status      ProjectStatus @default(PLANNED)
  startDate   DateTime
  endDate     DateTime
  progress    Int      @default(0)
  
  createdBy   String
  creator     User     @relation(fields: [createdBy], references: [id])
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  teamMembers TeamMember[]
  materials   MaterialAssignment[]
  comments    Comment[]
  history     HistoryEvent[]
  
  @@index([createdBy])
}

enum ProjectStatus {
  PLANNED
  IN_PROGRESS
  COMPLETED
  ON_HOLD
}

// Team Member assignment
model TeamMember {
  id        String   @id @default(cuid())
  projectId String
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  role      String   // e.g., "Developer", "Lead", "Tester"
  assignedAt DateTime @default(now())
  removedAt DateTime?
  
  @@unique([projectId, userId])
  @@index([projectId])
  @@index([userId])
}

// Material model
model Material {
  id           String   @id @default(cuid())
  name         String
  type         String
  serialNumber String   @unique
  status       MaterialStatus @default(AVAILABLE)
  location     String
  
  createdBy    String
  creator      User     @relation(fields: [createdBy], references: [id])
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  assignments  MaterialAssignment[]
  comments     Comment[]
  history      HistoryEvent[]
  
  @@index([createdBy])
}

enum MaterialStatus {
  AVAILABLE
  ASSIGNED
  DEFECTIVE
  IN_REPAIR
}

// Material Assignment
model MaterialAssignment {
  id         String   @id @default(cuid())
  materialId String
  material   Material @relation(fields: [materialId], references: [id], onDelete: Cascade)
  
  projectId  String
  project    Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  assignedTo String
  assignedBy String
  
  assignedAt DateTime @default(now())
  removedAt  DateTime?
  
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  @@index([materialId])
  @@index([projectId])
}

// Comments
model Comment {
  id        String   @id @default(cuid())
  content   String
  
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  
  projectId String?
  project   Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  materialId String?
  material   Material? @relation(fields: [materialId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([authorId])
  @@index([projectId])
  @@index([materialId])
}

// History/Audit log
model HistoryEvent {
  id        String   @id @default(cuid())
  type      String   // e.g., "project_created", "material_assigned"
  title     String
  description String
  
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  
  projectId String?
  project   Project? @relation(fields: [projectId], references: [id], onDelete: SetNull)
  
  materialId String?
  material   Material? @relation(fields: [materialId], references: [id], onDelete: SetNull)
  
  metadata  Json?    // Pour stocker des infos supplémentaires
  
  createdAt DateTime @default(now())
  
  @@index([userId])
  @@index([projectId])
  @@index([materialId])
}
```

### 4. Migrer la base de données

```bash
npx prisma migrate dev --name init
```

### 5. Générer le client Prisma

```bash
npx prisma generate
```

---

## 🔌 Phase 3: Routes API Nitro

### Créer un composable pour les appels API

Fichier: `app/composables/useApi.ts`

```typescript
export function useApi() {
  const config = useRuntimeConfig()
  
  const apiCall = async <T>(
    path: string,
    options?: FetchOptions
  ): Promise<T> => {
    try {
      return await $fetch<T>(path, {
        baseURL: '/api',
        ...options,
      })
    } catch (error) {
      console.error(`API Error: ${path}`, error)
      throw error
    }
  }
  
  return {
    get: <T = any>(path: string) => apiCall<T>(path, { method: 'GET' }),
    post: <T = any>(path: string, body?: any) => apiCall<T>(path, { method: 'POST', body }),
    put: <T = any>(path: string, body?: any) => apiCall<T>(path, { method: 'PUT', body }),
    delete: <T = any>(path: string) => apiCall<T>(path, { method: 'DELETE' }),
  }
}
```

### Exemple: Créer une route API

Fichier: `server/api/projects/index.get.ts`

```typescript
import { defineEventHandler, getQuery } from 'h3'
import { prisma } from '@/server/db'

export default defineEventHandler(async (event) => {
  // Vérifier l'authentification
  const session = await getSession(event)
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  
  // Récupérer les projets
  const projects = await prisma.project.findMany({
    where: {
      // Filtrer par permissions RBAC
    },
    include: {
      creator: { select: { id: true, name: true, email: true } },
      teamMembers: { include: { user: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
  
  return projects
})
```

---

## 🧪 Phase 4: Tests

### Installer Vitest

```bash
npm install -D vitest @vitest/ui
```

### Exemple: Test d'un composable

Fichier: `app/composables/__tests__/useRBAC.spec.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { useRBAC } from '@/composables/useRBAC'

describe('useRBAC', () => {
  it('admin peut gérer les projets', () => {
    const { canDo } = useRBAC()
    // Mock de l'utilisateur admin
    // expect(canDo('manage_projects')).toBe(true)
  })
  
  it('dev ne peut que voir ses projets', () => {
    // Test pour developer
  })
})
```

---

## 🛡️ Checklist de sécurité

- [ ] Valider TOUS les inputs côté serveur (Zod/Yup)
- [ ] Implémenter CORS correctement
- [ ] CSRF protection (tokens)
- [ ] Rate limiting sur les endpoints sensibles
- [ ] Hasher les données sensibles
- [ ] Logs d'audit pour les actions critiques
- [ ] HTTPS en production
- [ ] Environment variables pour tous les secrets
- [ ] Tests de sécurité avec Semgrep

---

## 🚢 Déploiement

### Vercel (Frontend)

1. Push le code sur GitHub
2. Connecter le repo à Vercel
3. Configurer les variables d'environnement
4. Deploy automatique à chaque push

### Render/Railway (Backend + DB)

1. Créer une base de données PostgreSQL
2. Déployer le serveur Nuxt
3. Configurer les connexions entre services

---

## 📊 Recommandations finales

1. **Valider souvent** avec le product owner
2. **Tester chaque rôle** avant de considérer une feature complète
3. **Documenter** les changements importants
4. **Surveiller les performances** (Lighthouse, Core Web Vitals)
5. **Implémenter du logging** pour les bugs en production

---

Good luck! 🚀
