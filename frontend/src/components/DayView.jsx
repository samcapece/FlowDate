import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DayView.css';

function DayView() {
  const { day, month } = useParams(); // Get the selected day from URL
  const navigate = useNavigate();

  return (
    <div className = "view-warpper">
        <div className="day-view">
          <button className="back-button" onClick={() => navigate('/calendar')}>← Back</button>

          <div className="day-content">
            {/* Tasks Section */}
            <div className="tasks-panel animate-left">
              <h2>{month}/{day} </h2>
              <ul>
                <li>Task 1</li>
                <li>Task 2</li>
                <li>Task 3</li>
              </ul>
            </div>

            {/* Journal Section */}
            <div className="journal-panel animate-right">
              <h2>Journal</h2>
              <textarea placeholder="Write your thoughts here..."></textarea>
            </div>
          </div>
        </div>
          <footer className="footer">
            <p>&copy; 2025 Samuel Capece. All rights reserved.</p>
        </footer>
    </div>
  );
}

export default DayView;
