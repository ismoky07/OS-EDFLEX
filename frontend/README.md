# 🎓 Edflex Personalised Learning - React Frontend

Interface React TypeScript moderne pour le module d'apprentissage personnalisé Edflex.

## 📋 Vue d'ensemble

Application React avec 3 pages dédiées pour interagir avec les agents IA d'apprentissage personnalisé :
- **Learner Profiler** : Analyse du comportement et profil apprenant
- **Path Recommender** : Recommandations de contenu personnalisées
- **Learning Assistant** : Assistant conversationnel intelligent

## 🎨 Visualisation Option 1 - Cards avec Sections Colorées

### Caractéristiques Visuelles

- **Progress Bars Animées** : Transitions smooth 1s ease-out avec gradients
- **Cards Colorées** : Bordure gauche colorée pour différenciation visuelle
- **Badges Gradient** : Badges avec dégradés linéaires pour les priorités
- **Hover Effects** : Élévation, glow, et transformations au survol
- **Grid Responsive** : Auto-fit avec minmax pour adaptation mobile/desktop
- **Icons Emoji** : Affordance visuelle avec emojis au lieu d'icon libraries

### Palette de Couleurs

- 🔵 **Bleu** (#667eea) : Profils, préférences
- 🟢 **Vert** (#10b981) : Engagement, parcours, réponses assistant
- 🟠 **Orange** (#f59e0b) : Style apprentissage, statistiques
- 🟣 **Violet** (#8b5cf6) : Habitudes, préférences avancées
- 🔴 **Rouge** (#ef4444) : Lacunes de compétences
- 🌸 **Rose** (#ec4899) : Engagement level

## 📁 Structure du Projet

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ProfilerResults.tsx      # Visualisation profil apprenant
│   │   ├── RecommenderResults.tsx   # Visualisation recommandations
│   │   └── AssistantResults.tsx     # Visualisation réponses assistant
│   ├── pages/
│   │   ├── LearnerProfiler.tsx      # Page 1: Profiler
│   │   ├── PathRecommender.tsx      # Page 2: Recommender
│   │   └── LearningAssistant.tsx    # Page 3: Assistant
│   ├── App.tsx                       # Router et navigation
│   ├── App.css                       # Styles globaux (1400+ lignes)
│   ├── index.tsx                     # Entry point
│   └── react-app-env.d.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Installation

```bash
npm install
```

### Dépendances Principales

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2",
    "typescript": "^4.9.5"
  }
}
```

## 🎯 Démarrage

### Mode Développement

```bash
npm start
```

Ouvre [http://localhost:3000](http://localhost:3000) dans le navigateur.

**Important** : Le backend Flask doit être lancé sur `http://localhost:5000` avant de démarrer le frontend.

### Build Production

```bash
npm run build
```

Génère les fichiers optimisés dans `build/` prêts pour déploiement.

### Tester le Build

```bash
npm install -g serve
serve -s build
```

## 🌐 Configuration API

L'application se connecte au backend Flask via Axios avec :
- **Base URL** : `http://localhost:5000`
- **Timeout** : 120000ms (2 minutes) pour les requêtes longues
- **Content-Type** : `application/json`

### Endpoints Utilisés

```typescript
// Learner Profiler
POST http://localhost:5000/api/profiler
Body: { user_id: string, action: string }

// Path Recommender
POST http://localhost:5000/api/recommender
Body: { user_id: string, action: string, goal?: string }

// Learning Assistant
POST http://localhost:5000/api/assistant
Body: { user_id: string, question: string }
```

## 📊 Composants de Visualisation

### ProfilerResults.tsx

**Fonctionnalités** :
- Parse les réponses texte et JSON des agents
- Extrait métriques avec regex (`Visual: 85/100`)
- Génère progress bars animées
- Affiche badges de compétences colorés

**Cards affichées** :
- 🎨 Style d'Apprentissage (dominant + scores)
- 📈 Métriques d'Engagement (score, complétion, autonomie)
- 🎯 Compétences (actuelles + lacunes)
- 📊 Résumé d'Activité (session, fréquence, churn)
- 📖 Analyse Détaillée Complète (texte formaté)

### RecommenderResults.tsx

**Fonctionnalités** :
- Parse Python dicts et convertit en JSON
- Identifie profil utilisateur, recommandations, contexte
- Calcule scores de pertinence
- Affiche prédictions d'engagement

**Sections** :
1. **Profil Utilisateur** (5 cards) :
   - ⚙️ Préférences (format, durée, niveau, langue)
   - 🎨 Style d'Apprentissage (dominant + progress bars)
   - 🎯 Lacunes de Compétences (badges priorité)
   - 📈 Métriques d'Engagement (progress bars)
   - 🕐 Habitudes d'Apprentissage (heures, fréquence, rythme)

2. **Recommandations** :
   - Badge de rang (#1, #2) avec gradient
   - Icône de format (🎥 📄 📚)
   - Badge difficulté coloré (vert/orange/rouge)
   - Tags de compétences
   - 💡 Explication contextuelle
   - Barre prédiction engagement
   - Badge prérequis (✅/⚠️)

3. **Contexte** :
   - 🎯 Objectif principal
   - Focus compétence

### AssistantResults.tsx

**Fonctionnalités** :
- Extrait profil utilisateur du JSON
- Parse réponse en langage naturel
- Formate paragraphes avec styles différenciés
- Affiche progression parcours actuel

**Cards** :
- 💭 Question (italique, bordure bleue)
- 👤 Profil Apprenant (nom, rôle, dates)
- 🎯 Parcours Actuel (titre + barre progression 65%)
- 📊 Statistiques (série, cours, heures, rythme)
- ⚙️ Préférences (format, langue, difficulté)
- 💪 Engagement (badge large gradient)
- 🤖 Réponse Assistant (paragraphes formatés)

## 🎨 Styles CSS (App.css)

### Organisation (1400+ lignes)

```css
/* Global Styles */
body, html { ... }

/* Navigation */
.main-nav { ... }
.nav-link { ... }

/* Forms */
.form-group { ... }
.form-input { ... }
.form-select { ... }

/* Cards & Progress Bars */
.stat-card { ... }
.progress-bar-container { ... }
.progress-bar-fill { ... }

/* Recommendations */
.recommendation-card { ... }
.rec-rank { ... }
.skill-tag { ... }

/* Assistant Results */
.question-card { ... }
.assistant-response-card { ... }
.response-paragraph { ... }

/* Responsive */
@media (max-width: 768px) { ... }
```

### Techniques CSS Utilisées

- **Gradients** : `linear-gradient(135deg, color1, color2)`
- **Animations** : `transition: width 1s ease-out`
- **Box Shadows** : Multi-layered shadows pour depth
- **Backdrop Filter** : Glassmorphism effects
- **CSS Grid** : `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- **Flexbox** : Layouts responsives
- **Transform** : `translateY(-4px)`, `scale(1.05)` au hover

## 🔧 Configuration TypeScript

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "strict": true,
    "jsx": "react-jsx"
  }
}
```

## 🐛 Résolution de Problèmes

### TypeScript Errors avec react-icons

**Problème** : `TS2786: 'FaUser' cannot be used as a JSX component`

**Solution** : Remplacé toutes les icons par des emojis
```typescript
// Avant
import { FaUser } from 'react-icons/fa';
<FaUser />

// Après
<span>👤</span>
```

### Timeout des Requêtes API

**Problème** : Requêtes interrompues après 30 secondes

**Solution** : Timeout Axios augmenté à 120s
```typescript
axios.post(url, data, { timeout: 120000 })
```

### Sections Vides (Détails Complets)

**Problème** : `clean_agent_response()` trop agressif

**Solution** : Fonction désactivée dans backend pour garder le contenu brut
```python
def clean_agent_response(text):
    return text  # Return raw response
```

## 📱 Responsive Design

### Breakpoints

- **Mobile** : < 768px
  - Single column layouts
  - Stacked navigation
  - Reduced padding

- **Tablet** : 768px - 1024px
  - 2-column grids
  - Compact cards

- **Desktop** : > 1024px
  - 3-4 column grids
  - Full feature display

### Grid Adaptation

```css
.stats-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
```

## 🚀 Déploiement

### Vercel

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
# Drag & drop build/ folder to Netlify
```

### AWS S3 + CloudFront

```bash
npm run build
aws s3 sync build/ s3://your-bucket-name
```

## 📝 Scripts Disponibles

- `npm start` : Lance dev server (port 3000)
- `npm run build` : Build production optimisé
- `npm test` : Lance les tests Jest
- `npm run eject` : Ejecte Create React App config (irréversible!)

## 🔐 Variables d'Environnement

Créer `.env` à la racine de frontend/ :

```env
REACT_APP_API_URL=http://localhost:5000
```

Usage :
```typescript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

## 🤝 Contribution

Pour contribuer au frontend :
1. Fork le repo
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📚 Documentation

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

## 🎓 En savoir plus

Pour comprendre l'architecture complète du module, consultez :
- `backend/Modules/PersonnalisationAndRecommendation/Overview/PersonalisedLearning.md`
- `README.md` à la racine du projet

---

**Développé avec** ❤️ **pour Edflex**
