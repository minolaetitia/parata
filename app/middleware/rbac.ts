export default defineRouteMiddleware((to, from) => {
  if (process.server) return

  const { isAuthenticated } = useAuth()
  const { canAccessPage } = useRBAC()

  // Routes publiques
  const publicRoutes = ['/login']

  // Si la route est publique, laisser passer
  if (publicRoutes.includes(to.path)) {
    return
  }

  // Vérifier l'authentification
  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }

  // Vérifier les permissions RBAC
  if (!canAccessPage(to.path)) {
    // Rediriger vers la page d'accueil avec message d'erreur
    return navigateTo('/')
  }
})
