from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
from dotenv import load_dotenv

# Load environment variables from parent directory
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

# Add Modules/PersonnalisationAndRecommendation to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'Modules', 'PersonnalisationAndRecommendation'))

from Modules.PersonnalisationAndRecommendation.PersonalisedLearning import (
    create_learner_profiler_agent,
    create_path_recommender_agent,
    create_learning_assistant_agent
)

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize agents
print("Initializing agents...")
learner_profiler = create_learner_profiler_agent()
path_recommender = create_path_recommender_agent()
learning_assistant = create_learning_assistant_agent()
print("[OK] All agents initialized successfully!")


def clean_agent_response(text):
    """
    Clean agent response by removing Python dictionary representations
    and keeping only human-readable formatted text
    """
    if not isinstance(text, str):
        return str(text)

    # For now, just return raw text to see what we're getting
    return text


@app.route('/api/profiler', methods=['POST'])
def profiler():
    """
    Endpoint for Learner Profiler agent
    """
    try:
        data = request.json
        user_id = data.get('user_id')
        action = data.get('action', 'analyze_behavior')

        if not user_id:
            return jsonify({'error': 'user_id is required'}), 400

        # Build prompt based on action
        if action == 'analyze_behavior':
            prompt = f"Analyser le comportement d'apprentissage pour user_id: {user_id}"
        elif action == 'identify_learning_style':
            prompt = f"Identifier le style d'apprentissage pour user_id: {user_id}"
        elif action == 'detect_skill_gaps':
            prompt = f"Détecter les lacunes de compétences pour user_id: {user_id}"
        elif action == 'calculate_engagement':
            prompt = f"Calculer les métriques d'engagement pour user_id: {user_id}"
        elif action == 'get_full_profile':
            prompt = f"Récupérer le profil complet pour user_id: {user_id}"
        else:
            prompt = f"Analyser le profil pour user_id: {user_id}"

        # Run agent
        response = learner_profiler.run(prompt)

        # Extract and clean content
        result = response.content if hasattr(response, 'content') else str(response)

        # Debug logging
        print(f"\n[DEBUG] Raw response length: {len(result)}")
        print(f"[DEBUG] First 500 chars: {result[:500]}")

        result_cleaned = clean_agent_response(result)

        print(f"[DEBUG] Cleaned response length: {len(result_cleaned)}")
        print(f"[DEBUG] First 500 chars cleaned: {result_cleaned[:500]}\n")

        return jsonify({
            'success': True,
            'user_id': user_id,
            'action': action,
            'result': result_cleaned
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/recommender', methods=['POST'])
def recommender():
    """
    Endpoint for Path Recommender agent
    """
    try:
        data = request.json
        user_id = data.get('user_id')
        action = data.get('action', 'recommend_content')
        goal = data.get('goal', '')

        if not user_id:
            return jsonify({'error': 'user_id is required'}), 400

        # Build prompt based on action
        if action == 'recommend_content':
            prompt = f"Recommander du contenu personnalisé pour user_id: {user_id}"
        elif action == 'build_learning_path':
            if goal:
                prompt = f"Construire un parcours d'apprentissage pour user_id: {user_id} avec l'objectif: {goal}"
            else:
                prompt = f"Construire un parcours d'apprentissage pour user_id: {user_id}"
        elif action == 'get_next_content':
            prompt = f"Recommander le prochain meilleur contenu pour user_id: {user_id}"
        elif action == 'check_prerequisites':
            prompt = f"Vérifier les prérequis pour user_id: {user_id}"
        else:
            prompt = f"Recommander du contenu pour user_id: {user_id}"

        # Run agent
        response = path_recommender.run(prompt)

        # Extract and clean content
        result = response.content if hasattr(response, 'content') else str(response)
        result = clean_agent_response(result)

        return jsonify({
            'success': True,
            'user_id': user_id,
            'action': action,
            'result': result
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/assistant', methods=['POST'])
def assistant():
    """
    Endpoint for Learning Assistant agent
    """
    try:
        data = request.json
        user_id = data.get('user_id')
        question = data.get('question')

        if not user_id:
            return jsonify({'error': 'user_id is required'}), 400

        if not question:
            return jsonify({'error': 'question is required'}), 400

        # Build prompt
        prompt = f"User {user_id} demande: {question}"

        # Run agent
        response = learning_assistant.run(prompt)

        # Extract and clean content
        result = response.content if hasattr(response, 'content') else str(response)
        result = clean_agent_response(result)

        return jsonify({
            'success': True,
            'user_id': user_id,
            'question': question,
            'result': result
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    """
    Health check endpoint
    """
    return jsonify({
        'status': 'healthy',
        'agents': {
            'learner_profiler': 'active',
            'path_recommender': 'active',
            'learning_assistant': 'active'
        }
    })


if __name__ == '__main__':
    print("\n" + "="*50)
    print("Edflex Personalised Learning API")
    print("="*50)
    print("Server running on http://localhost:5000")
    print("Learner Profiler: /api/profiler")
    print("Path Recommender: /api/recommender")
    print("Learning Assistant: /api/assistant")
    print("Health Check: /health")
    print("="*50 + "\n")

    app.run(debug=True, host='0.0.0.0', port=5000)
