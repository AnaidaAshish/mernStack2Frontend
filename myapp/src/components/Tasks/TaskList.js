import React, { useEffect, useState } from "react";
import api from "../../api";
import "../Styles/TaskList.css"

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - Assigned by: {task.assignerEmail} -{" "}
            {task.assignee ? task.assignee.email : "Unassigned"} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
