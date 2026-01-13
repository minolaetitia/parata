<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebarGroup from './AppSidebarGroup.vue';
</script>

<template>
  <SidebarProvider>
    <AppSidebarGroup />
    <AppSidebar />
    <main>
      <SidebarTrigger />
      <slot />
    </main>
  </SidebarProvider>
</template>
