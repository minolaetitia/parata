import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false }, // Désactivé pour éviter erreurs cross-origin en iframe
  css: ["~/assets/css/main.css"],

  // Configuration pour le responsive
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
      meta: [
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
      ]
    }
  },

  // Auto-imports explicites
  imports: {
    autoImport: true,
    dirs: [
      'composables',
      'composables/**',
      'utils',
      'lib',
    ]
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["shadcn-nuxt", "nuxt-google-auth"],

  runtimeConfig: {
    public: {
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
    }
  },

  // Google Auth configuration (module options)
  // @ts-ignore - nuxt-google-auth module types not yet available
  googleAuth: {
    clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    autoLoadScript: true,
    promptOneTap: false,
    enableServerVerify: true
  },

  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
});
