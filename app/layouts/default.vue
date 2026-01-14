<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <main class="flex-1">
      <div class="flex items-center gap-4 border-b bg-white p-4">
        <SidebarTrigger />
        <div class="ml-auto flex items-center gap-4">
          <span class="text-sm font-medium text-gray-700">Parata - Gestion de Projets</span>
        </div>
      </div>
      <div class="p-6">
        <slot />
      </div>
    </main>
  </SidebarProvider>
</template>
