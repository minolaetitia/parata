<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const { handleGoogleSignIn } = useAuth()
const router = useRouter()

const onSuccess = async (event: { credential: string; claims: any }) => {
  console.log('Google Sign-In successful:', event.claims)
  handleGoogleSignIn(event.claims)
  await navigateTo('/')
}

const onVerified = (data: any) => {
  console.log('Token verified on server:', data)
}

const onError = (error: any) => {
  console.error('Google Sign-In error:', error)
}

definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-parata-blue-dark p-3 sm:p-4">
    <Card class="w-full max-w-md shadow-2xl">
      <CardHeader class="space-y-2 text-center px-4 sm:px-6">
        <div class="mb-3 sm:mb-4 flex justify-center">
          <div class="rounded-lg bg-parata-blue p-2 sm:p-3">
            <svg
              class="h-6 w-6 sm:h-8 sm:w-8 text-parata-gold"
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
        <CardTitle class="text-xl sm:text-2xl font-bold text-parata-blue">BocasayApp</CardTitle>
        <CardDescription class="text-sm">Gestion de Projets & Stock Matériel</CardDescription>
      </CardHeader>

      <CardContent class="space-y-3 sm:space-y-4 px-4 sm:px-6">
        <!-- Google Sign In Button -->
        <div class="flex justify-center py-4">
          <GoogleLoginButton
            :verify-on-server="true"
            :options="{ 
              theme: 'filled_blue', 
              size: 'large',
              width: 350
            }"
            @success="onSuccess"
            @verified="onVerified"
            @error="onError"
          />
        </div>

        <div class="relative py-2 sm:py-3">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-xs sm:text-sm">
            <span class="bg-white px-2 text-gray-500">Secure authentication via Google</span>
          </div>
        </div>

        <!-- Informations de sécurité -->
        <div class="rounded-lg bg-parata-blue/5 border border-parata-blue/20 p-2 sm:p-3 text-center text-[10px] sm:text-xs text-parata-blue">
          <p>🔒 Connexion sécurisée via Google OAuth 2.0</p>
          <p class="mt-1">Vos données sont protégées et chiffrées.</p>
        </div>

        <!-- Development note -->
        <div v-if="false" class="space-y-2 sm:space-y-3">
          <div>
            <label for="fullName" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Nom complet (Dev Mode)
            </label>
            <Input
              id="fullName"
              class="text-sm"
              type="text"
              placeholder="Votre nom et prénom"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>