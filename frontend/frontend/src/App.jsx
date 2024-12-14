import React from 'react';
import './index.css'; // Import your global stylesheet

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>FlowDate</h1>
      </header>
      <main className="main-content">
        <button
          className="login-button"
          onClick={() => console.log('Login clicked!')}
        >
          Login
        </button>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Samuel Capece. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
