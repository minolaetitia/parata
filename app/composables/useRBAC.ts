// Types RBAC détaillés
export type UserRole = 'admin' | 'chef_projet' | 'developpeur' | 'csm_dt_dta'

export type Permission =
  | 'manage_users'
  | 'manage_roles'
  | 'manage_projects'
  | 'assign_team_members'
  | 'manage_materials'
  | 'view_team'
  | 'view_team_history'
  | 'view_own_projects'
  | 'view_own_history'
  | 'view_projects'
  | 'view_reports'
  | 'add_comments'
  | 'edit_projects'

// Mapping des rôles aux permissions
export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    'manage_users',
    'manage_roles',
    'manage_projects',
    'assign_team_members',
    'manage_materials',
    'view_team',
    'view_team_history',
    'view_projects',
    'view_reports',
    'add_comments',
    'edit_projects',
  ],
  chef_projet: [
    'manage_projects',
    'assign_team_members',
    'view_team',
    'view_team_history',
    'view_projects',
    'add_comments',
    'edit_projects',
  ],
  developpeur: [
    'view_own_projects',
    'view_own_history',
    'add_comments',
  ],
  csm_dt_dta: [
    'view_team',
    'view_projects',
    'view_reports',
    'add_comments',
  ],
}

// Pages protégées par rôles
export const pageAccessControl: Record<string, UserRole[]> = {
  '/': ['admin', 'chef_projet', 'developpeur', 'csm_dt_dta'], // Dashboard accessible à tous
  '/projects': ['admin', 'chef_projet', 'csm_dt_dta'],
  '/projects/create': ['admin', 'chef_projet'],
  '/team': ['admin', 'chef_projet', 'csm_dt_dta'],
  '/materials': ['admin', 'chef_projet', 'csm_dt_dta'],
  '/history': ['admin', 'chef_projet', 'csm_dt_dta'],
  '/admin': ['admin'],
  '/admin/users': ['admin'],
  '/admin/settings': ['admin'],
}

export function useRBAC() {
  const { currentUser } = useAuth()

  /**
   * Vérifier si l'utilisateur a une permission spécifique
   */
  const canDo = (permission: Permission): boolean => {
    if (!currentUser.value) return false
    return rolePermissions[currentUser.value.role]?.includes(permission) ?? false
  }

  /**
   * Vérifier si l'utilisateur a l'une des rôles spécifiés
   */
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!currentUser.value) return false
    const roleList = Array.isArray(roles) ? roles : [roles]
    return roleList.includes(currentUser.value.role)
  }

  /**
   * Vérifier l'accès à une page
   */
  const canAccessPage = (path: string): boolean => {
    if (!currentUser.value) return false
    const allowedRoles = pageAccessControl[path]
    if (!allowedRoles) return true // Si pas de restriction, accès accordé
    return allowedRoles.includes(currentUser.value.role)
  }

  /**
   * Obtenir toutes les permissions de l'utilisateur
   */
  const getUserPermissions = (): Permission[] => {
    if (!currentUser.value) return []
    return rolePermissions[currentUser.value.role] ?? []
  }

  /**
   * Obtenir le label du rôle en français
   */
  const getRoleLabel = (role: UserRole): string => {
    const labels: Record<UserRole, string> = {
      admin: 'Administrateur',
      chef_projet: 'Chef de Projet',
      developpeur: 'Développeur',
      csm_dt_dta: 'CSM/DT/DTA',
    }
    return labels[role]
  }

  /**
   * Obtenir la description du rôle
   */
  const getRoleDescription = (role: UserRole): string => {
    const descriptions: Record<UserRole, string> = {
      admin: 'Accès complet à tous les modules et configurations',
      chef_projet: 'Gestion des projets et assignation de l\'équipe',
      developpeur: 'Accès à ses propres projets et historique',
      csm_dt_dta: 'Accès en lecture seule à tous les rapports',
    }
    return descriptions[role]
  }

  /**
   * Vérifier si une action est autorisée sur une ressource
   */
  const canPerformAction = (
    action: 'create' | 'read' | 'update' | 'delete',
    resourceType: string,
  ): boolean => {
    if (!currentUser.value) return false

    // Définir les autorisations par type de ressource
    const resourcePermissions: Record<string, Record<string, Permission[]>> = {
      project: {
        create: ['manage_projects'],
        read: ['manage_projects', 'view_projects'],
        update: ['manage_projects', 'edit_projects'],
        delete: ['manage_projects'],
      },
      material: {
        create: ['manage_materials'],
        read: ['manage_materials', 'view_projects'],
        update: ['manage_materials'],
        delete: ['manage_materials'],
      },
      user: {
        create: ['manage_users'],
        read: ['manage_users', 'view_team'],
        update: ['manage_users'],
        delete: ['manage_users'],
      },
      comment: {
        create: ['add_comments'],
        read: ['add_comments', 'view_projects'],
        update: ['add_comments'],
        delete: ['manage_projects'],
      },
    }

    const requiredPermissions = resourcePermissions[resourceType]?.[action] ?? []
    return requiredPermissions.some(permission => canDo(permission))
  }

  return {
    canDo,
    hasRole,
    canAccessPage,
    getUserPermissions,
    getRoleLabel,
    getRoleDescription,
    canPerformAction,
  }
}
