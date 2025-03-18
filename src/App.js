import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<DetailPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© {new Date().getFullYear()} RAWG Game Explorer | Powered by RAWG API</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;