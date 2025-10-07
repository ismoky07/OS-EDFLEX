import React, { useState } from 'react';
import axios from 'axios';
import AssistantResults from '../components/AssistantResults';

interface ResponseData {
  success: boolean;
  user_id: string;
  question: string;
  result: string;
}

const LearningAssistant: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResponseData | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/api/assistant', {
        user_id: userId,
        question: question
      }, {
        timeout: 120000 // 2 minutes timeout
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
        <span>💬</span>
        Learning Assistant Agent
      </h2>
      <p className="page-description">
        Get answers, explanations, and personalized learning guidance
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
          <label className="form-label">Your Question</label>
          <textarea
            className="form-textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything about learning content, your progress, or concepts you want to understand..."
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Processing...' : '🚀 Ask Assistant'}
        </button>
      </form>

      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>🤖 Assistant is analyzing your question... This may take 30-60 seconds</p>
        </div>
      )}

      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && <AssistantResults data={result} />}
    </div>
  );
};

export default LearningAssistant;
