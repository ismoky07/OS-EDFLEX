# 🎓 Edflex Personalised Learning Module - React + Flask

Interface React.js moderne avec backend Flask pour le module d'apprentissage personnalisé.

## 📁 Structure du Projet

```
EDFLEX/
├── frontend/                    # Application React TypeScript
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LearnerProfiler.tsx
│   │   │   ├── PathRecommender.tsx
│   │   │   └── LearningAssistant.tsx
│   │   ├── App.tsx
│   │   └── App.css
│   └── package.json
├── backend/
│   ├── api.py                   # Backend Flask API
│   └── Modules/
│       └── PersonnalisationAndRecommendation/
│           ├── PersonalisedLearning.py    # Définitions des agents
│           ├── Tools/                     # Outils personnalisés
│           │   ├── learner_tools.py
│           │   ├── recommendation_tools.py
│           │   └── assistant_tools.py
│           └── Overview/
│               └── PersonalisedLearning.md
├── requirements.txt             # Dépendances Python
├── .env                         # Variables d'environnement (API keys)
└── README.md
```

## 🚀 Installation

### 1. Backend Python (Flask + Agents)

```bash
# Installer les dépendances Python
pip install -r requirements.txt

# Créer le fichier .env à la racine avec vos clés API
# Le fichier .env existe déjà avec les clés configurées
```

**Contenu du fichier .env:**
```
XAI_API_KEY=your_xai_api_key_here
EXA_API_KEY=your_exa_api_key_here
```

### 2. Frontend React

```bash
cd frontend
npm install
```

## 🎯 Démarrage

### Démarrer le Backend Flask (Terminal 1)

```bash
python backend/api.py
```

Le serveur API démarre sur `http://localhost:5000`

### Démarrer le Frontend React (Terminal 2)

```bash
cd frontend
npm start
```

L'application React s'ouvre sur `http://localhost:3000`

## 🌐 Endpoints API

### 🧠 Learner Profiler
```
POST /api/profiler
Body: {
  "user_id": "U123",
  "action": "analyze_behavior"
}
```

**Actions disponibles:**
- `analyze_behavior` - Analyser le comportement d'apprentissage
- `identify_learning_style` - Identifier le style d'apprentissage
- `detect_skill_gaps` - Détecter les lacunes de compétences
- `calculate_engagement` - Calculer les métriques d'engagement
- `get_full_profile` - Récupérer le profil complet

### 🎯 Path Recommender
```
POST /api/recommender
Body: {
  "user_id": "U123",
  "action": "recommend_content",
  "goal": "Become a Data Analyst" (optionnel)
}
```

**Actions disponibles:**
- `recommend_content` - Recommander du contenu personnalisé
- `build_learning_path` - Construire un parcours d'apprentissage
- `get_next_content` - Obtenir le prochain meilleur contenu
- `check_prerequisites` - Vérifier les prérequis

### 💬 Learning Assistant
```
POST /api/assistant
Body: {
  "user_id": "U123",
  "question": "What is machine learning?"
}
```

### ❤️ Health Check
```
GET /health
```

## 🎨 Fonctionnalités de l'Interface

### Page 1: Learner Profiler 👤
**Formulaire d'analyse:**
- Sélection User ID et action (analyze_behavior, identify_learning_style, detect_skill_gaps, calculate_engagement, get_full_profile)
- Timeout de 2 minutes pour les requêtes longues
- Indicateur de chargement avec message informatif

**Visualisation Option 1 - Cards avec sections colorées:**
- 🎨 **Style d'Apprentissage** (orange): Style dominant avec barres de progression (Visuel, Auditif, Kinesthésique)
- 📈 **Métriques d'Engagement** (vert): Score d'engagement, Taux de complétion avec progress bars animées
- 🎯 **Lacunes de Compétences** (rouge): Badges colorés par priorité (high/medium)
- 🕐 **Habitudes d'Apprentissage** (violet): Heures de pointe, Sessions/semaine, Rythme
- 📊 **Résumé d'Activité**: Stats cards avec icônes

**Caractéristiques visuelles:**
- Barres de progression avec gradients animés
- Cards avec bordures colorées gauche
- Effets hover (élévation + glow)
- Badges avec couleurs gradient
- Design responsive

### Page 2: Path Recommender 🎯
**Formulaire de recommandation:**
- User ID, sélection d'action, objectif optionnel (learning goal)
- Actions: recommend_content, build_learning_path, get_next_content, check_prerequisites

**Visualisation Option 1 - Cards avec sections colorées:**

**Section Profil Utilisateur:**
- ⚙️ **Préférences** (bleu): Format, Durée optimale, Niveau, Langue
- 🎨 **Style d'Apprentissage** (orange): Style dominant + barres de progression
- 🎯 **Lacunes de Compétences** (rouge): Badges high priority / medium priority
- 📈 **Métriques d'Engagement** (vert): Score engagement, Taux complétion
- 🕐 **Habitudes d'Apprentissage** (violet): Heures pointe, Fréquence, Rythme

**Section Recommandations:**
- 📚 **Contenus Recommandés** avec badge de diversité
- Cards de recommandation avec:
  - Badge de rang (#1, #2) avec gradient violet
  - Icône de format (🎥 vidéo, 📄 article, 📚 cours)
  - Badge de difficulté coloré (vert=beginner, orange=intermediate, rouge=advanced)
  - Durée et score de pertinence
  - Tags de compétences avec gradient
  - 💡 Explication avec bordure jaune
  - Barre de prédiction d'engagement (88%, 82%)
  - Badge prérequis (✅ Prêt / ⚠️ Prérequis manquants)

**Section Contexte:**
- 🎯 Objectif principal
- Focus compétence

### Page 3: Learning Assistant 💬
**Interface conversationnelle:**
- Formulaire avec User ID et zone de texte pour questions
- Support pour questions en langage naturel
- Réponses personnalisées contextuelles

**Visualisation Option 1 - Cards avec sections colorées:**

**Card Question:**
- 💭 Affichage de la question avec style italique
- Bordure gauche bleue

**Cards Profil Utilisateur:**
- 👤 **Profil Apprenant** (bleu): Nom, Rôle, Membre depuis, Dernière activité
- 🎯 **Parcours Actuel** (vert): Titre du parcours, Barre de progression (65%), Activité récente
- 📊 **Statistiques** (orange):
  - 🔥 Série en cours (jours)
  - ✅ Cours complétés ce mois
  - ⏰ Heures typiques de session
  - ⚡ Rythme d'apprentissage
- ⚙️ **Préférences** (violet): Format, Langue, Difficulté avec badges
- 💪 **Engagement** (rose): Badge large avec niveau d'engagement

**Card Réponse Assistant:**
- 🤖 Réponse formatée par paragraphes
- Premier paragraphe en surbrillance verte
- Autres paragraphes avec bordure gauche verte
- Espacement confortable

## 🎨 Design

- **Framework**: React TypeScript
- **Routing**: React Router v6
- **HTTP Client**: Axios (avec timeout de 120s)
- **Styling**: CSS personnalisé avec:
  - Gradients linéaires pour cards et badges
  - Progress bars animées avec transitions smooth (1s ease-out)
  - Hover effects (translateY, scale, box-shadow)
  - Bordures colorées gauche pour différencier les cards
  - Palette cohérente: Bleu (#667eea), Vert (#10b981), Orange (#f59e0b), Violet (#8b5cf6), Rose (#ec4899)
- **UI Components**:
  - Cards avec sections colorées (Option 1)
  - Progress bars avec pourcentages
  - Badges avec gradients
  - Icons emoji pour affordance visuelle
  - Grid responsive (auto-fit, minmax)
- **Responsive**: Design adaptatif pour mobile et desktop

## 🛠️ Technologies

### Frontend
- React 18
- TypeScript
- React Router DOM
- Axios
- CSS3 (animations, gradients, backdrop-filter)

### Backend
- Flask 3.0
- Flask-CORS
- Agno (Framework d'agents IA)
- xAI Grok-3
- Python 3.10+

## 📦 Build pour Production

### Frontend
```bash
cd frontend
npm run build
```

Les fichiers de production sont dans `frontend/build/`

### Déploiement
- Backend: Déployer sur Heroku, AWS, Google Cloud, etc.
- Frontend: Déployer sur Vercel, Netlify, AWS S3, etc.

## 🔧 Configuration CORS

Le backend Flask est configuré pour accepter les requêtes depuis le frontend React (port 3000 en développement). Pour la production, modifiez les paramètres CORS dans `backend/api.py`.

## 📝 Notes

- Les agents utilisent des données de démonstration (sample data)
- Pour la production, connectez les outils aux vraies bases de données Edflex
- La clé API xAI doit être configurée dans les variables d'environnement
- Le backend et le frontend doivent être lancés simultanément en développement

## 🤝 Support

Pour toute question ou problème, consultez la documentation dans `Overview/PersonalisedLearning.md`
