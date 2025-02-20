import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DayView.css';

function DayView() {
  const { year, day, month } = useParams(); // Get the selected day from URL
  const navigate = useNavigate();

  // Create unique localStorage keys
  const taskKey = `tasks-${year}-${month}-${day}`;
  const journalKey = `journal-${year}-${month}-${day}`;

  // States for tasks and journal
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [journal, setJournal] = useState('');

  // Load saved tasks and journal from localStorage on page load
  useEffect(() => {
    console.log("Loading tasks and journal from localStorage...");
    const savedTasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    const savedJournal = localStorage.getItem(journalKey) || '';

    if (savedTasks) setTasks(savedTasks);
    if (savedJournal) setJournal(savedJournal);
  }, [taskKey, journalKey]);

  // Save tasks to localStorage immediately after updating state
  const addTask = () => {
    if (newTask.trim() === '') return;
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem(taskKey, JSON.stringify(updatedTasks));
    setNewTask('');
  };

  // Save journal changes to localStorage in real-time
  const handleJournalChange = (e) => {
    const updatedJournal = e.target.value;
    setJournal(updatedJournal);
    localStorage.setItem(journalKey, updatedJournal);
  };

  // Delete a task and update localStorage
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks-${month}-${day}`, JSON.stringify(updatedTasks));
  };

  

  return (
    <div className = "view-wrapper">
        <div className="day-view">
          <button className="back-button" onClick={() => navigate('/calendar')}>← Back</button>

          <div className="day-content">
            {/* Tasks Section */}

            <div className="tasks-panel animate-left">
              <h2>{month}/{day} </h2>

            {/* Task Input Form */}

            <div className="task-input">
              <input
                type="text"
                placeholder="Enter a task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={addTask}>+</button>
            </div>

            {/* Display Tasks */}

            <ul className="task-list">
              {tasks.map((task, index) => (
                <li key={index}>
                  {task}
                  <button className="delete-task" onClick={() => removeTask(index)}>✖</button>
                </li>
              ))}
            </ul>
          </div>

            {/* Journal Section */}

            <div className="journal-panel animate-right">
              <h2>Journal</h2>
              <textarea
                placeholder="Write your thoughts here..."
                value={journal}
                onChange={handleJournalChange}
              />

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
