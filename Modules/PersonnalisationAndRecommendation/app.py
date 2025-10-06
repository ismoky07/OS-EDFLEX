"""
Edflex AI Agents - Interface Simple
"""

import streamlit as st
import sys
import os
import json
import re

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from PersonalisedLearning import (
    create_learner_profiler_agent,
    create_path_recommender_agent,
    create_learning_assistant_agent
)

# Configuration
st.set_page_config(page_title="Edflex AI", page_icon="🎓", layout="wide")

# Initialisation
if 'agents_ready' not in st.session_state:
    st.session_state.agents_ready = False

# Titre
st.title("🎓 Edflex - Module d'Apprentissage Personnalisé")

# Sidebar - Initialisation
with st.sidebar:
    st.header("⚙️ Configuration")

    if st.button("🚀 Démarrer les Agents"):
        with st.spinner("Chargement..."):
            try:
                st.session_state.profiler = create_learner_profiler_agent()
                st.session_state.recommender = create_path_recommender_agent()
                st.session_state.assistant = create_learning_assistant_agent()
                st.session_state.agents_ready = True
                st.success("✅ Agents prêts!")
            except Exception as e:
                st.error(f"Erreur: {e}")

    if st.session_state.agents_ready:
        st.info("✅ Agents actifs")
    else:
        st.warning("⚠️ Agents non initialisés")

# Tabs
tab1, tab2, tab3 = st.tabs(["🔍 Profiler", "🎯 Recommandations", "💬 Assistant"])

# TAB 1: Profiler
with tab1:
    st.header("🔍 Learner Profiler")

    user_id = st.text_input("User ID", "User123")
    action = st.text_area("Que voulez-vous faire?",
                          "Exemple: Analyser le profil de User123")

    if st.button("Exécuter"):
        if st.session_state.agents_ready:
            with st.spinner("Traitement..."):
                try:
                    response = st.session_state.profiler.run(action)
                    st.success("✅ Résultat:")
                    result = response.content if hasattr(response, 'content') else str(response)

                    # Afficher en texte brut SANS parsing JSON
                    st.text_area("Réponse de l'agent:", value=str(result), height=400, disabled=True)
                except Exception as e:
                    st.error(f"Erreur: {e}")
        else:
            st.warning("Initialisez les agents d'abord")

# TAB 2: Recommandations
with tab2:
    st.header("🎯 Path Recommender")

    user_id_rec = st.text_input("User ID", "User123", key="rec_user")
    question = st.text_area("Demande",
                           "Exemple: Donne-moi 5 recommandations de contenu")

    if st.button("Obtenir des recommandations"):
        if st.session_state.agents_ready:
            with st.spinner("Génération..."):
                try:
                    response = st.session_state.recommender.run(question)
                    st.success("✅ Recommandations:")
                    result = response.content if hasattr(response, 'content') else str(response)

                    # Afficher en texte brut SANS parsing JSON
                    st.text_area("Réponse de l'agent:", value=str(result), height=400, disabled=True)
                except Exception as e:
                    st.error(f"Erreur: {e}")
        else:
            st.warning("Initialisez les agents d'abord")

# TAB 3: Assistant
with tab3:
    st.header("💬 Learning Assistant")

    if 'messages' not in st.session_state:
        st.session_state.messages = []

    # Afficher l'historique
    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.write(msg["content"])

    # Input utilisateur
    if prompt := st.chat_input("Posez votre question..."):
        if st.session_state.agents_ready:
            # Ajouter message utilisateur
            st.session_state.messages.append({"role": "user", "content": prompt})
            with st.chat_message("user"):
                st.write(prompt)

            # Réponse assistant
            with st.chat_message("assistant"):
                with st.spinner("Réflexion..."):
                    try:
                        response = st.session_state.assistant.run(prompt)
                        answer = response.content if hasattr(response, 'content') else str(response)
                        st.write(answer)
                        st.session_state.messages.append({"role": "assistant", "content": answer})
                    except Exception as e:
                        st.error(f"Erreur: {e}")
        else:
            st.warning("Initialisez les agents d'abord")

    # Bouton clear
    if st.button("🗑️ Effacer l'historique"):
        st.session_state.messages = []
        st.rerun()
