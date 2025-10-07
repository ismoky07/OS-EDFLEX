import React, { useState } from 'react';
import axios from 'axios';
import RecommenderResults from '../components/RecommenderResults';

interface ResponseData {
  success: boolean;
  user_id: string;
  action: string;
  result: string;
}

const PathRecommender: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [action, setAction] = useState('recommend_content');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResponseData | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/api/recommender', {
        user_id: userId,
        action: action,
        goal: goal || undefined
      });

      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">
        <span>🎯</span>
        Path Recommender Agent
      </h2>
      <p className="page-description">
        Get personalized content recommendations and build adaptive learning paths
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
            <option value="recommend_content">Recommend Personalized Content</option>
            <option value="build_learning_path">Build Learning Path</option>
            <option value="get_next_content">Get Next Best Content</option>
            <option value="check_prerequisites">Check Prerequisites</option>
          </select>
        </div>

        {action === 'build_learning_path' && (
          <div className="form-group">
            <label className="form-label">Learning Goal</label>
            <input
              type="text"
              className="form-input"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Enter learning goal (e.g., Become a Data Analyst)"
            />
          </div>
        )}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Processing...' : '🚀 Get Recommendations'}
        </button>
      </form>

      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Generating recommendations...</p>
        </div>
      )}

      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && <RecommenderResults data={result} />}
    </div>
  );
};

export default PathRecommender;
