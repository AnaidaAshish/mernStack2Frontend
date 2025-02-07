import React, { useState, useEffect } from "react";
import TaskForm from "../components/Tasks/TaskForm";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/Styles/Dashboard.css"

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(res.data); // If the request is successful, it will update the tasks state
    } catch (error) {
      console.error("Error fetching tasks:", error);
      console.error("Response Data:", error.response?.data);
      console.error("Error Message:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const markAsCompleted = async (taskId) => {
    try {
      await api.put(
        `/tasks/${taskId}`,
        { status: "completed" },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Task marked as completed!");
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error(
        "Error marking task as completed:",
        error.response?.data || error.message
      );
      toast.error("Failed to mark task as completed.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Task deleted successfully!");
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error(
        "Error deleting task:",
        error.response?.data || error.message
      );
      toast.error("Failed to delete task.");
    }
  };

  return (
    <div className="parent">
      <h1>Task Dashboard</h1>

      <TaskForm fetchTasks={fetchTasks} />
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id} // Use _id instead of id
            className={task.status === "completed" ? "completed-task" : ""}
          >
            <strong>{task.title}</strong>: {task.description}
            <div>
              {task.status !== "completed" && (
                <button onClick={() => markAsCompleted(task._id)}>
                  {" "}
                  {/* Use _id */}
                  Mark as Completed
                </button>
              )}
              <button onClick={() => deleteTask(task._id)}>
                {" "}
                {/* Use _id */}
                Delete
              </button>
            </div>
            <span>Status: {task.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
