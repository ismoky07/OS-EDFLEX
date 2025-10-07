import React from 'react';

interface AssistantResultsProps {
  data: {
    user_id: string;
    question: string;
    result: string;
  };
}

const AssistantResults: React.FC<AssistantResultsProps> = ({ data }) => {
  // Parse user profile and assistant response
  const parseData = (text: string) => {
    try {
      // Extract JSON objects
      const jsonMatches = text.match(/\{[^{}]*\}/g) || [];

      let userProfile: any = null;
      let assistantResponse = text;

      // Find user profile object
      jsonMatches.forEach(match => {
        try {
          const jsonStr = match
            .replace(/'/g, '"')
            .replace(/True/g, 'true')
            .replace(/False/g, 'false')
            .replace(/None/g, 'null');

          const obj = JSON.parse(jsonStr);

          if (obj.user_id && obj.name) {
            userProfile = obj;
            // Remove the profile JSON from response text
            assistantResponse = assistantResponse.replace(match, '');
          }
        } catch (e) {
          // Skip invalid JSON
        }
      });

      // Clean up the response text
      assistantResponse = assistantResponse.trim();

      return { userProfile, assistantResponse };
    } catch (e) {
      return { userProfile: null, assistantResponse: text };
    }
  };

  const parsed = parseData(data.result);

  return (
    <div className="results-container">
      {/* Header */}
      <div className="result-header">
        <div className="header-badge">
          <span className="header-icon">💬</span>
          <span>User: {data.user_id}</span>
        </div>
        <div className="header-badge">
          <span className="header-icon">❓</span>
          <span>Question</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="question-card">
        <div className="question-header">
          <span className="question-icon">💭</span>
          <h3>Votre Question</h3>
        </div>
        <div className="question-text">{data.question}</div>
      </div>

      {/* User Profile Card */}
      {parsed.userProfile && (
        <div className="stats-grid">
          {/* Profile Summary Card */}
          <div className="stat-card" style={{ borderLeftColor: '#667eea' }}>
            <div className="card-header">
              <span className="card-icon">👤</span>
              <h3>Profil Apprenant</h3>
            </div>
            <div className="card-body">
              <div className="profile-info">
                <div className="profile-item">
                  <span className="profile-label">Nom:</span>
                  <span className="profile-value">{parsed.userProfile.name}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Rôle:</span>
                  <span className="profile-value">{parsed.userProfile.job_role}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Membre depuis:</span>
                  <span className="profile-value">
                    {new Date(parsed.userProfile.member_since).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Dernière activité:</span>
                  <span className="profile-value">
                    {new Date(parsed.userProfile.last_active).toLocaleString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Learning Path Card */}
          {parsed.userProfile.current_learning_path && (
            <div className="stat-card" style={{ borderLeftColor: '#10b981' }}>
              <div className="card-header">
                <span className="card-icon">🎯</span>
                <h3>Parcours Actuel</h3>
              </div>
              <div className="card-body">
                <div className="learning-path-info">
                  <h4 className="path-title">{parsed.userProfile.current_learning_path}</h4>
                  <div className="path-progress-bar">
                    <div
                      className="path-progress-fill"
                      style={{
                        width: `${parsed.userProfile.current_path_progress}%`,
                        background: 'linear-gradient(90deg, #10b981, #059669)'
                      }}
                    >
                      <span className="path-progress-text">
                        {parsed.userProfile.current_path_progress}%
                      </span>
                    </div>
                  </div>
                  {parsed.userProfile.recent_activity && (
                    <div className="recent-activity">
                      <span className="activity-icon">📚</span>
                      <span className="activity-text">{parsed.userProfile.recent_activity}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Stats Card */}
          <div className="stat-card" style={{ borderLeftColor: '#f59e0b' }}>
            <div className="card-header">
              <span className="card-icon">📊</span>
              <h3>Statistiques</h3>
            </div>
            <div className="card-body">
              <div className="stats-items">
                <div className="stats-item-inline">
                  <span className="stats-icon">🔥</span>
                  <div className="stats-content">
                    <div className="stats-value">{parsed.userProfile.current_streak_days} jours</div>
                    <div className="stats-label">Série en cours</div>
                  </div>
                </div>
                <div className="stats-item-inline">
                  <span className="stats-icon">✅</span>
                  <div className="stats-content">
                    <div className="stats-value">{parsed.userProfile.courses_completed_this_month}</div>
                    <div className="stats-label">Cours ce mois</div>
                  </div>
                </div>
                <div className="stats-item-inline">
                  <span className="stats-icon">⏰</span>
                  <div className="stats-content">
                    <div className="stats-value">{parsed.userProfile.typical_session_time}</div>
                    <div className="stats-label">Heures typiques</div>
                  </div>
                </div>
                <div className="stats-item-inline">
                  <span className="stats-icon">⚡</span>
                  <div className="stats-content">
                    <div className="stats-value">{parsed.userProfile.learning_pace}</div>
                    <div className="stats-label">Rythme</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Card */}
          {parsed.userProfile.preferences && (
            <div className="stat-card" style={{ borderLeftColor: '#8b5cf6' }}>
              <div className="card-header">
                <span className="card-icon">⚙️</span>
                <h3>Préférences</h3>
              </div>
              <div className="card-body">
                <div className="preferences-grid">
                  <div className="pref-badge">
                    <span className="pref-badge-icon">🎥</span>
                    <div className="pref-badge-content">
                      <div className="pref-badge-label">Format</div>
                      <div className="pref-badge-value">{parsed.userProfile.preferences.format}</div>
                    </div>
                  </div>
                  <div className="pref-badge">
                    <span className="pref-badge-icon">🌍</span>
                    <div className="pref-badge-content">
                      <div className="pref-badge-label">Langue</div>
                      <div className="pref-badge-value">{parsed.userProfile.preferences.language}</div>
                    </div>
                  </div>
                  <div className="pref-badge">
                    <span className="pref-badge-icon">📊</span>
                    <div className="pref-badge-content">
                      <div className="pref-badge-label">Difficulté</div>
                      <div className="pref-badge-value">{parsed.userProfile.preferences.difficulty}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Engagement Level Card */}
          {parsed.userProfile.engagement_level && (
            <div className="stat-card" style={{ borderLeftColor: '#ec4899' }}>
              <div className="card-header">
                <span className="card-icon">💪</span>
                <h3>Engagement</h3>
              </div>
              <div className="card-body">
                <div className="engagement-display">
                  <div className="engagement-badge-large">
                    <span className="engagement-emoji">🎯</span>
                    <span className="engagement-level">{parsed.userProfile.engagement_level}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Assistant Response Card */}
      <div className="assistant-response-card">
        <div className="response-header">
          <span className="response-icon">🤖</span>
          <h3>Réponse de l'Assistant</h3>
        </div>
        <div className="response-content">
          {parsed.assistantResponse.split('\n').map((paragraph, idx) => (
            paragraph.trim() && (
              <p key={idx} className="response-paragraph">{paragraph}</p>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssistantResults;
