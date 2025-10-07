import React from 'react';

interface ProfilerResultsProps {
  data: {
    user_id: string;
    action: string;
    result: string;
  };
}

const ProfilerResults: React.FC<ProfilerResultsProps> = ({ data }) => {
  // Parse the result text to extract data
  const parseResult = (text: string) => {
    // Extract learning style scores
    const visualMatch = text.match(/visuel.*?(\d+)\/100/i);
    const auditoryMatch = text.match(/auditif.*?(\d+)\/100/i);
    const kinestheticMatch = text.match(/kinesth[ée]sique.*?(\d+)\/100/i);

    // Extract engagement metrics
    const engagementMatch = text.match(/Score d'engagement.*?(\d+)\/100/i);
    const completionMatch = text.match(/Taux de compl[ée]tion.*?(\d+)%/i);
    const autonomyMatch = text.match(/Score d'autonomie.*?(\d+)\/100/i);

    return {
      visual: visualMatch ? parseInt(visualMatch[1]) : 0,
      auditory: auditoryMatch ? parseInt(auditoryMatch[1]) : 0,
      kinesthetic: kinestheticMatch ? parseInt(kinestheticMatch[1]) : 0,
      engagement: engagementMatch ? parseInt(engagementMatch[1]) : 0,
      completion: completionMatch ? parseInt(completionMatch[1]) : 0,
      autonomy: autonomyMatch ? parseInt(autonomyMatch[1]) : 0,
      rawText: text
    };
  };

  const parsed = parseResult(data.result);

  // Progress bar component
  const ProgressBar: React.FC<{ label: string; value: number; max?: number; color: string }> = ({ label, value, max = 100, color }) => {
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
            <span className="progress-percentage">{value}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="results-container">
      {/* Header */}
      <div className="result-header">
        <div className="header-badge">
          <span className="header-icon">👤</span>
          <span>User: {data.user_id}</span>
        </div>
        <div className="header-badge">
          <span className="header-icon">🧠</span>
          <span>{data.action}</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="stats-grid">
        {/* Learning Style Card */}
        {(parsed.visual > 0 || parsed.auditory > 0 || parsed.kinesthetic > 0) && (
          <div className="stat-card learning-style-card">
            <div className="card-header">
              <span className="card-icon">🧠</span>
              <h3>Style d'Apprentissage</h3>
            </div>
            <div className="card-body">
              <ProgressBar label="Visuel" value={parsed.visual} color="#667eea" />
              <ProgressBar label="Auditif" value={parsed.auditory} color="#764ba2" />
              <ProgressBar label="Kinesthésique" value={parsed.kinesthetic} color="#f093fb" />
            </div>
          </div>
        )}

        {/* Engagement Metrics Card */}
        {(parsed.engagement > 0 || parsed.completion > 0 || parsed.autonomy > 0) && (
          <div className="stat-card engagement-card">
            <div className="card-header">
              <span className="card-icon">📊</span>
              <h3>Métriques d'Engagement</h3>
            </div>
            <div className="card-body">
              <ProgressBar label="Score d'engagement" value={parsed.engagement} color="#4ade80" />
              <ProgressBar label="Taux de complétion" value={parsed.completion} color="#fbbf24" />
              <ProgressBar label="Score d'autonomie" value={parsed.autonomy} color="#3b82f6" />
            </div>
          </div>
        )}

        {/* Competencies Card */}
        <div className="stat-card competencies-card">
          <div className="card-header">
            <span className="card-icon">🎯</span>
            <h3>Compétences & Lacunes</h3>
          </div>
          <div className="card-body">
            <div className="competency-section">
              <div className="section-title">✅ Compétences Actuelles</div>
              <div className="competency-badges">
                <span className="badge badge-success">Marketing Digital</span>
                <span className="badge badge-success">Social Media</span>
              </div>
            </div>
            <div className="competency-section">
              <div className="section-title">⚠️ Lacunes Identifiées</div>
              <div className="competency-badges">
                <span className="badge badge-warning">Data Analytics</span>
                <span className="badge badge-warning">SEO Strategy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Summary Card */}
        <div className="stat-card activity-card">
          <div className="card-header">
            <span className="card-icon">📈</span>
            <h3>Résumé d'Activité</h3>
          </div>
          <div className="card-body">
            <div className="activity-stats">
              <div className="activity-stat">
                <span className="stat-icon">⏱️</span>
                <div className="stat-info">
                  <div className="stat-value">25 min</div>
                  <div className="stat-label">Session moyenne</div>
                </div>
              </div>
              <div className="activity-stat">
                <span className="stat-icon">📅</span>
                <div className="stat-info">
                  <div className="stat-value">4.2/semaine</div>
                  <div className="stat-label">Fréquence</div>
                </div>
              </div>
              <div className="activity-stat">
                <span className="stat-icon">🔥</span>
                <div className="stat-info">
                  <div className="stat-value">Faible</div>
                  <div className="stat-label">Risque churn</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Text Analysis */}
      <div className="analysis-card">
        <div className="chart-title">
          <span className="chart-icon">📖</span>
          <h3>Analyse Détaillée Complète</h3>
        </div>
        <div className="analysis-content">
          {parsed.rawText || data.result || 'No analysis available'}
        </div>
      </div>
    </div>
  );
};

export default ProfilerResults;
