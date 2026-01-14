export default defineNuxtPlugin((nuxtApp) => {
  // Ce plugin s'exécute SEULEMENT côté client (suffixe .client.ts)
  try {
    const router = useRouter()
    const { isAuthenticated, checkAuth } = useAuth()
    const { canAccessPage } = useRBAC()

    // Initialiser l'authentification au démarrage
    // Attendre le mount complet avant de lire localStorage
    if (typeof window !== 'undefined') {
      checkAuth()
    }

    const publicRoutes = ['/login']

    router.beforeEach((to, from, next) => {
      try {
        // Routes publiques
        if (publicRoutes.includes(to.path)) {
          if (isAuthenticated.value) {
            return next('/')
          }
          return next()
        }

        // Vérifier l'authentification
        if (!isAuthenticated.value) {
          return next('/login')
        }

        // Vérifier les permissions RBAC
        if (typeof canAccessPage === 'function' && !canAccessPage(to.path)) {
          console.warn(`Accès refusé à ${to.path}`)
          return next('/')
        }

        next()
      } catch (error) {
        console.error('Erreur dans le routeur:', error)
        next()
      }
    })
  } catch (error) {
    console.error('Erreur dans le plugin auth-guard:', error)
  }
})
