import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllTasks.css'; 
const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks
  const fetchAllTask = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/task/allTasks/');
      setTasks(res.data.tasks);
    } catch (error) {
      console.error('Failed to fetch Tasks:', error);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/task/delete/${id}`);
      fetchAllTask(); // Refresh list
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Update task (mock update for now, ideally redirect to a form or modal)
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/task/update/${id}`, {
        status: "In Progress" ,
        status: "Done",
        // status: "To Do"
      });
      fetchAllTask(); 
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  useEffect(() => {
    fetchAllTask();
  }, []);

  return (
    <div className="tasks-container">
      <h2>All Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>
                <button className="update-btn" onClick={() => handleUpdate(task._id)}>Update</button>
                <button className="delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTasks;
