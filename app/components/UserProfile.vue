<script setup lang="ts">
import { ref } from 'vue'
import { LogOut, Settings, User } from 'lucide-vue-next'
import { useRBAC } from '@/composables/useRBAC'

const { currentUser, logout } = useAuth()
const { getRoleLabel } = useRBAC()
const showMenu = ref(false)

const handleLogout = () => {
  logout()
  navigateTo('/login')
}

const handleProfile = () => {
  showMenu.value = false
  console.log('Naviguer vers le profil')
}

const handleSettings = () => {
  showMenu.value = false
  console.log('Naviger vers les paramètres')
}
</script>

<template>
  <ClientOnly>
    <div v-if="currentUser" class="relative border-t border-gray-200 p-4">
      <button
        @click="showMenu = !showMenu"
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100 transition-colors"
      >
        <img
          :src="currentUser.avatar"
          :alt="currentUser.name"
          class="h-8 w-8 rounded-full flex-shrink-0"
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

      <!-- Menu contextuel -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="showMenu"
            class="fixed inset-0 z-50"
            @click="showMenu = false"
          />
        </Transition>

        <Transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-show="showMenu"
            class="fixed bottom-20 left-4 right-4 z-50 w-56 rounded-lg border border-gray-200 bg-white shadow-lg md:left-auto"
          >
            <div class="px-3 py-2">
              <p class="text-xs font-semibold text-gray-500 uppercase">Mon compte</p>
            </div>
            <button
              @click="handleProfile"
              class="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 transition-colors text-gray-700"
            >
              <User class="h-4 w-4" />
              <span>Voir mon profil</span>
            </button>
            <button
              @click="handleSettings"
              class="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 transition-colors text-gray-700"
            >
              <Settings class="h-4 w-4" />
              <span>Paramètres</span>
            </button>
            <div class="border-t border-gray-100" />
            <button
              @click="handleLogout"
              class="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-red-50 transition-colors text-red-600"
            >
              <LogOut class="h-4 w-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </Transition>
      </Teleport>
    </div>
  </ClientOnly>
</template>
