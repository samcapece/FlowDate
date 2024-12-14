import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login'; // Import Login component
import Calendar from './components/Calendar'; // Import Calendar component
import './index.css'; // Global styles

function HomePage() {
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the Login page
  };

  return (
    <div className="app">
      <header className="header">
        <h1>FlowDate</h1>
      </header>
      <main className="main-content">
        <button className="login-button" onClick={handleLoginClick}>
          Login
        </button>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Samuel Capece. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Page */}
        <Route path="/login" element={<Login />} /> {/* Login Page */}
        <Route path="/calendar" element={<Calendar />} /> {/* Calendar Page */}
      </Routes>
    </Router>
  );
}

export default App;
