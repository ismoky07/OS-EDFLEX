import React, { useState } from 'react';
import axios from 'axios';
import ProfilerResults from '../components/ProfilerResults';

interface ResponseData {
  success: boolean;
  user_id: string;
  action: string;
  result: string;
}

const LearnerProfiler: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [action, setAction] = useState('analyze_behavior');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResponseData | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/api/profiler', {
        user_id: userId,
        action: action
      }, {
        timeout: 120000 // 2 minutes timeout
      });

      setResult(response.data);
    } catch (err: any) {
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. The AI agent is taking too long to respond. Please try again.');
      } else {
        setError(err.response?.data?.error || 'An error occurred while processing your request.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">
        <span>🧠</span>
        Learner Profiler Agent
      </h2>
      <p className="page-description">
        Analyze learner behavior, identify learning styles, and detect skill gaps
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">User ID</label>
          <input
            type="text"
            className="form-input"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID (e.g., U123)"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Action</label>
          <select
            className="form-select"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          >
            <option value="analyze_behavior">Analyze Learning Behavior</option>
            <option value="identify_learning_style">Identify Learning Style</option>
            <option value="detect_skill_gaps">Detect Skill Gaps</option>
            <option value="calculate_engagement">Calculate Engagement Metrics</option>
            <option value="get_full_profile">Get Full Learner Profile</option>
          </select>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Processing...' : '🚀 Analyze Profile'}
        </button>
      </form>

      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>🤖 AI Agent is analyzing the learner profile...</p>
          <p className="loading-subtext">This may take 30-60 seconds. Please wait.</p>
        </div>
      )}

      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && <ProfilerResults data={result} />}
    </div>
  );
};

export default LearnerProfiler;
