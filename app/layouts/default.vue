<script setup lang="ts">
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/sidebar/AppSidebar.vue";
import MainLayout from "@/layouts/MainLayout.vue";
</script>

<template>
  <SidebarProvider :default-open="false" class="min-h-screen">
    <AppSidebar />
    <MainLayout />
  </SidebarProvider>
</template>
