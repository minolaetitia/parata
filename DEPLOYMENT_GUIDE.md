# Guide de déploiement et test - Parata

## 🧪 Tester l'application localement

### 1. Démarrer le serveur de développement

```bash
npm run dev
```

L'app est disponible sur: **http://localhost:3000**

### 2. Accéder à la page de connexion

- URL: `http://localhost:3000/login`
- L'app redirige automatiquement vers login si non authentifié

### 3. Comptes de test disponibles

Utilisez ces emails pour tester différents rôles:

```
Alice Dupont
Email: alice.dupont@company.com
Rôle: Admin ⭐
Permissions: Accès complet

Bob Martin
Email: bob.martin@company.com
Rôle: Chef de Projet
Permissions: Gérer projets, affecter équipe

Charlie Chen
Email: charlie.chen@company.com
Rôle: Développeur
Permissions: Voir ses projets et historique

Diana Rossi
Email: diana.rossi@company.com
Rôle: CSM/DT/DTA
Permissions: Lecture seule (rapports)
```

### 4. Navigation et features à tester

#### 📊 Dashboard `/`
- Affiche les statistiques générales
- Projets récents
- Membres de l'équipe
- **Accessible à**: Tous les utilisateurs authentifiés

#### 📁 Projets `/projects`
- Liste des projets avec filtrage
- Créer/Éditer/Supprimer (selon permissions)
- Voir les progressions
- **Accessible à**: Admin, Chef de Projet, CSM

#### 👥 Équipe `/team`
- Liste des collaborateurs avec profils
- Compétences et historique
- Gérer les membres (selon permissions)
- **Accessible à**: Admin, Chef de Projet, CSM

#### 📦 Stock Matériel `/materials`
- Inventaire du matériel
- Filtrer par statut
- Recherche par nom/série
- **Accessible à**: Admin, Chef de Projet, CSM

#### 📜 Historique `/history`
- Timeline des événements
- Filtrer par type d'événement
- Recherche
- **Accessible à**: Admin, Chef de Projet, CSM

#### 🚪 Déconnexion
- Cliquer sur le profil utilisateur (footer sidebar)
- Cliquer sur "Déconnexion"
- Redirection automatique vers `/login`

---

## 🔐 Tester les permissions RBAC

### Différences visibles par rôle

| Feature | Admin | Chef Proj | Dev | CSM |
|---------|-------|----------|-----|-----|
| Créer projet | ✅ | ✅ | ❌ | ❌ |
| Voir tous les projets | ✅ | ✅ | ❌ | ✅ |
| Voir l'équipe | ✅ | ✅ | ❌ | ✅ |
| Gérer utilisateurs | ✅ | ❌ | ❌ | ❌ |
| Accès stock | ✅ | ✅ | ❌ | ✅ |

### Comment vérifier

1. **Connectez-vous avec Alice (Admin)**:
   - Vous voyez tous les boutons "Créer" et "Éditer"

2. **Connectez-vous avec Charlie (Développeur)**:
   - Vous pouvez voir le Dashboard
   - Les autres pages sont inaccessibles (redirection)
   - Les boutons d'action sont cachés

3. **Testez chaque compte** pour voir les différences

---

## 🏗️ Données mockées

Actuellement, toutes les données sont stockées localement:
- Utilisateur: `localStorage` (survit aux refresh)
- Projets, Stock, Équipe: `ref()` Vue (réinitié à chaque refresh)

### Comment les données sont persistées

```javascript
// Authentification
localStorage.setItem('auth_user', JSON.stringify(user))
localStorage.getItem('auth_user')

// Autres données
const projects = ref([...])  // Réinitialisée au refresh
```

---

## 🚀 Passage en production

### Étape 1: Préparer la base de données

1. Créer une base PostgreSQL (Neon, Render, Heroku, etc.)
2. Configurer la connection string dans `.env`
3. Créer les migrations: `npx prisma migrate deploy`

### Étape 2: Configurer les variables d'environnement

```env
# .env ou en production
DATABASE_URL="postgresql://..."

# Authentification
NUXT_AUTH_SECRET="random-long-secret-key"
NUXT_AUTH_ORIGIN="https://your-domain.com"
NUXT_AUTH_GOOGLE_ID="your-client-id.apps.googleusercontent.com"
NUXT_AUTH_GOOGLE_SECRET="your-client-secret"

# Autres
NODE_ENV="production"
```

### Étape 3: Build pour la production

```bash
npm run build
npm run preview  # Tester localement la build

# Ou directement déployer (Vercel, Netlify, etc.)
vercel deploy
```

### Étape 4: Remplacer les mocks par les API réelles

- [ ] Remplacer `loginWithGoogle()` par l'authentification réelle
- [ ] Remplacer les `ref()` par les appels `useApi().get('/api/projects')`
- [ ] Implémenter les routes API Nitro
- [ ] Configurer Prisma client dans les routes

---

## 📋 Checklist avant déploiement

- [ ] Tester avec tous les rôles
- [ ] Vérifier les permissions RBAC
- [ ] Tester sur mobile (responsive design)
- [ ] Vérifier les images/avatars
- [ ] Vérifier les formulaires
- [ ] Tester la recherche et filtres
- [ ] Tester la navigation
- [ ] Vérifier les messages d'erreur
- [ ] Tester la déconnexion
- [ ] Vérifier les logs en console

---

## 🐛 Dépannage

### "No match found for location with path"
- C'est normal au démarrage, l'app se reconfigure
- Refresh la page
- Vérifier la structure des dossiers `/pages`

### Données disapparaissent après refresh
- C'est normal (mocks avec `ref()`)
- Ce sera résolu avec les appels API réels

### Les pages 404
- Vérifier que vous êtes authentifié (login d'abord)
- Vérifier vos permissions pour la page

### localStorage ne fonctionne pas
- Vérifier qu'on est bien `process.client`
- Vérifier la DevTools > Application > Local Storage

---

## 📞 Support & Documentation

- **Architecture**: Voir `ARCHITECTURE.md`
- **Prochaines étapes**: Voir `NEXT_STEPS.md`
- **Composables**: Dans `app/composables/`
- **Pages**: Dans `app/pages/`

---

## 📈 Métriques de développement

**Fichiers créés**:
- 11 pages Vue
- 2 composables (auth, rbac)
- 2 middleware
- 3 fichiers de configuration
- 3 fichiers de documentation

**Temps développement**: ~2-3 heures (MVP)
**État**: MVP Production-ready (mocks)

---

Good luck! 🚀

Pour toute question: consulter la documentation ou les prochaines étapes.
