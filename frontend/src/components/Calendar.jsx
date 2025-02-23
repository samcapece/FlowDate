import React, { useState, useEffect } from 'react';
import './Calendar.css'; // Import the calendar stylesheet
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Calendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date()); // Tracks the current month/year

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Get the current year and month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get the first and last day of the month
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // Last date in month

  // Generate days for the calendar grid
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // Empty slots for days before the first day
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    days.push(i);
  }

  // Handle month navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day) => {
    if (day) {
      navigate(`/day/${year}/${month+1}/${day}`); // Navigate to the Day View page

    }
  };

  const [taskStatus, setTaskStatus] = useState({});
  const [taskCompletionRatio, setTaskCompletionRatio] = useState({});

  useEffect(() => {
    const updatedStatus = {};
    const updatedRatio = {};

    for (let day = 1; day <= lastDateOfMonth; day++) {
      const taskKey = `tasks-${year}-${month + 1}-${day}`;
      const savedTasks = JSON.parse(localStorage.getItem(taskKey)) || [];

      if (savedTasks.length === 0) {
        updatedStatus[day] = null;
        updatedRatio[day] = 0;
      } else {
        const completedTasks = savedTasks.filter((task) => task.completed).length;
        const totalTasks = savedTasks.length;
        const incompleteTasks = totalTasks - completedTasks;

        updatedRatio[day] = completedTasks / totalTasks;

        if (totalTasks > 5) {
          updatedStatus[day] = "progress-bar"; // Use progress bar
        } else {
          updatedStatus[day] = savedTasks.map((task) => {
            const taskDate = new Date(year, month, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            taskDate.setHours(0, 0, 0, 0);
          
            if (task.completed) return "green"; // ✅ Task is completed
            if (taskDate >= today) return "yellow"; // 🟡 Today or future dates (incomplete)
            return "red"; // 🔴 Past-due and incomplete
          });
        }
      }
    }

    setTaskStatus(updatedStatus);
    setTaskCompletionRatio(updatedRatio);
  }, [month, year]);

  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        {/* Calendar Header */}
        <div className="calendar-header">
          <button onClick={goToPreviousMonth}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h2>
            {currentDate.toLocaleString('default', { month: 'long' })} {year}
          </h2>
          <button onClick={goToNextMonth}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
  
        {/* Days of the Week */}
        <div className="calendar-days">
          {daysOfWeek.map((day) => (
            <div key={day} className="calendar-day-name">
              {day}
            </div>
          ))}
        </div>
  
        {/* Calendar Grid */}
        <div className="calendar-grid">
          {days.map((day, index) => (

            <div
            key={index}
            className={`calendar-cell ${day ? 'filled' : 'empty'} ${
              day === new Date().getDate() &&
              month === new Date().getMonth() &&
              year === new Date().getFullYear()
                ? 'current-day'
                : ''
            }`}
            onClick={() => day && handleDayClick(day)}
          >
            {/* Wrap day number inside a div to force separation */}
            <div className="day-number">{day}</div>
          
            {/* Dots for tasks if there are 5 or fewer */}
            {taskStatus[day] && taskStatus[day].length <= 5 && (
              <div className="task-dots-wrapper">
                {taskStatus[day].map((status, i) => (
                  <span key={i} className={`task-dot ${status}`}></span>
                ))}
              </div>
            )}
          
            {/* Progress Bar if more than 5 tasks */}
            {taskStatus[day] && taskStatus[day].length > 5 && (
              <div className="task-progress-bar"
              style={{
                background: new Date(year, month, day) >= new Date() ? "var(--yellow)" : "var(--red)", // Yellow if today/future, Red if past
              }}
              >
                <div
                  className="task-progress-fill"
                  style={{
                    width: `${(taskCompletionRatio[day] || 0) * 100}%`,
                    background: "var(--green2)",
                  }}
                ></div>
              </div>
            )}
          </div>

          ))}
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2025 Samuel Capece. All rights reserved.</p>
      </footer>
    </div>
  );
  
}

export default Calendar;
