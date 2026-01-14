// Types de rôles utilisateur
export type UserRole = 'admin' | 'chef_projet' | 'developpeur' | 'csm_dt_dta'

// Utilisateur authentifié
export interface AuthUser {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  createdAt: number // Timestamp pour éviter les problèmes de sérialisation
}

// Permissions granulaires
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

// Projet
export interface Project {
  id: number
  name: string
  description: string
  status: 'Planifié' | 'En cours' | 'Complété' | 'En attente'
  startDate: string // Format YYYY-MM-DD
  endDate: string   // Format YYYY-MM-DD
  team_size: number
  progress: number
}

// Collaborateur/Membre de l'équipe
export interface TeamMember {
  id: number
  name: string
  email: string
  role: string
  status: 'Actif' | 'Inactif' | 'Congé' | 'Archivé'
  projects: number
  skills: string[]
  joinDate: string // Format YYYY-MM-DD
  avatar: string
}

// Matériel
export interface Material {
  id: number
  name: string
  type: string
  serialNumber: string
  status: 'Disponible' | 'Attribué' | 'HS' | 'En réparation'
  location: string
  assignedTo: string | null
  assignedDate: string | null // Format ISO
  purchaseDate: string        // Format YYYY-MM-DD
}

// Événement d'historique
export interface HistoryEvent {
  id: number
  type: string
  title: string
  description: string
  user: string
  timestamp: string // Format ISO: "2025-01-18T11:30:00"
  icon: string
}

// Commentaire
export interface Comment {
  id: number
  content: string
  author: string
  timestamp: string // Format ISO: "2025-01-18T11:30:00"
  resourceType: 'project' | 'material'
  resourceId: number
}
