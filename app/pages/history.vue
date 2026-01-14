<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Clock, User, Package, FileText } from 'lucide-vue-next'

// Protection gérée par le plugin client auth-guard.client.ts

const searchQuery = ref('')
const filterType = ref<string | null>(null)

// Données mockées de l'historique
const historyEvents = ref([
  {
    id: 1,
    type: 'projet_creation',
    title: 'Projet créé: Refonte Site Web',
    description: 'Alice Dupont a créé le projet "Refonte Site Web"',
    user: 'Alice Dupont',
    timestamp: '2025-01-15T10:30:00',
    icon: '📋',
  },
  {
    id: 2,
    type: 'collaborateur_assignation',
    title: 'Bob Martin assigné au projet',
    description: 'Alice Dupont a assigné Bob Martin à "Refonte Site Web"',
    user: 'Alice Dupont',
    timestamp: '2025-01-15T11:45:00',
    icon: '👤',
  },
  {
    id: 3,
    type: 'materiel_attribution',
    title: 'Matériel attribué: Laptop MacBook Pro',
    description: 'Alice Dupont a attribué un MacBook Pro à Bob Martin',
    user: 'Alice Dupont',
    timestamp: '2025-01-16T09:00:00',
    icon: '💻',
  },
  {
    id: 4,
    type: 'commentaire_ajout',
    title: 'Commentaire ajouté au projet',
    description: 'Charlie Chen a commenté sur "API Reporting": "Prêt pour review"',
    user: 'Charlie Chen',
    timestamp: '2025-01-16T14:30:00',
    icon: '💬',
  },
  {
    id: 5,
    type: 'projet_modification',
    title: 'Projet modifié: API Reporting',
    description: 'Diana Rossi a mis à jour la date de fin à 2025-02-28',
    user: 'Diana Rossi',
    timestamp: '2025-01-17T10:15:00',
    icon: '✏️',
  },
  {
    id: 6,
    type: 'materiel_retrait',
    title: 'Matériel retiré: Écran LG 27"',
    description: 'Eva Schmidt a retiré un écran à Charlie Chen',
    user: 'Eva Schmidt',
    timestamp: '2025-01-17T16:45:00',
    icon: '⚠️',
  },
  {
    id: 7,
    type: 'projet_completion',
    title: 'Projet complété: Sécurité OAuth',
    description: 'Bob Martin a marqué "Sécurité OAuth" comme complété',
    user: 'Bob Martin',
    timestamp: '2025-01-18T11:30:00',
    icon: '✅',
  },
  {
    id: 8,
    type: 'collaborateur_assignation',
    title: 'Charlie Chen assigné au projet',
    description: 'Alice Dupont a assigné Charlie Chen à "Migration BD"',
    user: 'Alice Dupont',
    timestamp: '2025-01-18T13:00:00',
    icon: '👤',
  },
])

const eventTypes = [
  { value: 'projet_creation', label: 'Création de projet' },
  { value: 'projet_modification', label: 'Modification de projet' },
  { value: 'projet_completion', label: 'Projet complété' },
  { value: 'collaborateur_assignation', label: 'Assignation collaborateur' },
  { value: 'materiel_attribution', label: 'Attribution matériel' },
  { value: 'materiel_retrait', label: 'Retrait matériel' },
  { value: 'commentaire_ajout', label: 'Commentaire ajouté' },
]

const filteredHistory = computed(() => {
  let result = historyEvents.value

  // Filtre de recherche
  if (searchQuery.value) {
    result = result.filter(
      event =>
        event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        event.user.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  // Filtre de type
  if (filterType.value) {
    result = result.filter(event => event.type === filterType.value)
  }

  return result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
})

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) {
    return 'À l\'instant'
  } else if (diffHours < 24) {
    return `Il y a ${diffHours}h`
  } else if (diffDays < 7) {
    return `Il y a ${diffDays}j`
  } else {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'projet_creation':
    case 'projet_completion':
      return 'bg-blue-50'
    case 'collaborateur_assignation':
      return 'bg-green-50'
    case 'materiel_attribution':
    case 'materiel_retrait':
      return 'bg-yellow-50'
    case 'commentaire_ajout':
      return 'bg-purple-50'
    case 'projet_modification':
      return 'bg-gray-50'
    default:
      return 'bg-gray-50'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Historique & Traçabilité</h1>
      <p class="mt-1 text-gray-600">
        Consultez l'historique complet de toutes les actions et modifications.
      </p>
    </div>

    <!-- Filtres -->
    <Card>
      <CardContent class="pt-6">
        <div class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">Rechercher</label>
            <div class="relative">
              <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                v-model="searchQuery"
                type="text"
                placeholder="Titre, description, utilisateur..."
                class="pl-10"
              />
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">Type d'événement</label>
            <div class="flex flex-wrap gap-2">
              <button
                @click="filterType = null"
                :class="{
                  'bg-blue-600 text-white': filterType === null,
                  'bg-gray-200 text-gray-700 hover:bg-gray-300': filterType !== null,
                }"
                class="rounded px-3 py-1 text-sm font-medium transition-colors"
              >
                Tous
              </button>
              <button
                v-for="type in eventTypes"
                :key="type.value"
                @click="filterType = filterType === type.value ? null : type.value"
                :class="{
                  'bg-blue-600 text-white': filterType === type.value,
                  'bg-gray-200 text-gray-700 hover:bg-gray-300': filterType !== type.value,
                }"
                class="rounded px-3 py-1 text-sm font-medium transition-colors"
              >
                {{ type.label }}
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Timeline d'historique -->
    <div class="space-y-4">
      <div v-if="filteredHistory.length === 0" class="text-center py-12">
        <Clock class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-4 text-lg font-medium text-gray-900">Aucun événement trouvé</h3>
        <p class="mt-2 text-gray-600">Essayez d'ajuster vos critères de recherche.</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="(event, index) in filteredHistory"
          :key="event.id"
          class="relative"
        >
          <!-- Timeline connector -->
          <div
            v-if="index < filteredHistory.length - 1"
            class="absolute left-4 top-12 h-12 w-0.5 bg-gray-200"
          />

          <!-- Event card -->
          <Card :class="getTypeColor(event.type)">
            <CardContent class="pt-6">
              <div class="flex gap-4">
                <!-- Icon -->
                <div class="text-3xl flex-shrink-0">{{ event.icon }}</div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <h3 class="font-semibold text-gray-900">{{ event.title }}</h3>
                      <p class="mt-1 text-sm text-gray-700">{{ event.description }}</p>
                    </div>
                    <span class="text-xs font-medium text-gray-600 flex-shrink-0">
                      {{ formatDate(event.timestamp) }}
                    </span>
                  </div>

                  <!-- Footer avec utilisateur -->
                  <div class="mt-3 flex items-center gap-2 text-xs text-gray-600">
                    <User class="h-3 w-3" />
                    <span>{{ event.user }}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <!-- Info supplementaire -->
    <Card class="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle class="text-blue-900">📌 À propos de l'historique</CardTitle>
      </CardHeader>
      <CardContent class="text-sm text-blue-800">
        <ul class="list-inside space-y-1">
          <li>✓ Tous les changements sont enregistrés automatiquement</li>
          <li>✓ Horodatage précis avec fuseau horaire UTC+1</li>
          <li>✓ Identification de l'utilisateur pour chaque action</li>
          <li>✓ Conservation de l'historique complet pour audit</li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>
