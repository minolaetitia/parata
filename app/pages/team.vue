<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Edit2, Trash2, Mail, Briefcase, Activity } from 'lucide-vue-next'

definePageMeta({
  middleware: ['auth', 'rbac'],
})

const { hasPermission } = useAuth()
const searchQuery = ref('')

// Données mockées des collaborateurs
const teamMembers = ref([
  {
    id: 1,
    name: 'Alice Dupont',
    email: 'alice.dupont@company.com',
    role: 'Développeur',
    status: 'Actif',
    projects: 3,
    skills: ['Vue.js', 'TypeScript', 'PostgreSQL'],
    joinDate: '2023-06-15',
    avatar: '👩‍💻',
  },
  {
    id: 2,
    name: 'Bob Martin',
    email: 'bob.martin@company.com',
    role: 'Chef de Projet',
    status: 'Actif',
    projects: 5,
    skills: ['Agile', 'Leadership', 'Planning'],
    joinDate: '2022-12-01',
    avatar: '👨‍💼',
  },
  {
    id: 3,
    name: 'Charlie Chen',
    email: 'charlie.chen@company.com',
    role: 'Développeur',
    status: 'Actif',
    projects: 2,
    skills: ['React', 'Node.js', 'AWS'],
    joinDate: '2024-01-10',
    avatar: '👨‍💻',
  },
  {
    id: 4,
    name: 'Diana Rossi',
    email: 'diana.rossi@company.com',
    role: 'CSM',
    status: 'Actif',
    projects: 4,
    skills: ['Client Relations', 'Reporting', 'Analysis'],
    joinDate: '2023-03-20',
    avatar: '👩‍💼',
  },
  {
    id: 5,
    name: 'Eva Schmidt',
    email: 'eva.schmidt@company.com',
    role: 'Développeur',
    status: 'Congé',
    projects: 1,
    skills: ['Python', 'Django', 'DevOps'],
    joinDate: '2024-05-15',
    avatar: '👩‍💻',
  },
])

const filteredMembers = computed(() => {
  if (!searchQuery.value) {
    return teamMembers.value
  }
  return teamMembers.value.filter(
    member =>
      member.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Actif':
      return 'bg-green-100 text-green-800'
    case 'Congé':
      return 'bg-yellow-100 text-yellow-800'
    case 'Inactif':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const handleDelete = (id: number) => {
  const index = teamMembers.value.findIndex(m => m.id === id)
  if (index > -1) {
    teamMembers.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Collaborateurs</h1>
        <p class="mt-1 text-gray-600">Gérez vos développeurs, chefs de projet et équipe.</p>
      </div>
      <Button v-if="hasPermission('manage_users')" size="lg">
        <Plus class="mr-2 h-4 w-4" />
        Ajouter un collaborateur
      </Button>
    </div>

    <!-- Filtres et recherche -->
    <Card>
      <CardContent class="pt-6">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher par nom, email ou rôle..."
            class="pl-10"
          />
        </div>
      </CardContent>
    </Card>

    <!-- Vue en grille des collaborateurs -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
      <Card
        v-for="member in filteredMembers"
        :key="member.id"
        class="hover:shadow-lg transition-shadow"
      >
        <CardHeader class="pb-3">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="text-3xl">{{ member.avatar }}</div>
              <div>
                <CardTitle>{{ member.name }}</CardTitle>
                <CardDescription>{{ member.role }}</CardDescription>
              </div>
            </div>
            <div v-if="hasPermission('manage_users')" class="flex gap-2">
              <Button size="sm" variant="ghost">
                <Edit2 class="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" @click="handleDelete(member.id)">
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent class="space-y-4">
          <!-- Infos de contact -->
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-sm">
              <Mail class="h-4 w-4 text-gray-400" />
              <a :href="`mailto:${member.email}`" class="text-blue-600 hover:underline">
                {{ member.email }}
              </a>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <Activity class="h-4 w-4 text-gray-400" />
              <span :class="getStatusColor(member.status)" class="rounded-full px-2 py-1 text-xs font-medium">
                {{ member.status }}
              </span>
            </div>
          </div>

          <!-- Compétences -->
          <div>
            <p class="mb-2 text-sm font-medium text-gray-700">Compétences</p>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="skill in member.skills"
                :key="skill"
                class="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Statistiques -->
          <div class="grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <p class="text-xs text-gray-600">Projets assignés</p>
              <p class="text-2xl font-bold text-gray-900">{{ member.projects }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-600">Depuis le</p>
              <p class="text-sm font-medium text-gray-900">
                {{ new Date(member.joinDate).toLocaleDateString('fr-FR') }}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2 pt-2">
            <Button variant="outline" size="sm" class="flex-1">Profil</Button>
            <Button variant="outline" size="sm" class="flex-1">Historique</Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Message vide -->
    <Card v-if="filteredMembers.length === 0" class="border-dashed">
      <CardContent class="pt-12 pb-12 text-center">
        <Briefcase class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-4 text-lg font-medium text-gray-900">Aucun collaborateur trouvé</h3>
        <p class="mt-2 text-gray-600">Commencez à ajouter des membres à votre équipe.</p>
        <Button class="mt-4">
          <Plus class="mr-2 h-4 w-4" />
          Ajouter un collaborateur
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
