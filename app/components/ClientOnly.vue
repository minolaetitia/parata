<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isClientReady = ref(false)

onMounted(() => {
  isClientReady.value = true
})
</script>

<template>
  <div v-if="isClientReady">
    <slot />
  </div>
</template>
