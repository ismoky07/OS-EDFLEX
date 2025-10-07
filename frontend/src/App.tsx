import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LearnerProfiler from './pages/LearnerProfiler';
import PathRecommender from './pages/PathRecommender';
import LearningAssistant from './pages/LearningAssistant';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1>🎓 Edflex Personalised Learning</h1>
            <p className="subtitle">AI-Powered Learning Personalization Platform</p>
          </div>
        </header>

        <nav className="main-nav">
          <Link to="/" className="nav-link">
            <span className="nav-icon">🧠</span>
            Learner Profiler
          </Link>
          <Link to="/recommender" className="nav-link">
            <span className="nav-icon">🎯</span>
            Path Recommender
          </Link>
          <Link to="/assistant" className="nav-link">
            <span className="nav-icon">💬</span>
            Learning Assistant
          </Link>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LearnerProfiler />} />
            <Route path="/recommender" element={<PathRecommender />} />
            <Route path="/assistant" element={<LearningAssistant />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>🤖 Powered by xAI Grok-3 | Built with Agno Framework</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
