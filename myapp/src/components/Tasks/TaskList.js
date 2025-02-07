import React, { useEffect, useState } from "react";
import api from "../../api";
import "../Styles/TaskList.css"
import { useNavigate } from "react-router-dom";
import "../Styles/TaskList.css"

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate()
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  return (
    <div className="task-list-container">
      <h2>My Tasks</h2>
      <button onClick={() => navigate("/task-form")}>Create Task</button> 
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - Assigned by: {task.assignerEmail} -{" "}
            {task.assignee ? task.assignee.email : "Unassigned"} - {task.status}
            <button onClick={() => deleteTask(task._id)}>Delete</button> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
