<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Users, Package, TrendingUp, Plus } from 'lucide-vue-next'

definePageMeta({
  middleware: ['auth', 'rbac'],
})

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
  <div class="space-y-6">
    <!-- Header avec accueil -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">
          Bienvenue, {{ currentUser?.name }}! 👋
        </h1>
        <p class="mt-2 text-gray-600">
          Voici un aperçu de votre activité et de vos projets.
        </p>
      </div>
      <div v-if="hasPermission('manage_projects')" class="flex gap-2">
        <Button>
          <Plus class="mr-2 h-4 w-4" />
          Nouveau Projet
        </Button>
      </div>
    </div>

    <!-- Statistiques principales -->
    <div class="grid gap-4 md:grid-cols-4">
      <!-- Projets -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Projets</CardTitle>
          <LayoutDashboard class="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ projectStats.total }}</div>
          <p class="text-xs text-gray-600">{{ projectStats.active }} en cours</p>
        </CardContent>
      </Card>

      <!-- Équipe -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Collaborateurs</CardTitle>
          <Users class="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ teamMembers.length }}</div>
          <p class="text-xs text-gray-600">Actifs sur la plateforme</p>
        </CardContent>
      </Card>

      <!-- Stock matériel -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Stock Matériel</CardTitle>
          <Package class="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ materialStats.total }}</div>
          <p class="text-xs text-gray-600">{{ materialStats.available }} disponibles</p>
        </CardContent>
      </Card>

      <!-- Tendance -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Activité</CardTitle>
          <TrendingUp class="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">+24%</div>
          <p class="text-xs text-gray-600">Vs. la semaine dernière</p>
        </CardContent>
      </Card>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- Projets récents -->
      <Card>
        <CardHeader>
          <CardTitle>Projets Récents</CardTitle>
          <CardDescription>Vos 3 derniers projets</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="project in recentProjects"
              :key="project.id"
              class="flex items-center justify-between border-b pb-3 last:border-0"
            >
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">{{ project.name }}</h4>
                <p class="text-xs text-gray-600">
                  {{ project.team_size }} membres • {{ project.due_date }}
                </p>
              </div>
              <span
                :class="{
                  'bg-green-100 text-green-800': project.status === 'En cours',
                  'bg-gray-100 text-gray-800': project.status === 'Planifié',
                  'bg-blue-100 text-blue-800': project.status === 'Complété',
                }"
                class="rounded-full px-2 py-1 text-xs font-medium"
              >
                {{ project.status }}
              </span>
            </div>
          </div>
          <Button variant="outline" class="mt-4 w-full">Voir tous les projets</Button>
        </CardContent>
      </Card>

      <!-- Équipe -->
      <Card>
        <CardHeader>
          <CardTitle>Équipe</CardTitle>
          <CardDescription>Vos collaborateurs actuels</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="member in teamMembers"
              :key="member.id"
              class="flex items-center justify-between border-b pb-3 last:border-0"
            >
              <div class="flex items-center gap-3">
                <div class="text-2xl">{{ member.avatar }}</div>
                <div>
                  <h4 class="font-medium text-gray-900">{{ member.name }}</h4>
                  <p class="text-xs text-gray-600">{{ member.role }}</p>
                </div>
              </div>
              <span class="text-xs font-medium text-gray-600">
                {{ member.projects }} proj.
              </span>
            </div>
          </div>
          <Button variant="outline" class="mt-4 w-full">Gérer l'équipe</Button>
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
