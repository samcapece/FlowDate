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
          onClick={() => alert('Login clicked!')}
        >
          Login
        </button>
      </main>
      <footer classname="footer">
        <p> 2024 Samuel Capece. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
