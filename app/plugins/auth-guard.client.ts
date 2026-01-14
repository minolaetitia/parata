export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const { isAuthenticated, checkAuth } = useAuth()
  const { canAccessPage } = useRBAC()

  // Initialiser l'auth au démarrage
  checkAuth()

  const publicRoutes = ['/login']

  router.beforeEach((to, from, next) => {
    // Initialiser l'authentification
    checkAuth()

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
    if (!canAccessPage(to.path)) {
      console.warn(`Accès refusé à ${to.path}`)
      return next('/')
    }

    next()
  })
})
