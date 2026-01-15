import { ref } from 'vue'
import type { AuthUser, UserRole } from '@/lib/types'

// État global d'authentification
const currentUser = ref<AuthUser | null>(null)
const isAuthenticated = ref(false)
const isLoading = ref(false)
let authInitialized = false

export function useAuth() {
  // Mapper les emails aux rôles
  const getRoleByEmail = (email: string): UserRole => {
    if (email.includes('mino')) return 'admin'
    if (email.includes('bob')) return 'chef_projet'
    if (email.includes('charlie')) return 'developpeur'
    if (email.includes('diana') || email.includes('eva')) return 'csm_dt_dta'
    return 'developpeur' // Rôle par défaut
  }

  // Handle Google Sign-In success
  const handleGoogleSignIn = (googleClaims: any) => {
    const user: AuthUser = {
      id: googleClaims.sub,
      email: googleClaims.email,
      name: googleClaims.name || googleClaims.email,
      avatar: googleClaims.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${googleClaims.email}`,
      role: getRoleByEmail(googleClaims.email),
      createdAt: Date.now(),
    }

    currentUser.value = user
    isAuthenticated.value = true

    // Stocker localement
    if (process.client) {
      localStorage.setItem('auth_user', JSON.stringify(user))
    }

    return user
  }

  // Logout
  const logout = () => {
    currentUser.value = null
    isAuthenticated.value = false
    if (process.client) {
      localStorage.removeItem('auth_user')
    }
  }

  // Vérifier si l'utilisateur est connecté
  const checkAuth = () => {
    if (process.server) return
    if (authInitialized) return
    authInitialized = true
    
    const stored = localStorage.getItem('auth_user')
    if (stored) {
      try {
        const user = JSON.parse(stored)
        currentUser.value = user
        isAuthenticated.value = true
      } catch {
        logout()
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

  return {
    currentUser: readonly(currentUser),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    handleGoogleSignIn,
    logout,
    checkAuth,
    hasRole,
    hasPermission,
  }
}
