<script setup lang="ts">
// Composant de démonstration de la charte graphique Parata
</script>

<template>
  <div class="p-6 space-y-8 bg-white">
    <!-- En-tête -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-parata-blue mb-2">Charte Graphique Parata</h1>
      <p class="text-parata-blue-dark">Démonstration des couleurs et composants</p>
    </div>

    <!-- Palette de couleurs -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-parata-blue">Palette de Couleurs</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Bleu -->
        <div class="space-y-2">
          <div class="h-20 bg-parata-blue rounded-lg shadow-parata flex items-center justify-center">
            <span class="text-white font-semibold">Bleu Principal</span>
          </div>
          <p class="text-sm text-center text-gray-600">#003366</p>
        </div>

        <div class="space-y-2">
          <div class="h-20 bg-parata-blue-dark rounded-lg shadow-parata flex items-center justify-center">
            <span class="text-white font-semibold">Bleu Foncé</span>
          </div>
          <p class="text-sm text-center text-gray-600">#0B3C5D</p>
        </div>

        <div class="space-y-2">
          <div class="h-20 bg-parata-blue-light rounded-lg shadow-parata flex items-center justify-center">
            <span class="text-white font-semibold">Bleu Clair</span>
          </div>
          <p class="text-sm text-center text-gray-600">#1a4d7a</p>
        </div>

        <!-- Or -->
        <div class="space-y-2">
          <div class="h-20 bg-parata-gold-light rounded-lg shadow-parata-gold flex items-center justify-center">
            <span class="text-parata-blue font-semibold">Or Clair</span>
          </div>
          <p class="text-sm text-center text-gray-600">#f7d870</p>
        </div>

        <div class="space-y-2">
          <div class="h-20 bg-parata-gold rounded-lg shadow-parata-gold flex items-center justify-center">
            <span class="text-parata-blue font-semibold">Or Principal</span>
          </div>
          <p class="text-sm text-center text-gray-600">#F4C542</p>
        </div>

        <div class="space-y-2">
          <div class="h-20 bg-parata-gold-dark rounded-lg shadow-parata-gold flex items-center justify-center">
            <span class="text-white font-semibold">Or Foncé</span>
          </div>
          <p class="text-sm text-center text-gray-600">#d4a732</p>
        </div>
      </div>
    </section>

    <!-- Boutons -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-parata-blue">Boutons</h2>
      
      <div class="flex flex-wrap gap-4">
        <button class="px-6 py-3 bg-parata-gold hover:bg-parata-gold-dark text-parata-blue font-semibold rounded-lg transition-colors shadow-parata-gold">
          Bouton Principal
        </button>
        
        <button class="px-6 py-3 bg-parata-blue hover:bg-parata-blue-dark text-white font-semibold rounded-lg transition-colors shadow-parata">
          Bouton Secondaire
        </button>
        
        <button class="px-6 py-3 border-2 border-parata-blue text-parata-blue hover:bg-parata-blue hover:text-white font-semibold rounded-lg transition-colors">
          Bouton Outline
        </button>
      </div>
    </section>

    <!-- Cartes -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-parata-blue">Cartes</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-6 bg-parata-blue/5 border border-parata-blue/20 rounded-lg">
          <h3 class="text-lg font-semibold text-parata-blue mb-2">Carte avec accent bleu</h3>
          <p class="text-parata-blue-dark">Contenu de la carte avec texte en bleu foncé</p>
        </div>

        <div class="p-6 bg-parata-gold/10 border border-parata-gold/30 rounded-lg">
          <h3 class="text-lg font-semibold text-parata-gold-dark mb-2">Carte avec accent or</h3>
          <p class="text-parata-blue-dark">Contenu de la carte avec texte en bleu foncé</p>
        </div>
      </div>
    </section>

    <!-- Dégradés -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-parata-blue">Dégradés</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="h-32 bg-parata-gradient rounded-lg shadow-parata flex items-center justify-center">
          <span class="text-white font-semibold text-xl">Dégradé Bleu</span>
        </div>

        <div class="h-32 bg-parata-gradient-gold rounded-lg shadow-parata-gold flex items-center justify-center">
          <span class="text-parata-blue font-semibold text-xl">Dégradé Or</span>
        </div>
      </div>
    </section>

    <!-- Texte avec dégradé -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-parata-blue">Texte avec Dégradé</h2>
      
      <h1 class="text-4xl font-bold text-gradient-parata text-center">
        Titre avec Dégradé Parata
      </h1>
    </section>

    <!-- Ombres -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-parata-blue">Ombres</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-6 bg-white rounded-lg shadow-parata">
          <h3 class="text-lg font-semibold text-parata-blue mb-2">Ombre Bleue</h3>
          <p class="text-gray-600">Carte avec ombre bleue subtile</p>
        </div>

        <div class="p-6 bg-white rounded-lg shadow-parata-gold">
          <h3 class="text-lg font-semibold text-parata-gold-dark mb-2">Ombre Dorée</h3>
          <p class="text-gray-600">Carte avec ombre dorée subtile</p>
        </div>
      </div>
    </section>

    <!-- Icônes -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-parata-blue">Icônes Colorées</h2>
      
      <div class="flex gap-6">
        <div class="flex flex-col items-center gap-2">
          <div class="p-4 bg-parata-blue/10 rounded-full">
            <svg class="w-8 h-8 text-parata-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="text-sm text-gray-600">Bleu</span>
        </div>

        <div class="flex flex-col items-center gap-2">
          <div class="p-4 bg-parata-gold/20 rounded-full">
            <svg class="w-8 h-8 text-parata-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <span class="text-sm text-gray-600">Or</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Styles additionnels si nécessaire */
</style>
