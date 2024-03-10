import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    try {
      const response = await axios.post('http://localhost:3000/tasks', {
        name: newTask,
        completed: false,
      });
      setTasks([...tasks, response.data.task]);
      setNewTask('');
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  const handleUpdateTask = async () => {
    if (!selectedTask) return;

    try {
      const response = await axios.patch(
        `http://localhost:3000/tasks/${selectedTask._id}`,
        {
          name: selectedTask.name,
          completed: !selectedTask.completed,
          // Add other properties to update as needed
        }
      );
      const updatedTasks = tasks.map((task) =>
        task._id === selectedTask._id ? response.data.task : task
      );
      setTasks(updatedTasks);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {selectedTask && selectedTask._id === task._id ? (
                <div>
                  <input
                    type="text"
                    value={selectedTask.name}
                    onChange={(e) =>
                      setSelectedTask({ ...selectedTask, name: e.target.value })
                    }
                  />
                  <label>
                    Completed:
                    <select
                      value={selectedTask.completed ? 'Yes' : 'No'}
                      onChange={(e) =>
                        setSelectedTask({
                          ...selectedTask,
                          completed: e.target.value === 'Yes',
                        })
                      }
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </label>
                </div>
              ) : (
                <div>
                  {task.name} - Completed: {task.completed ? 'Yes' : 'No'}
                </div>
              )}
              <button onClick={() => setSelectedTask(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <h2>Create New Task</h2>
        <input
          type="text"
          placeholder="Task name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleCreateTask}>Create Task</button>
      </div>
      {selectedTask && (
        <div>
          <h2>Edit Task</h2>
          <button onClick={handleUpdateTask}>Update Task</button>
        </div>
      )}
    </div>
  );
};

export default Tasks;