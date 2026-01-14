<script setup lang="ts">
import { useSidebar } from "@/components/ui/sidebar";
import AppTopbar from "./AppTopbar.vue";

const { open } = useSidebar();
</script>

<template>
  <main
    :class="[
      'transition-all duration-300 flex-1 overflow-y-auto w-full',
      open ? 'md:ml-40' : 'md:ml-24',
    ]"
  >
    <AppTopbar />

    <section class="p-2 sm:p-4 md:p-6">
      <router-view />
      <!-- ou <slot /> -->
    </section>
  </main>
</template>
