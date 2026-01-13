// Types pour l'authentification
export type UserRole = 'admin' | 'chef_projet' | 'developpeur' | 'csm_dt_dta'

export interface AuthUser {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  createdAt: Date
}

// État global d'authentification (mock)
const currentUser = ref<AuthUser | null>(null)
const isAuthenticated = ref(false)
const isLoading = ref(false)

export function useAuth() {
  // Mapper les emails aux rôles (pour la démo)
  const getRoleByEmail = (email: string): UserRole => {
    if (email.includes('alice')) return 'admin'
    if (email.includes('bob')) return 'chef_projet'
    if (email.includes('charlie')) return 'developpeur'
    if (email.includes('diana') || email.includes('eva')) return 'csm_dt_dta'
    return 'developpeur' // Rôle par défaut
  }

  // Login avec Google (mock)
  const loginWithGoogle = async (name: string, email: string) => {
    isLoading.value = true
    try {
      // Simulation d'un délai réseau
      await new Promise(resolve => setTimeout(resolve, 800))

      // Créer un utilisateur mock avec rôle basé sur l'email
      const user: AuthUser = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role: getRoleByEmail(email),
        createdAt: new Date(),
      }

      currentUser.value = user
      isAuthenticated.value = true

      // Simuler stockage de session
      if (process.client) {
        localStorage.setItem('auth_user', JSON.stringify(user))
      }

      return user
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Logout
  const logout = () => {
    currentUser.value = null
    isAuthenticated.value = false
    if (process.client) {
      localStorage.removeItem('auth_user')
    }
  }

  // Vérifier si l'utilisateur est connecté (utile pour l'hydratation)
  const checkAuth = () => {
    if (process.client) {
      const stored = localStorage.getItem('auth_user')
      if (stored) {
        try {
          currentUser.value = JSON.parse(stored)
          isAuthenticated.value = true
        } catch {
          logout()
        }
      }
    }
  }

  // Vérifier les permissions basées sur le rôle
  const hasRole = (requiredRoles: UserRole | UserRole[]) => {
    if (!currentUser.value) return false
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles]
    return roles.includes(currentUser.value.role)
  }

  // Vérifier une permission spécifique
  const hasPermission = (permission: string): boolean => {
    if (!currentUser.value) return false
    
    const permissions: Record<UserRole, string[]> = {
      admin: [
        'manage_users',
        'manage_projects',
        'manage_materials',
        'view_reports',
        'manage_roles',
      ],
      chef_projet: [
        'manage_projects',
        'assign_team_members',
        'view_team_history',
      ],
      developpeur: [
        'view_own_projects',
        'view_own_history',
      ],
      csm_dt_dta: [
        'view_projects',
        'view_team',
        'view_materials',
        'view_reports',
      ],
    }
    
    return permissions[currentUser.value.role]?.includes(permission) ?? false
  }

  // Initialiser l'authentification au mount
  onMounted(() => {
    checkAuth()
  })

  return {
    currentUser: readonly(currentUser),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    loginWithGoogle,
    logout,
    hasRole,
    hasPermission,
  }
}
