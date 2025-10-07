import React from 'react';

interface RecommenderResultsProps {
  data: {
    user_id: string;
    action: string;
    result: string;
  };
}

const RecommenderResults: React.FC<RecommenderResultsProps> = ({ data }) => {
  // Parse JSON and Python dict data from the response
  const parseData = (text: string) => {
    try {
      // Extract all JSON objects and Python dicts
      const jsonMatches = text.match(/\{[^{}]*\}/g) || [];
      // eslint-disable-next-line no-useless-escape
      const arrayMatches = text.match(/\[[^\[\]]*\]/g) || [];

      let userProfile: any = null;
      let recommendations: any[] = [];
      let finalRecommendation: any = null;

      // Parse each match
      [...jsonMatches, ...arrayMatches].forEach(match => {
        try {
          // Convert Python dict syntax to JSON
          const jsonStr = match
            .replace(/'/g, '"')
            .replace(/True/g, 'true')
            .replace(/False/g, 'false')
            .replace(/None/g, 'null');

          const obj = JSON.parse(jsonStr);

          // Identify what type of object this is
          if (obj.user_id && obj.content_preferences) {
            userProfile = obj;
          } else if (obj.content_id && obj.title) {
            recommendations.push(obj);
          } else if (obj.recommendations && Array.isArray(obj.recommendations)) {
            finalRecommendation = obj;
          }
        } catch (e) {
          // Skip invalid JSON
        }
      });

      // If we found a final recommendation object with nested recommendations, use those
      if (finalRecommendation && finalRecommendation.recommendations) {
        recommendations = finalRecommendation.recommendations;
      }

      return { userProfile, recommendations, finalRecommendation };
    } catch (e) {
      return { userProfile: null, recommendations: [], finalRecommendation: null };
    }
  };

  const parsed = parseData(data.result);

  // Progress bar component
  const ProgressBar: React.FC<{ label: string; value: number; max?: number; color: string }> =
    ({ label, value, max = 100, color }) => {
      const percentage = (value / max) * 100;
      return (
        <div className="progress-item">
          <div className="progress-header">
            <span className="progress-label">{label}</span>
            <span className="progress-value">{value}/{max}</span>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{
                width: `${percentage}%`,
                background: `linear-gradient(90deg, ${color}, ${color}dd)`
              }}
            >
              <span className="progress-percentage">{Math.round(percentage)}%</span>
            </div>
          </div>
        </div>
      );
    };

  const getFormatIcon = (format: string) => {
    if (format?.toLowerCase().includes('video')) return '🎥';
    if (format?.toLowerCase().includes('article')) return '📄';
    if (format?.toLowerCase().includes('course')) return '📚';
    return '📖';
  };

  const getDifficultyColor = (difficulty: string) => {
    const diff = difficulty?.toLowerCase() || '';
    if (diff.includes('beginner')) return '#4ade80';
    if (diff.includes('intermediate')) return '#fbbf24';
    if (diff.includes('advanced')) return '#f87171';
    return '#667eea';
  };

  return (
    <div className="results-container">
      {/* Header */}
      <div className="result-header">
        <div className="header-badge">
          <span className="header-icon">🎯</span>
          <span>User: {data.user_id}</span>
        </div>
        <div className="header-badge">
          <span className="header-icon">⭐</span>
          <span>{data.action}</span>
        </div>
      </div>

      {/* User Profile Summary Cards */}
      {parsed.userProfile && (
        <div className="stats-grid">
          {/* Content Preferences Card */}
          <div className="stat-card" style={{ borderLeftColor: '#667eea' }}>
            <div className="card-header">
              <span className="card-icon">⚙️</span>
              <h3>Préférences</h3>
            </div>
            <div className="card-body">
              <div className="preference-item">
                <span className="pref-icon">🎥</span>
                <div className="pref-content">
                  <div className="pref-label">Format préféré</div>
                  <div className="pref-value">{parsed.userProfile.content_preferences?.preferred_format}</div>
                </div>
              </div>
              <div className="preference-item">
                <span className="pref-icon">⏱️</span>
                <div className="pref-content">
                  <div className="pref-label">Durée optimale</div>
                  <div className="pref-value">{parsed.userProfile.content_preferences?.optimal_duration_minutes} min</div>
                </div>
              </div>
              <div className="preference-item">
                <span className="pref-icon">📊</span>
                <div className="pref-content">
                  <div className="pref-label">Niveau</div>
                  <div className="pref-value">{parsed.userProfile.content_preferences?.preferred_difficulty}</div>
                </div>
              </div>
              <div className="preference-item">
                <span className="pref-icon">🌍</span>
                <div className="pref-content">
                  <div className="pref-label">Langue</div>
                  <div className="pref-value">{parsed.userProfile.content_preferences?.preferred_language}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Style Card */}
          {parsed.userProfile.learning_style && (
            <div className="stat-card" style={{ borderLeftColor: '#f59e0b' }}>
              <div className="card-header">
                <span className="card-icon">🎨</span>
                <h3>Style d'Apprentissage</h3>
              </div>
              <div className="card-body">
                <div className="dominant-style">
                  <span className="dominant-label">Style dominant:</span>
                  <span className="dominant-value">{parsed.userProfile.learning_style.dominant_style}</span>
                </div>
                <div className="progress-bars">
                  {parsed.userProfile.learning_style.scores?.visual && (
                    <ProgressBar label="Visuel" value={parsed.userProfile.learning_style.scores.visual} color="#667eea" />
                  )}
                  {parsed.userProfile.learning_style.scores?.auditory && (
                    <ProgressBar label="Auditif" value={parsed.userProfile.learning_style.scores.auditory} color="#f59e0b" />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Skill Gaps Card */}
          {parsed.userProfile.skill_gaps && parsed.userProfile.skill_gaps.length > 0 && (
            <div className="stat-card" style={{ borderLeftColor: '#ef4444' }}>
              <div className="card-header">
                <span className="card-icon">🎯</span>
                <h3>Lacunes de Compétences</h3>
              </div>
              <div className="card-body">
                <div className="badges-container">
                  {parsed.userProfile.skill_gaps.map((gap: any, idx: number) => (
                    <div
                      key={idx}
                      className={`badge ${gap.priority === 'high' ? 'badge-warning' : 'badge-info'}`}
                    >
                      <span className="badge-text">{gap.skill}</span>
                      <span className="badge-priority">{gap.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Engagement Metrics Card */}
          {parsed.userProfile.engagement_metrics && (
            <div className="stat-card" style={{ borderLeftColor: '#10b981' }}>
              <div className="card-header">
                <span className="card-icon">📈</span>
                <h3>Métriques d'Engagement</h3>
              </div>
              <div className="card-body">
                <div className="progress-bars">
                  {parsed.userProfile.engagement_metrics.engagement_score && (
                    <ProgressBar
                      label="Score d'engagement"
                      value={parsed.userProfile.engagement_metrics.engagement_score}
                      color="#10b981"
                    />
                  )}
                  {parsed.userProfile.engagement_metrics.completion_rate_percent && (
                    <ProgressBar
                      label="Taux de complétion"
                      value={parsed.userProfile.engagement_metrics.completion_rate_percent}
                      color="#667eea"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Behavioral Patterns Card */}
          {parsed.userProfile.behavioral_patterns && (
            <div className="stat-card" style={{ borderLeftColor: '#8b5cf6' }}>
              <div className="card-header">
                <span className="card-icon">🕐</span>
                <h3>Habitudes d'Apprentissage</h3>
              </div>
              <div className="card-body">
                <div className="behavior-stats">
                  <div className="behavior-item">
                    <span className="behavior-icon">⏰</span>
                    <div className="behavior-content">
                      <div className="behavior-label">Heures de pointe</div>
                      <div className="behavior-value">
                        {parsed.userProfile.behavioral_patterns.peak_learning_hours?.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="behavior-item">
                    <span className="behavior-icon">📅</span>
                    <div className="behavior-content">
                      <div className="behavior-label">Sessions/semaine</div>
                      <div className="behavior-value">
                        {parsed.userProfile.behavioral_patterns.sessions_per_week}
                      </div>
                    </div>
                  </div>
                  <div className="behavior-item">
                    <span className="behavior-icon">⚡</span>
                    <div className="behavior-content">
                      <div className="behavior-label">Rythme</div>
                      <div className="behavior-value">
                        {parsed.userProfile.behavioral_patterns.learning_pace}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recommendations Section */}
      {parsed.recommendations && parsed.recommendations.length > 0 && (
        <>
          <div className="section-header">
            <h2>📚 Contenus Recommandés</h2>
            {parsed.finalRecommendation?.diversity_score && (
              <span className="diversity-badge">
                Diversité: {parsed.finalRecommendation.diversity_score}/100
              </span>
            )}
          </div>

          <div className="recommendations-grid">
            {parsed.recommendations.map((rec: any, index: number) => (
              <div key={index} className="recommendation-card">
                <div className="rec-rank">
                  <span className="rank-badge">#{rec.rank || index + 1}</span>
                  <span className="format-icon">{getFormatIcon(rec.format)}</span>
                </div>

                <h3 className="rec-title">{rec.title}</h3>

                <div className="rec-meta">
                  <div
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(rec.difficulty) }}
                  >
                    {rec.difficulty}
                  </div>
                  <span className="rec-duration">⏱️ {rec.duration_minutes} min</span>
                  <span className="rec-score">⭐ {rec.relevance_score}/100</span>
                </div>

                {rec.skills_covered && rec.skills_covered.length > 0 && (
                  <div className="rec-skills">
                    <div className="skills-label">🎯 Compétences:</div>
                    <div className="skills-list">
                      {rec.skills_covered.map((skill: string, idx: number) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {rec.explanation && (
                  <div className="rec-explanation">
                    <div className="explanation-icon">💡</div>
                    <div className="explanation-text">{rec.explanation}</div>
                  </div>
                )}

                <div className="rec-footer">
                  <span className="rec-reason">{rec.recommendation_reason?.replace(/_/g, ' ')}</span>
                  {rec.prerequisites_met !== undefined && (
                    <span className={`prereq-badge ${rec.prerequisites_met ? 'prereq-met' : 'prereq-missing'}`}>
                      {rec.prerequisites_met ? '✅ Prêt' : '⚠️ Prérequis'}
                    </span>
                  )}
                </div>

                {rec.engagement_prediction && (
                  <div className="engagement-prediction">
                    <div className="prediction-label">Prédiction d'engagement</div>
                    <ProgressBar
                      label=""
                      value={Math.round(rec.engagement_prediction * 100)}
                      color="#10b981"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Context Information */}
      {parsed.finalRecommendation?.context && (
        <div className="context-card">
          <div className="context-header">
            <span className="context-icon">🎯</span>
            <h3>Contexte de Recommandation</h3>
          </div>
          <div className="context-body">
            <div className="context-item">
              <strong>Objectif principal:</strong> {parsed.finalRecommendation.context.primary_goal}
            </div>
            <div className="context-item">
              <strong>Focus compétence:</strong> {parsed.finalRecommendation.context.skill_focus}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommenderResults;
