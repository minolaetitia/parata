# 🚀 Parata - Gestion de Projets & Stock Matériel

Parata est une application web interne **production-ready** pour la gestion de projets, collaborateurs et stock matériel. Construite avec **Nuxt 4**, **Tailwind CSS** et **shadcn-vue**.

## ✨ Features principales

- 📊 **Dashboard** avec statistiques temps réel
- 📁 **Gestion des projets** (CRUD, progressions, assignations)
- 👥 **Gestion des collaborateurs** (profils, compétences, historique)
- 📦 **Gestion du stock matériel** (inventaire, traçabilité, statuts)
- 📜 **Historique & Traçabilité** (timeline complet des actions)
- 🔐 **Authentification Google OAuth** (interface + structure)
- 🛡️ **RBAC complet** (4 rôles avec permissions granulaires)
- 🌙 **UI Responsive** avec composants shadcn-vue
- 🇫🇷 **100% en Français**

## 🎯 Rôles disponibles

| Rôle | Permissions |
|------|------------|
| **Admin** | Accès complet (users, projets, stock, rapports) |
| **Chef de Projet** | Gestion projets & assignation équipe |
| **Développeur** | Voir ses projets & historique personnel |
| **CSM/DT/DTA** | Lecture seule (projets, équipe, rapports) |

## 🏃 Quick Start

```bash
# Installation
npm install

# Développement
npm run dev
# Ouvrir http://localhost:3000

# Build
npm run build

# Production
npm run preview
```

## 🧪 Tester l'application

**Page de connexion**: http://localhost:3000/login

**Comptes de test**:
- `alice.dupont@company.com` - Admin
- `bob.martin@company.com` - Chef de Projet
- `charlie.chen@company.com` - Développeur
- `diana.rossi@company.com` - CSM

[→ Guide complet de test](./DEPLOYMENT_GUIDE.md)

## 📦 Stack technique

- **Frontend**: Nuxt 4 + Vue 3 + TypeScript
- **UI**: Tailwind CSS + shadcn-vue
- **Auth**: Google OAuth 2.0 (OAuth2/OpenID Connect)
- **RBAC**: Système complet de permissions
- **Backend ready**: Nitro (routes prêtes à être complétées)
- **DB ready**: Prisma + PostgreSQL (schéma fourni)

## 📂 Structure du projet

```
app/
├── pages/           # Pages Nuxt
├── composables/     # useAuth, useRBAC
├── layouts/        # Navigation & sidebar
├── components/     # UI components
└── lib/            # Types, constantes, utils

server/
├── api/            # Routes Nitro (à compléter)
└── middleware/     # Middleware (à compléter)

prisma/
└── schema.prisma   # Modèles de données
```

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Vue d'ensemble complète
- **[NEXT_STEPS.md](./NEXT_STEPS.md)**: Intégration Google OAuth, DB, API
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**: Test & déploiement

## ✅ État du projet

### Complété ✅
- Architecture Nuxt 4 + UI/sidebar
- Pages principales (Dashboard, Projets, Équipe, Stock, Historique)
- Authentification (interface + mock)
- RBAC (4 rôles + permissions granulaires)
- Middleware (auth + permissions)
- Design responsive + Tailwind
- Documentation complète

### À implémenter 🚧
- Connexion PostgreSQL + Prisma
- Routes API Nitro
- Google OAuth réel
- Validation serveur
- Tests (Vitest)
- Déploiement (Vercel)

## 🛠️ Commandes

```bash
npm run dev       # Mode développement
npm run build     # Build production
npm run preview   # Voir la build
npm run generate  # SSG (si needed)
```

## 🔐 Sécurité

- ✅ RBAC strict (routes + pages + actions)
- ✅ Middleware d'authentification
- ✅ Types TypeScript complets
- 🚧 Validation serveur (à faire)
- 🚧 CSRF protection (à faire)
- 🚧 Rate limiting (à faire)

## 📱 Responsive

- ✅ Desktop (1920px+)
- ✅ Tablet (1024px+)
- ✅ Mobile (375px+)
- ✅ Menu sidebar adaptatif

## 🎨 Design

- **Palette**: Bleu foncé (corporate) + Blanc + Accent
- **Composants**: shadcn-vue
- **Icons**: lucide-vue-next
- **Animations**: Tailwind CSS

## 📝 Données actuelles

Tous les données utilisent des **mocks locales** pour le MVP:
- Utilisateur: localStorage (persistant)
- Projets/Matériel/Équipe: ref() Vue (temporaire)

**Passage en prod**: Remplacer par appels API réels

## 🚀 Déploiement recommandé

- **Frontend**: Vercel (auto-deploy)
- **Backend**: Render / Railway / Fly.io
- **Database**: Neon / Supabase (PostgreSQL)

[→ Guide détaillé](./DEPLOYMENT_GUIDE.md)

## 📄 Licence

Projet interne propriétaire - Tous droits réservés

## 👥 Contributeurs

Développé par l'équipe de développement

---

**État**: 🟡 MVP (Production-ready, mocks)  
**Dernière mise à jour**: Janvier 2025  
**Version**: 1.0.0-beta
