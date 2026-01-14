<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Edit2, Trash2, Package, AlertTriangle, CheckCircle } from 'lucide-vue-next'

// Protection gérée par le plugin client auth-guard.client.ts

const { hasPermission } = useAuth()
const searchQuery = ref('')
const statusFilter = ref<string | null>(null)

// Données mockées du stock matériel
const materials = ref([
  {
    id: 1,
    name: 'Laptop Dell XPS 15',
    type: 'Ordinateur',
    serialNumber: 'DELL-XPS-001',
    status: 'Disponible',
    location: 'Bureau A',
    assignedTo: null,
    assignedDate: null,
    purchaseDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Laptop MacBook Pro 16"',
    type: 'Ordinateur',
    serialNumber: 'APPLE-MBP-001',
    status: 'Attribué',
    location: 'Bureau B',
    assignedTo: 'Alice Dupont',
    assignedDate: '2024-06-01',
    purchaseDate: '2023-06-20',
  },
  {
    id: 3,
    name: 'Écran LG 27"',
    type: 'Moniteur',
    serialNumber: 'LG-27-001',
    status: 'Disponible',
    location: 'Stock Central',
    assignedTo: null,
    assignedDate: null,
    purchaseDate: '2023-03-10',
  },
  {
    id: 4,
    name: 'Écran LG 27"',
    type: 'Moniteur',
    serialNumber: 'LG-27-002',
    status: 'Attribué',
    location: 'Bureau C',
    assignedTo: 'Bob Martin',
    assignedDate: '2024-02-15',
    purchaseDate: '2023-03-10',
  },
  {
    id: 5,
    name: 'Clavier Logitech',
    type: 'Accessoire',
    serialNumber: 'LOG-KB-001',
    status: 'HS',
    location: 'Réparation',
    assignedTo: null,
    assignedDate: null,
    purchaseDate: '2022-12-05',
  },
  {
    id: 6,
    name: 'Souris Logitech MX',
    type: 'Accessoire',
    serialNumber: 'LOG-MOUSE-001',
    status: 'Disponible',
    location: 'Stock Central',
    assignedTo: null,
    assignedDate: null,
    purchaseDate: '2023-09-12',
  },
])

const statuses = ['Disponible', 'Attribué', 'HS']

const filteredMaterials = computed(() => {
  let result = materials.value

  // Filtre de recherche
  if (searchQuery.value) {
    result = result.filter(
      material =>
        material.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        material.serialNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        material.type.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  // Filtre de statut
  if (statusFilter.value) {
    result = result.filter(material => material.status === statusFilter.value)
  }

  return result
})

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Disponible':
      return CheckCircle
    case 'Attribué':
      return Package
    case 'HS':
      return AlertTriangle
    default:
      return Package
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Disponible':
      return 'bg-green-100 text-green-800'
    case 'Attribué':
      return 'bg-blue-100 text-blue-800'
    case 'HS':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const materialCount = computed(() => ({
  total: materials.value.length,
  available: materials.value.filter(m => m.status === 'Disponible').length,
  assigned: materials.value.filter(m => m.status === 'Attribué').length,
  defective: materials.value.filter(m => m.status === 'HS').length,
}))

const handleDelete = (id: number) => {
  const index = materials.value.findIndex(m => m.id === id)
  if (index > -1) {
    materials.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Stock Matériel</h1>
        <p class="mt-1 text-gray-600">Gérez et suivez l'inventaire de votre matériel.</p>
      </div>
      <Button v-if="hasPermission('manage_projects')" size="lg">
        <Plus class="mr-2 h-4 w-4" />
        Ajouter du matériel
      </Button>
    </div>

    <!-- Statistiques -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ materialCount.total }}</div>
          <p class="text-xs text-gray-600">Éléments en stock</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-green-800">Disponible</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-green-600">{{ materialCount.available }}</div>
          <p class="text-xs text-gray-600">Prêts à l'emploi</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-blue-800">Attribué</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-blue-600">{{ materialCount.assigned }}</div>
          <p class="text-xs text-gray-600">Actuellement utilisé</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-red-800">HS</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-red-600">{{ materialCount.defective }}</div>
          <p class="text-xs text-gray-600">En réparation</p>
        </CardContent>
      </Card>
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
                placeholder="Nom, numéro de série, type..."
                class="pl-10"
              />
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">Statut</label>
            <div class="flex flex-wrap gap-2">
              <Button
                v-for="status in statuses"
                :key="status"
                :variant="statusFilter === status ? 'default' : 'outline'"
                size="sm"
                @click="statusFilter = statusFilter === status ? null : status"
              >
                {{ status }}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Liste du matériel -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b bg-gray-50">
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
              Matériel
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
              Type
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
              N° Série
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
              Statut
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
              Localisation
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
              Assigné à
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y bg-white">
          <tr v-for="material in filteredMaterials" :key="material.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ material.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ material.type }}</td>
            <td class="px-6 py-4 text-sm font-mono text-gray-600">{{ material.serialNumber }}</td>
            <td class="px-6 py-4">
              <span :class="getStatusColor(material.status)" class="rounded-full px-2 py-1 text-xs font-medium">
                {{ material.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ material.location }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ material.assignedTo || '-' }}
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Edit2 class="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" @click="handleDelete(material.id)">
                  <Trash2 class="h-4 w-4" />
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Message vide -->
      <div v-if="filteredMaterials.length === 0" class="bg-white px-6 py-12 text-center">
        <Package class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-4 text-lg font-medium text-gray-900">Aucun matériel trouvé</h3>
        <p class="mt-2 text-gray-600">Ajoutez du matériel à votre inventaire.</p>
        <Button class="mt-4">
          <Plus class="mr-2 h-4 w-4" />
          Ajouter du matériel
        </Button>
      </div>
    </div>
  </div>
</template>
