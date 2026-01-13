<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, Settings, User } from 'lucide-vue-next'
import { useRBAC } from '@/composables/useRBAC'

const { currentUser, logout } = useAuth()
const { getRoleLabel } = useRBAC()
const router = useRouter()

const handleLogout = () => {
  logout()
  navigateTo('/login')
}

const handleProfile = () => {
  // À implémenter: page de profil utilisateur
  console.log('Naviguer vers le profil')
}

const handleSettings = () => {
  // À implémenter: page des paramètres
  console.log('Naviguer vers les paramètres')
}
</script>

<template>
  <div v-if="currentUser" class="border-t border-gray-200 p-4">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <button
          class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100 transition-colors"
        >
          <img
            :src="currentUser.avatar"
            :alt="currentUser.name"
            class="h-8 w-8 rounded-full"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ currentUser.name }}
            </p>
            <p class="text-xs text-gray-600 truncate">
              {{ getRoleLabel(currentUser.role) }}
            </p>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-56" align="end">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem @click="handleProfile">
          <User class="mr-2 h-4 w-4" />
          <span>Voir mon profil</span>
        </DropdownMenuItem>

        <DropdownMenuItem @click="handleSettings">
          <Settings class="mr-2 h-4 w-4" />
          <span>Paramètres</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem @click="handleLogout" class="text-red-600">
          <LogOut class="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
