# 🎨 Charte Graphique Parata

## Palette de Couleurs

### Couleur Primaire - Bleu
- **Bleu Principal** : `#003366` 
  - Usage : Textes forts, headers, éléments principaux
  - Classes Tailwind : `bg-parata-blue`, `text-parata-blue`
  
- **Bleu Foncé** : `#0B3C5D`
  - Usage : Arrière-plans, sidebar, footer
  - Classes Tailwind : `bg-parata-blue-dark`, `text-parata-blue-dark`

- **Bleu Clair** : `#1a4d7a`
  - Usage : Hover states, liens
  - Classes Tailwind : `bg-parata-blue-light`, `text-parata-blue-light`

### Couleur d'Accent - Jaune/Or
- **Or Principal** : `#F4C542`
  - Usage : CTA, boutons, highlights, éléments interactifs
  - Classes Tailwind : `bg-parata-gold`, `text-parata-gold`

- **Or Clair** : `#f7d870`
  - Usage : Hover states, backgrounds légers
  - Classes Tailwind : `bg-parata-gold-light`, `text-parata-gold-light`

- **Or Foncé** : `#d4a732`
  - Usage : Bordures, ombres, textes sur fond clair
  - Classes Tailwind : `bg-parata-gold-dark`, `text-parata-gold-dark`

### Couleur Neutre - Blanc
- **Blanc** : `#FFFFFF`
  - Usage : Fonds d'écran, sections claires, texte sur fond foncé
  - Classes Tailwind : `bg-white`, `text-white`

## Variables CSS

### Variables Personnalisées
```css
--parata-blue: #003366;
--parata-blue-dark: #0B3C5D;
--parata-blue-light: #1a4d7a;
--parata-gold: #F4C542;
--parata-gold-light: #f7d870;
--parata-gold-dark: #d4a732;
--parata-white: #FFFFFF;
```

### Classes Utilitaires

#### Dégradés
```html
<!-- Dégradé bleu -->
<div class="bg-parata-gradient">...</div>

<!-- Dégradé or -->
<div class="bg-parata-gradient-gold">...</div>

<!-- Texte en dégradé -->
<h1 class="text-gradient-parata">Titre</h1>
```

#### Ombres
```html
<!-- Ombre bleue -->
<div class="shadow-parata">...</div>

<!-- Ombre dorée -->
<div class="shadow-parata-gold">...</div>
```

## Guide d'Utilisation

### Boutons

#### Bouton Principal (CTA)
```vue
<Button class="bg-parata-gold hover:bg-parata-gold-dark text-parata-blue">
  Action
</Button>
```

#### Bouton Secondaire
```vue
<Button variant="outline" class="border-parata-blue text-parata-blue hover:bg-parata-blue hover:text-white">
  Action
</Button>
```

### Cartes et Conteneurs

#### Carte avec accent
```vue
<Card class="border-parata-blue/20 bg-parata-blue/5">
  <CardHeader>
    <CardTitle class="text-parata-blue">Titre</CardTitle>
  </CardHeader>
  <CardContent class="text-parata-blue-dark">
    Contenu
  </CardContent>
</Card>
```

### Titres et Textes

#### Headers
```vue
<h1 class="text-2xl font-bold text-parata-blue">Titre Principal</h1>
<h2 class="text-xl font-semibold text-parata-blue">Sous-titre</h2>
```

#### Texte d'accent
```vue
<p class="text-parata-gold font-medium">Texte important</p>
```

### Icônes

#### Icône primaire
```vue
<LayoutDashboard class="h-4 w-4 text-parata-blue" />
```

#### Icône d'accent
```vue
<Star class="h-4 w-4 text-parata-gold" />
```

## Exemples d'Application

### Navigation Sidebar
- Background : `bg-parata-blue-dark`
- Texte : `text-white`
- Accent hover : `bg-parata-gold`

### Topbar
- Background : `bg-white`
- Texte : `text-parata-blue`
- Bordure : `border-parata-blue/10`

### Page de Login
- Background : `bg-parata-blue-dark`
- Boutons : `bg-parata-gold hover:bg-parata-gold-dark`
- Cards : `bg-white` avec bordure `border-parata-blue/20`

### Dashboard
- Statistiques : Icônes `text-parata-blue` ou `text-parata-gold`
- Titres : `text-parata-blue`
- Cartes d'info : `bg-parata-blue/5` avec `border-parata-blue/20`

## Mode Sombre

En mode sombre, les couleurs s'ajustent automatiquement :
- Background : Bleu très foncé
- Texte : Blanc
- Accents : Or plus lumineux
- Bordures : Bleu plus clair

## Accessibilité

- Contraste minimum WCAG AA respecté
- Ratio de contraste texte/fond : > 4.5:1
- Éléments interactifs clairement identifiables
- Taille de police minimale : 14px sur mobile, 16px sur desktop

## Assets

### Logo
Le logo utilise :
- Icône : Or (`#F4C542`) sur fond Bleu (`#003366`)
- Texte : Bleu foncé (`#003366`)

### Favicon
- Background : Bleu (`#003366`)
- Symbole : Or (`#F4C542`)
