import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // (Optional) Add specific styles for the Login page

function Login() {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleLogin = () => {
    // Handle login logic here if needed
    navigate('/calendar'); // Navigate to the Calendar page
  };

  return (
    <div className="login-page">
      <header className="header">
        <h1>FlowDate</h1>
      </header>
      <main className="main-content">
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </main>
      <footer className="footer">
        <p>&copy; 2025 Samuel Capece. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
