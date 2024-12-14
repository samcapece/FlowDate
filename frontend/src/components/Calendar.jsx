import React, { useState } from 'react';
import './Calendar.css'; // Import the calendar stylesheet

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date()); // Tracks the current month/year

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

  return (
    <div className="calendar">
      {/* Calendar Header */}
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>&lt; Prev</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </h2>
        <button onClick={goToNextMonth}>Next &gt;</button>
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
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
