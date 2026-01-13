export default defineNuxtPlugin(() => {
  if (process.client) {
    // Initialiser l'authentification au démarrage de l'app
    const { checkAuth } = useAuth()
    checkAuth()
  }
})
