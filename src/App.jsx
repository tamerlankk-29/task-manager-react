import { useState } from 'react';
import './App.css';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (!taskInput.trim()) {
      alert('Task cannot be empty!');
      return;
    }
    setTasks([...tasks, { text: taskInput, completed: false }]);
    setTaskInput('');
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const completeTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <div className="task-form">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <TaskList tasks={tasks} deleteTask={deleteTask} completeTask={completeTask} />
    </div>
  );
}

function TaskList({ tasks, deleteTask, completeTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          deleteTask={() => deleteTask(index)}
          completeTask={() => completeTask(index)}
        />
      ))}
    </ul>
  );
}

function Task({ task, deleteTask, completeTask }) {
  return (
    <li className={`task ${task.completed ? 'completed' : 'pending'}`}>
      <span>{task.text}</span>
      <button onClick={completeTask}>Complete</button>
      <button onClick={deleteTask}>Delete</button>
    </li>
  );
}

export default TaskManager;
