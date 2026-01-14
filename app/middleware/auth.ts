export default defineRouteMiddleware((to, from) => {
  if (process.server) return

  const { isAuthenticated } = useAuth()

  // Les routes publiques
  const publicRoutes = ['/login']

  // Si la route est publique, laisser passer
  if (publicRoutes.includes(to.path)) {
    // Si l'utilisateur est déjà authentifié, le rediriger vers l'accueil
    if (isAuthenticated.value) {
      return navigateTo('/')
    }
    return
  }

  // Pour les autres routes, vérifier l'authentification
  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})
