# Architecture - Parata

## 📋 Vue d'ensemble

Parata est une application web interne de gestion de projets et de suivi du stock matériel, construite avec **Nuxt 4, Tailwind CSS + shadcn-vue**.

### Stack actuel
- **Frontend**: Nuxt 4 (SSR) + Vue 3
- **UI**: shadcn-vue + Tailwind CSS
- **State Management**: Composables Vue avec `ref` et `reactive`
- **Authentification**: Google OAuth 2.0 (Interface mock - à completer)
- **RBAC**: Système complet de permissions par rôle

---

## 🏗️ Structure des fichiers

```
app/
├── components/
│   ├── UserProfile.vue          # Profil utilisateur (footer sidebar)
│   └── ui/                      # Composants shadcn-vue
├── composables/
│   ├── useAuth.ts               # Gestion de l'authentification
│   └── useRBAC.ts               # Permissions et rôles
├── middleware/
│   ├── auth.ts                  # Protection des routes (authentification)
│   └── rbac.ts                  # Protection des routes (permissions)
├── pages/
│   ├── index.vue                # Dashboard principal
│   ├── login.vue                # Page de connexion
│   ├── projects/
│   │   └── index.vue            # Gestion des projets
│   ├── team.vue                 # Gestion de l'équipe
│   ├── materials.vue            # Gestion du stock matériel
│   └── history.vue              # Historique & traçabilité
├── layouts/
│   ├── default.vue              # Layout principal
│   ├── AppSidebar.vue           # Composant sidebar
│   └── AppSidebarGroup.vue      # Contenu sidebar
├── lib/
│   ├── constants.ts             # Constantes applicatives
│   └── utils.ts                 # Utilitaires
└── assets/css/
    └── main.css                 # Styles globaux

server/
├── api/
│   ├── auth/                    # Routes d'authentification (à implémenter)
│   ├── projects/                # CRUD Projets (à implémenter)
│   ├── materials/               # CRUD Stock (à implémenter)
│   ├── team/                    # Gestion équipe (à implémenter)
│   └── history/                 # Historique (à implémenter)
└── middleware/                  # Middleware Nitro (à implémenter)

prisma/
└── schema.prisma                # Modèles Prisma (à créer)
```

---

## 🔐 Système RBAC (Role-Based Access Control)

### Rôles disponibles

| Rôle | Permissions | Accès |
|------|-----------|-------|
| **Admin** | Gestion complète (users, projets, matériel, rapports) | Toutes les pages |
| **Chef de Projet** | Gestion projets, assignation équipe | Dashboard, Projets, Équipe, Historique |
| **Développeur** | Voir ses projets et historique personnel | Dashboard, Historique |
| **CSM/DT/DTA** | Lecture seule (projets, équipe, rapports) | Dashboard, Projets, Équipe, Stock, Historique |

### Comment ça fonctionne

1. **Authentification** (`useAuth.ts`):
   - Stockage de l'utilisateur actuel
   - Méthode `loginWithGoogle()` (mock pour l'instant)
   - Détection du rôle basée sur l'email de l'utilisateur

2. **Permissions** (`useRBAC.ts`):
   - Vérification des permissions avec `canDo(permission)`
   - Vérification des rôles avec `hasRole(role)`
   - Contrôle d'accès aux pages avec `canAccessPage(path)`
   - Contrôle d'accès aux ressources avec `canPerformAction(action, resourceType)`

3. **Middleware** (`middleware/auth.ts` et `middleware/rbac.ts`):
   - Authentification automatique (redirection vers `/login`)
   - Vérification des permissions par page
   - Redirection vers Dashboard si accès refusé

### Exemple d'utilisation

```vue
<script setup lang="ts">
const { hasPermission, canAccessPage } = useRBAC()

// Vérifier une permission
if (hasPermission('manage_projects')) {
  // Afficher le bouton "Créer un projet"
}

// Vérifier l'accès à une page
if (canAccessPage('/admin/users')) {
  // Afficher le lien vers l'admin
}
</script>
```

---

## 📱 Comptes de test (démo)

Pour tester avec différents rôles, utilisez ces comptes sur la page de connexion:

| Email | Nom | Rôle | Permissions |
|-------|-----|------|-------------|
| alice.dupont@company.com | Alice Dupont | Admin | Accès complet |
| bob.martin@company.com | Bob Martin | Chef de Projet | Gestion projets |
| charlie.chen@company.com | Charlie Chen | Développeur | Voir ses projets |
| diana.rossi@company.com | Diana Rossi | CSM | Lecture seule |

> **Note**: Ces comptes sont des mocks. Ils stockent les données localement avec `localStorage`.

---

## 🔄 Pages et fonctionnalités implémentées

### ✅ Dashboard (`/`)
- Statistiques principales (projets, équipe, stock)
- Projets récents
- Membres de l'équipe
- Accessible à tous les rôles authentifiés

### ✅ Connexion (`/login`)
- Interface Google OAuth (mock)
- Sélection rapide de comptes de test
- Attribution automatique des rôles
- Stockage sessionStorage

### ✅ Projets (`/projects`)
- Liste des projets avec filtrage
- Statuts: Planifié, En cours, Complété
- CRUD basique (create, edit, delete)
- Progressions visuelles
- Accessible: Admin, Chef de Projet, CSM

### ✅ Équipe (`/team`)
- Liste des collaborateurs
- Profils avec compétences et historique
- Statuts: Actif, Congé, Inactif
- Accessible: Admin, Chef de Projet, CSM

### ✅ Stock matériel (`/materials`)
- Inventaire avec filtres et recherche
- Statuts: Disponible, Attribué, HS
- Tableau avec numéro de série, localisation
- Accessible: Admin, Chef de Projet, CSM

### ✅ Historique (`/history`)
- Timeline des événements
- Filtres par type d'événement
- Recherche par titre/description
- Horodatage relatif
- Accessible: Admin, Chef de Projet, CSM

---

## 🚀 Prochaines étapes (implémentation)

### Phase 1: Backend Nitro (Routes API)

```bash
# Créer les routes API sécurisées
server/api/auth/login.post.ts           # Google OAuth integration
server/api/auth/logout.post.ts          # Logout
server/api/projects/index.get.ts        # GET /api/projects
server/api/projects/create.post.ts      # POST /api/projects
server/api/projects/[id].put.ts         # PUT /api/projects/:id
server/api/projects/[id].delete.ts      # DELETE /api/projects/:id
server/api/materials/index.get.ts       # GET /api/materials
server/api/team/index.get.ts            # GET /api/team
server/api/history/index.get.ts         # GET /api/history
```

### Phase 2: Prisma & PostgreSQL

```
prisma/schema.prisma                    # Modèles de données
prisma/migrations/                      # Migrations
```

**Modèles à créer**:
- `User` (authentification)
- `Project` (projets)
- `TeamMember` (affectations collaborateurs)
- `Material` (stock)
- `MaterialAssignment` (attributions)
- `HistoryEvent` (traçabilité)
- `Comment` (discussions)

### Phase 3: Google OAuth & Sessions

- Configuration OAuth Google
- Flux de connexion sécurisé
- Gestion des sessions HTTP-only
- Refresh tokens

### Phase 4: Validation & Sécurité

- Validation côté serveur (Zod/Yup)
- Protection CSRF
- Rate limiting
- Logs d'audit

### Phase 5: Tests

- Tests unitaires (composables, utilities)
- Tests d'intégration API
- Tests E2E (Playwright)

---

## 🎨 Design System

### Couleurs (à partir des variables CSS)

- **Primary**: `oklch(0.205 0 0)` - Bleu foncé (corporate)
- **Secondary**: `oklch(0.97 0 0)` - Blanc
- **Accent**: `oklch(0.97 0 0)` - À configurer pour les CTA

Les couleurs sont définies dans `app/assets/css/main.css`.

### Composants shadcn-vue disponibles

- ✅ Button
- ✅ Card
- ✅ Input
- ✅ Separator
- ✅ Sheet (Drawer)
- ✅ Sidebar
- ✅ Skeleton
- ✅ Tooltip

---

## 🔄 Données mockées (état actuel)

Tous les appels API utilisent des **mocks locales** avec `ref()`:

```typescript
// Dans useAuth.ts
const currentUser = ref<AuthUser | null>(null)
const isAuthenticated = ref(false)

// Stockage: localStorage (côté client)
localStorage.setItem('auth_user', JSON.stringify(user))
```

**À remplacer par** des appels réels à l'API Nitro une fois les routes créées.

---

## 📝 Convention de code

### Composables
```typescript
export function useFeature() {
  // État réactif
  const state = ref<Type>(initialValue)
  
  // Méthodes
  const doSomething = async () => {}
  
  // Exports
  return {
    state: readonly(state),
    doSomething,
  }
}
```

### Pages
```vue
<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'rbac'],
})

// Logique métier
</script>

<template>
  <!-- Contenu -->
</template>
```

---

## 🛠️ Commandes utiles

```bash
# Développement
npm run dev              # Lancer le serveur de développement

# Build
npm run build            # Construire pour la production

# Préview
npm run preview          # Voir la build production localement

# Génération statique
npm run generate         # Generate statique (si needed)
```

---

## 📚 Resources

- [Nuxt 4 Documentation](https://nuxt.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-vue](https://www.shadcn-vue.com/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

---

**Version**: 1.0.0 (MVP)  
**Date**: Janvier 2025  
**État**: 🚧 En développement
