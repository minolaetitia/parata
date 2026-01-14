<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  LayoutDashboard,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-vue-next'

// Protection gérée par le plugin client auth-guard.client.ts

const { hasPermission } = useAuth()
const searchQuery = ref('')

// Données mockées des projets
const projects = ref([
  {
    id: 1,
    name: 'Refonte Site Web',
    description: 'Modernisation du site corporate',
    status: 'En cours',
    startDate: '2025-01-15',
    endDate: '2025-02-15',
    team_size: 3,
    progress: 65,
  },
  {
    id: 2,
    name: 'API Reporting',
    description: 'Système de reporting avancé',
    status: 'En cours',
    startDate: '2025-01-20',
    endDate: '2025-02-28',
    team_size: 2,
    progress: 45,
  },
  {
    id: 3,
    name: 'Migration BD',
    description: 'Migration vers PostgreSQL',
    status: 'Planifié',
    startDate: '2025-02-01',
    endDate: '2025-03-10',
    team_size: 4,
    progress: 10,
  },
  {
    id: 4,
    name: 'Sécurité OAuth',
    description: 'Implémentation Google SSO',
    status: 'Complété',
    startDate: '2024-12-01',
    endDate: '2025-01-10',
    team_size: 2,
    progress: 100,
  },
])

const filteredProjects = computed(() => {
  if (!searchQuery.value) {
    return projects.value
  }
  return projects.value.filter(
    project =>
      project.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'En cours':
      return Clock
    case 'Complété':
      return CheckCircle
    case 'Planifié':
      return AlertCircle
    default:
      return LayoutDashboard
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'En cours':
      return 'bg-blue-100 text-blue-800'
    case 'Complété':
      return 'bg-green-100 text-green-800'
    case 'Planifié':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const handleDelete = (id: number) => {
  const index = projects.value.findIndex(p => p.id === id)
  if (index > -1) {
    projects.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div class="flex-1">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Projets</h1>
        <p class="mt-1 text-sm sm:text-base text-gray-600">Gérez et suivez tous vos projets en un seul endroit.</p>
      </div>
      <Button v-if="hasPermission('manage_projects')" size="sm" class="w-full sm:w-auto">
        <Plus class="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        <span class="text-sm">Nouveau Projet</span>
      </Button>
    </div>

    <!-- Filtres et recherche -->
    <Card>
      <CardContent class="pt-4 sm:pt-6">
        <div class="flex gap-2 sm:gap-4">
          <div class="relative flex-1">
            <Search class="absolute left-2 sm:left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400" />
            <Input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un projet..."
              class="pl-8 sm:pl-10 text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Liste des projets -->
    <div class="grid gap-3 sm:gap-4">
      <Card v-for="project in filteredProjects" :key="project.id" class="hover:shadow-lg transition-shadow">
        <CardHeader class="pb-2 sm:pb-3">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <div class="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
                <CardTitle class="text-base sm:text-lg truncate">{{ project.name }}</CardTitle>
                <span :class="getStatusColor(project.status)" class="rounded-full px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium w-fit">
                  {{ project.status }}
                </span>
              </div>
              <CardDescription class="mt-1 sm:mt-2 text-xs sm:text-sm line-clamp-2">{{ project.description }}</CardDescription>
            </div>
            <div v-if="hasPermission('manage_projects')" class="flex gap-1 sm:gap-2 flex-shrink-0">
              <Button size="sm" variant="ghost" class="h-7 w-7 sm:h-8 sm:w-8 p-0">
                <Edit2 class="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button size="sm" variant="ghost" @click="handleDelete(project.id)" class="h-7 w-7 sm:h-8 sm:w-8 p-0">
                <Trash2 class="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="space-y-3 sm:space-y-4">
            <!-- Informations du projet -->
            <div class="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
              <div>
                <p class="text-gray-600 text-[10px] sm:text-xs">Date de début</p>
                <p class="font-medium text-xs sm:text-sm">{{ new Date(project.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-[10px] sm:text-xs">Date de fin</p>
                <p class="font-medium text-xs sm:text-sm">{{ new Date(project.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-[10px] sm:text-xs">Équipe</p>
                <p class="font-medium text-xs sm:text-sm">{{ project.team_size }} membres</p>
              </div>
            </div>

            <!-- Barre de progression -->
            <div>
              <div class="mb-1.5 sm:mb-2 flex items-center justify-between text-xs sm:text-sm">
                <span class="text-gray-600">Progression</span>
                <span class="font-medium">{{ project.progress }}%</span>
              </div>
              <div class="h-1.5 sm:h-2 rounded-full bg-gray-200">
                <div
                  class="h-1.5 sm:h-2 rounded-full bg-blue-600 transition-all"
                  :style="{ width: project.progress + '%' }"
                />
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 pt-2">
              <Button variant="outline" size="sm" class="flex-1 text-xs sm:text-sm">Détails</Button>
              <Button variant="outline" size="sm" class="flex-1 text-xs sm:text-sm">Équipe</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Message vide -->
      <Card v-if="filteredProjects.length === 0" class="border-dashed">
        <CardContent class="pt-8 sm:pt-12 pb-8 sm:pb-12 text-center">
          <LayoutDashboard class="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
          <h3 class="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-900">Aucun projet trouvé</h3>
          <p class="mt-2 text-sm sm:text-base text-gray-600">Créez votre premier projet pour commencer.</p>
          <Button class="mt-3 sm:mt-4 w-full sm:w-auto text-sm">
            <Plus class="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Créer un projet
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
