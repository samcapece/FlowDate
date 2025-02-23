import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DayView.css";

function DayView() {
  const { year, month, day } = useParams();
  const navigate = useNavigate();

  // Unique keys for storing data
  const taskKey = `tasks-${year}-${month}-${day}`;
  const journalKey = `journal-${year}-${month}-${day}`;

  // States for tasks & journal
  const [tasks, setTasks] = useState(null); // Initially set to `null`
  const [newTask, setNewTask] = useState("");
  const [journal, setJournal] = useState("");

  // Load saved tasks & journal on mount
  useEffect(() => {
    console.log(`Loading tasks from localStorage: ${taskKey}`);

    const savedTasks = JSON.parse(localStorage.getItem(taskKey));
    const savedJournal = localStorage.getItem(journalKey) || "";

    if (savedTasks !== null) {
      setTasks(savedTasks);
    } else {
      setTasks([]); // Only set empty array **after checking**
    }

    setJournal(savedJournal);
  }, [taskKey, journalKey]);

  // Save tasks to localStorage when they change
  useEffect(() => {
    if (tasks !== null) {
      console.log(`Saving tasks to localStorage:`, tasks);
      localStorage.setItem(taskKey, JSON.stringify(tasks));
    }
  }, [tasks, taskKey]);

  // Add Task
  const addTask = () => {
    if (newTask.trim() === "" || tasks === null) return;
    const updatedTasks = [...tasks, { text: newTask, completed: false }];
    setTasks(updatedTasks);
    setNewTask("");
  };

  // Toggle Task Completion
  const toggleTaskCompletion = (index) => {
    if (tasks === null) return;

    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );

    // Move completed tasks to the bottom
    setTasks(updatedTasks.sort((a, b) => a.completed - b.completed));
  };

  // Save Journal Changes in Real-Time
  const handleJournalChange = (e) => {
    const updatedJournal = e.target.value;
    setJournal(updatedJournal);
    localStorage.setItem(journalKey, updatedJournal);
  };

  // Remove Task
  const removeTask = (index) => {
    if (tasks === null) return;
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="view-wrapper">
      <div className="day-view">
        <button className="back-button" onClick={() => navigate("/calendar")}>
          ← Back
        </button>

        <div className="day-content">
          {/* Tasks Panel */}
          <div className="tasks-panel animate-left">
            <h2>{month}/{day}</h2>

            <div className="task-input">
              <input
                type="text"
                placeholder="Enter a task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={addTask}>+</button>
            </div>

            {/* Task List */}
            <ul className="task-list">
              {tasks &&
                tasks.map((task, index) => (
                  <li
                    key={index}
                    className={task.completed ? "completed-task" : ""}
                    onClick={() => toggleTaskCompletion(index)}
                  >
                    {task.text}
                    <button
                      className="delete-task"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent marking as completed when deleting
                        removeTask(index);
                      }}
                    >
                      -
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          {/*  Journal Panel */}
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
        <p>&copy; {year} Samuel Capece. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default DayView;
