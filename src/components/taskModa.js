"use client";

import { useState, useEffect } from "react";
import { useTaskStore } from "../store/taskStore";

export default function TaskModal({ isOpen, onClose, task, day }) {
  const { updateWeeklyTask, addTaskToDay } = useTaskStore();

  const [formData, setFormData] = useState({
    status: "pending",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        // title: task.title || "",
        // description: task.description || "",
        // tools: task.tools || "",
        // priority: task.priority || "low",
        // startTime: task.startTime || "",
        // endTime: task.endTime || "",
        status: task.status || "pending",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task) {
      // Edit existing weekly task
      await updateWeeklyTask(task.day, task.id, formData);
    } else {
      // Add new task to a specific day
      await addTaskToDay(day, formData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0   bg-flag-green/40 backdrop-opacity-20  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {task ? "Edit Task" : `Add Task for ${day}`}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Task Title"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Description"
          />
          <input
            name="tools"
            value={formData.tools}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Tools (comma-separated)"
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="flex gap-2">
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div> */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-flag-green text-white rounded"
            >
              {task ? "Done" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
