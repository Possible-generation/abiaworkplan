// "use client";

// import { useState, useEffect } from "react";
// import { useTaskStore } from "../store/taskStore";

// export default function TaskModal({ isOpen, onClose, task, day }) {
//   const { updateWeeklyTask, addTaskToDay } = useTaskStore();

//   const [formData, setFormData] = useState({
//     status: "pending",
//   });

//   useEffect(() => {
//     if (task) {
//       setFormData({
//         status: task.status || "pending",
//       });
//     }
//   }, [task]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (task) {
//       // Edit existing weekly task
//       await updateWeeklyTask(task.day, task.id, formData);
//     } else {
//       // Add new task to a specific day
//       await addTaskToDay(day, formData);
//     }

//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0   bg-flag-green/40 backdrop-opacity-20  bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
//         <h2 className="text-lg font-semibold mb-4">
//           {task ? "Edit Task" : `Add Task for ${day}`}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           >
//             <option value="pending">Pending</option>
//             <option value="in-progress">In Progress</option>
//             <option value="completed">Completed</option>
//           </select>
//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-flag-green text-white rounded"
//             >
//               {task ? "Done" : "Add Task"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import useTaskFilterStore from "../store/useTaskFilterStore";

export default function TaskModal({ isOpen, onClose, task, day }) {
  const { updateTaskStatus, fetchTasks } = useTaskFilterStore();

  const [status, setStatus] = useState("PENDING");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      // Edit existing task - only populate status
      setStatus(task.status || "PENDING");
    } else {
      // New task default status
      setStatus("PENDING");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (task) {
        // Update only the status
        await updateTaskStatus(task.id, status);
        console.log(`Task ${task.id} status updated to: ${status}`);
      }

      onClose();
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-flag-green/40 backdrop-opacity-20  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Update Task Status</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select the current status of this task
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-flag-green text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating..." : "Update Status"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
