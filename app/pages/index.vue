<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Users, Package, TrendingUp, Plus } from 'lucide-vue-next'

// Protection gérée par le plugin client auth-guard.client.ts

const { currentUser, hasPermission } = useAuth()

// Données mockées du dashboard
const projectStats = {
  total: 12,
  active: 8,
  completed: 4,
}

const materialStats = {
  total: 45,
  available: 32,
  assigned: 10,
  defective: 3,
}

const recentProjects = [
  { id: 1, name: 'Refonte Site Web', status: 'En cours', team_size: 3, due_date: '2025-02-15' },
  { id: 2, name: 'API Reporting', status: 'En cours', team_size: 2, due_date: '2025-02-28' },
  { id: 3, name: 'Migration BD', status: 'Planifié', team_size: 4, due_date: '2025-03-10' },
]

const teamMembers = [
  { id: 1, name: 'Alice Dupont', role: 'Développeur', projects: 3, avatar: '👩‍💻' },
  { id: 2, name: 'Bob Martin', role: 'Chef de Projet', projects: 5, avatar: '👨‍💼' },
  { id: 3, name: 'Charlie Chen', role: 'Développeur', projects: 2, avatar: '👨‍💻' },
]
</script>

<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header avec accueil -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
      <div class="flex-1">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 line-clamp-2">
          Bienvenue, {{ currentUser?.name }}! 👋
        </h1>
        <p class="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
          Voici un aperçu de votre activité et de vos projets.
        </p>
      </div>
      <div v-if="hasPermission('manage_projects')" class="flex gap-2 w-full sm:w-auto">
        <Button class="w-full sm:w-auto text-sm">
          <Plus class="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span class="hidden sm:inline">Nouveau Projet</span>
          <span class="sm:hidden">Nouveau</span>
        </Button>
      </div>
    </div>

    <!-- Statistiques principales -->
    <div class="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      <!-- Projets -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
          <CardTitle class="text-xs sm:text-sm font-medium">Projets</CardTitle>
          <LayoutDashboard class="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div class="text-xl sm:text-2xl font-bold">{{ projectStats.total }}</div>
          <p class="text-[10px] sm:text-xs text-gray-600">{{ projectStats.active }} en cours</p>
        </CardContent>
      </Card>

      <!-- Équipe -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
          <CardTitle class="text-xs sm:text-sm font-medium">Collaborateurs</CardTitle>
          <Users class="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div class="text-xl sm:text-2xl font-bold">{{ teamMembers.length }}</div>
          <p class="text-[10px] sm:text-xs text-gray-600">Actifs sur la plateforme</p>
        </CardContent>
      </Card>

      <!-- Stock matériel -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
          <CardTitle class="text-xs sm:text-sm font-medium">Stock Matériel</CardTitle>
          <Package class="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div class="text-xl sm:text-2xl font-bold">{{ materialStats.total }}</div>
          <p class="text-[10px] sm:text-xs text-gray-600">{{ materialStats.available }} disponibles</p>
        </CardContent>
      </Card>

      <!-- Tendance -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
          <CardTitle class="text-xs sm:text-sm font-medium">Activité</CardTitle>
          <TrendingUp class="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div class="text-xl sm:text-2xl font-bold">+24%</div>
          <p class="text-[10px] sm:text-xs text-gray-600">Vs. la semaine dernière</p>
        </CardContent>
      </Card>
    </div>

    <div class="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
      <!-- Projets récents -->
      <Card>
        <CardHeader>
          <CardTitle class="text-base sm:text-lg">Projets Récents</CardTitle>
          <CardDescription class="text-xs sm:text-sm">Vos 3 derniers projets</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-3 sm:space-y-4">
            <div
              v-for="project in recentProjects"
              :key="project.id"
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3 last:border-0"
            >
              <div class="flex-1 w-full">
                <h4 class="font-medium text-sm sm:text-base text-gray-900">{{ project.name }}</h4>
                <p class="text-[10px] sm:text-xs text-gray-600 mt-0.5">
                  {{ project.team_size }} membres • {{ project.due_date }}
                </p>
              </div>
              <span
                :class="{
                  'bg-green-100 text-green-800': project.status === 'En cours',
                  'bg-gray-100 text-gray-800': project.status === 'Planifié',
                  'bg-blue-100 text-blue-800': project.status === 'Complété',
                }"
                class="rounded-full px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium whitespace-nowrap"
              >
                {{ project.status }}
              </span>
            </div>
          </div>
          <Button variant="outline" class="mt-3 sm:mt-4 w-full text-sm">Voir tous les projets</Button>
        </CardContent>
      </Card>

      <!-- Équipe -->
      <Card>
        <CardHeader>
          <CardTitle class="text-base sm:text-lg">Équipe</CardTitle>
          <CardDescription class="text-xs sm:text-sm">Vos collaborateurs actuels</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-3 sm:space-y-4">
            <div
              v-for="member in teamMembers"
              :key="member.id"
              class="flex items-center justify-between border-b pb-3 last:border-0"
            >
              <div class="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div class="text-xl sm:text-2xl flex-shrink-0">{{ member.avatar }}</div>
                <div class="min-w-0 flex-1">
                  <h4 class="font-medium text-sm sm:text-base text-gray-900 truncate">{{ member.name }}</h4>
                  <p class="text-[10px] sm:text-xs text-gray-600 truncate">{{ member.role }}</p>
                </div>
              </div>
              <span class="text-[10px] sm:text-xs font-medium text-gray-600 ml-2 whitespace-nowrap">
                {{ member.projects }} proj.
              </span>
            </div>
          </div>
          <Button variant="outline" class="mt-3 sm:mt-4 w-full text-sm">Gérer l'équipe</Button>
        </CardContent>
      </Card>
    </div>

    <!-- Informations supplémentaires -->
    <Card class="bg-gradient-to-r from-blue-50 to-blue-100">
      <CardHeader>
        <CardTitle class="text-blue-900">💡 Conseil du jour</CardTitle>
      </CardHeader>
      <CardContent class="text-sm text-blue-800">
        Optimisez la traçabilité de votre stock matériel en assignant les articles à des projets.
        Cela vous permettra d'avoir une meilleure visibilité sur vos ressources.
      </CardContent>
    </Card>
  </div>
</template>
