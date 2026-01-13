<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const { loginWithGoogle, isLoading } = useAuth()
const router = useRouter()
const email = ref('')
const fullName = ref('')
const showTestEmails = ref(false)

const testAccounts = [
  {
    name: 'Alice Dupont',
    email: 'alice.dupont@company.com',
    role: 'Admin',
  },
  {
    name: 'Bob Martin',
    email: 'bob.martin@company.com',
    role: 'Chef de Projet',
  },
  {
    name: 'Charlie Chen',
    email: 'charlie.chen@company.com',
    role: 'Développeur',
  },
  {
    name: 'Diana Rossi',
    email: 'diana.rossi@company.com',
    role: 'CSM/DT/DTA',
  },
]

const handleGoogleSignIn = async () => {
  if (!email.value || !fullName.value) {
    return
  }

  try {
    await loginWithGoogle(fullName.value, email.value)
    navigateTo('/')
  } catch (error) {
    console.error('Erreur de connexion:', error)
  }
}

const selectTestAccount = async (account: typeof testAccounts[0]) => {
  email.value = account.email
  fullName.value = account.name
  await handleGoogleSignIn()
}

const handleGoogleClick = () => {
  // Simuler le clic sur le bouton Google - dans une vraie app, 
  // cela déclencherait le flux OAuth Google
  showTestEmails.value = !showTestEmails.value
}

definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
    <Card class="w-full max-w-md shadow-2xl">
      <CardHeader class="space-y-2 text-center">
        <div class="mb-4 flex justify-center">
          <div class="rounded-lg bg-blue-600 p-3">
            <svg
              class="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <CardTitle class="text-2xl font-bold">Parata</CardTitle>
        <CardDescription>Gestion de Projets & Stock Matériel</CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
        <!-- Formulaire d'entrée -->
        <div class="space-y-3">
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            <Input
              id="fullName"
              v-model="fullName"
              type="text"
              placeholder="Votre nom et prénom"
              @keyup.enter="handleGoogleSignIn"
              :disabled="isLoading"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Adresse email
            </label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="vous@example.com"
              @keyup.enter="handleGoogleSignIn"
              :disabled="isLoading"
            />
          </div>
        </div>

        <!-- Bouton Google Sign-In -->
        <Button
          @click="handleGoogleClick"
          class="w-full"
          variant="outline"
          :disabled="isLoading"
        >
          <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span v-if="isLoading" class="ml-2">Connexion en cours...</span>
          <span v-else>Se connecter avec Google</span>
        </Button>

        <!-- Test accounts dropdown -->
        <div v-if="showTestEmails" class="space-y-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p class="text-xs font-semibold text-blue-900">Comptes de test (pour démo):</p>
          <div class="space-y-2">
            <button
              v-for="account in testAccounts"
              :key="account.email"
              @click="selectTestAccount(account)"
              class="w-full rounded border border-blue-300 bg-white px-3 py-2 text-left text-sm hover:bg-blue-50 transition-colors"
              :disabled="isLoading"
            >
              <div class="font-medium text-gray-900">{{ account.name }}</div>
              <div class="text-xs text-gray-600">
                {{ account.email }} • {{ account.role }}
              </div>
            </button>
          </div>
        </div>

        <!-- Informations de sécurité -->
        <div class="rounded-lg bg-gray-50 p-3 text-center text-xs text-gray-600">
          <p>🔒 Connexion sécurisée via Google OAuth 2.0</p>
          <p class="mt-1">Vos données sont protégées et chiffrées.</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
:deep(.dark) {
  @apply bg-gradient-to-br from-slate-950 to-slate-900;
}
</style>
