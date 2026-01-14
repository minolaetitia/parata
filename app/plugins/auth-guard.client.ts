export default defineNuxtPlugin((nuxtApp) => {
  // Vérifier que nous sommes côté client
  if (process.server) return

  try {
    const router = useRouter()
    const { isAuthenticated, checkAuth } = useAuth()
    const { canAccessPage } = useRBAC()

    // Initialiser l'auth au démarrage
    if (typeof checkAuth === 'function') {
      checkAuth()
    }

    const publicRoutes = ['/login']

    router.beforeEach((to, from, next) => {
      try {
        // Initialiser l'authentification
        if (typeof checkAuth === 'function') {
          checkAuth()
        }

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
