// Statuts de projet
export const PROJECT_STATUSES = {
  PLANNED: 'Planifié',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Complété',
  ON_HOLD: 'En attente',
} as const

export type ProjectStatus = (typeof PROJECT_STATUSES)[keyof typeof PROJECT_STATUSES]

// Statuts de matériel
export const MATERIAL_STATUSES = {
  AVAILABLE: 'Disponible',
  ASSIGNED: 'Attribué',
  DEFECTIVE: 'HS',
  IN_REPAIR: 'En réparation',
} as const

export type MaterialStatus = (typeof MATERIAL_STATUSES)[keyof typeof MATERIAL_STATUSES]

// Statuts d'utilisateur
export const USER_STATUSES = {
  ACTIVE: 'Actif',
  INACTIVE: 'Inactif',
  ON_LEAVE: 'Congé',
  ARCHIVED: 'Archivé',
} as const

export type UserStatus = (typeof USER_STATUSES)[keyof typeof USER_STATUSES]

// Types d'événements historique
export const HISTORY_EVENT_TYPES = {
  PROJECT_CREATED: 'projet_creation',
  PROJECT_MODIFIED: 'projet_modification',
  PROJECT_COMPLETED: 'projet_completion',
  TEAM_MEMBER_ASSIGNED: 'collaborateur_assignation',
  TEAM_MEMBER_REMOVED: 'collaborateur_retrait',
  MATERIAL_ASSIGNED: 'materiel_attribution',
  MATERIAL_REMOVED: 'materiel_retrait',
  COMMENT_ADDED: 'commentaire_ajout',
  COMMENT_MODIFIED: 'commentaire_modification',
  COMMENT_DELETED: 'commentaire_suppression',
} as const

export type HistoryEventType = (typeof HISTORY_EVENT_TYPES)[keyof typeof HISTORY_EVENT_TYPES]

// Configuration UI
export const UI_CONFIG = {
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [10, 25, 50, 100],
  
  // Timeouts
  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 300,
  
  // Validation
  MIN_PROJECT_NAME_LENGTH: 3,
  MAX_PROJECT_NAME_LENGTH: 255,
  MIN_PASSWORD_LENGTH: 8,
} as const

// Messages de l'application
export const MESSAGES = {
  SUCCESS: {
    PROJECT_CREATED: 'Projet créé avec succès',
    PROJECT_UPDATED: 'Projet mis à jour',
    PROJECT_DELETED: 'Projet supprimé',
    MATERIAL_ASSIGNED: 'Matériel attribué',
    TEAM_MEMBER_ADDED: 'Membre ajouté à l\'équipe',
  },
  ERROR: {
    UNAUTHORIZED: 'Vous n\'avez pas la permission d\'effectuer cette action',
    INVALID_DATA: 'Les données saisies sont invalides',
    SERVER_ERROR: 'Une erreur serveur s\'est produite',
    NETWORK_ERROR: 'Erreur de connexion réseau',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'Ce champ est obligatoire',
    INVALID_EMAIL: 'Adresse email invalide',
    PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 8 caractères',
  },
} as const
