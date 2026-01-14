<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { ref } from 'vue'
import { LogOut, Settings, User } from 'lucide-vue-next'
import { useRBAC } from '@/composables/useRBAC'

const { currentUser, logout } = useAuth()
const { getRoleLabel } = useRBAC()
const showUserMenu = ref(false)

const handleLogout = () => {
  logout()
  navigateTo('/login')
}

const handleProfile = () => {
  showUserMenu.value = false
  console.log('Naviguer vers le profil')
}

const handleSettings = () => {
  showUserMenu.value = false
  console.log('Naviguer vers les paramètres')
}
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b bg-white">
    <div class="flex h-16 items-center gap-4 px-6">
      <!-- Sidebar Toggle -->
      <SidebarTrigger class="-ml-1" />
      
      <Separator orientation="vertical" class="h-6" />
      
      <!-- App Title -->
      <div class="flex-1">
        <span class="text-sm font-semibold text-gray-700">Parata - Gestion de Projets</span>
      </div>

      <!-- User Menu -->
      <ClientOnly>
        <div v-if="currentUser" class="relative">
          <button
            @click="showUserMenu = !showUserMenu"
            class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
          >
            <img
              :src="currentUser.avatar"
              :alt="currentUser.name"
              class="h-8 w-8 rounded-full"
            />
            <div class="hidden md:block">
              <p class="font-medium text-gray-900">{{ currentUser.name }}</p>
              <p class="text-xs text-gray-600">{{ getRoleLabel(currentUser.role) }}</p>
            </div>
          </button>

          <!-- User Menu Dropdown -->
          <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-show="showUserMenu"
              class="absolute right-0 mt-1 w-48 rounded-lg border border-gray-200 bg-white shadow-lg"
            >
              <div class="border-b border-gray-100 px-4 py-3">
                <p class="font-medium text-gray-900">{{ currentUser.name }}</p>
                <p class="text-xs text-gray-600">{{ currentUser.email }}</p>
              </div>
              <button
                @click="handleProfile"
                class="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors text-gray-700"
              >
                <User class="h-4 w-4" />
                <span>Voir mon profil</span>
              </button>
              <button
                @click="handleSettings"
                class="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors text-gray-700"
              >
                <Settings class="h-4 w-4" />
                <span>Paramètres</span>
              </button>
              <div class="border-t border-gray-100" />
              <button
                @click="handleLogout"
                class="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-red-50 transition-colors text-red-600"
              >
                <LogOut class="h-4 w-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </Transition>

          <!-- Backdrop -->
          <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0"
            enter-to-class="transform opacity-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100"
            leave-to-class="transform opacity-0"
          >
            <div
              v-if="showUserMenu"
              class="fixed inset-0 z-30"
              @click="showUserMenu = false"
            />
          </Transition>
        </div>
      </ClientOnly>
    </div>
  </header>
</template>
