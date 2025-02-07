import React, { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import "../Styles/TaskForm.css"

const TaskForm = ({ fetchTasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assigneeEmail: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);

      await api.post("/tasks/create-task", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Task created successfully!");
      fetchTasks(); // Refresh task list after creation
      setFormData({ title: "", description: "", assigneeEmail: "" }); // Reset form
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task.");
    }
  };

  return (
    <div className="parent">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="assigneeEmail"
          placeholder="Assignee Email"
          value={formData.assigneeEmail}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
