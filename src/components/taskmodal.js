"use client";
import { useState, useEffect } from "react";
import useTaskStore from "../store/taskStore";

export default function TaskModal({ isOpen, onClose, task = null, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tools: "",
    priority: "Medium",
    startTime: "09:00",
    endTime: "10:00",
    status: "Pending",
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        title: "",
        description: "",
        tools: "",
        priority: "Medium",
        startTime: "09:00",
        endTime: "10:00",
        status: "Pending",
      });
    }
  }, [task, isOpen]);

  const handleSubmit = (e) => {};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  const timeOptions = [];
  for (let i = 8; i <= 18; i++) {
    timeOptions.push(`${i.toString().padStart(2, "0")}:00`);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tools
            </label>
            <input
              type="text"
              name="tools"
              value={formData.tools}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Figma, VS Code, Slack"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <select
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <select
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {task ? "Update" : "Add Task"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import useTaskStore from "../store/taskStore";

// export default function TaskModal({ isOpen, onClose, task = null }) {
//   const { addTask, updateTask, loading } = useTaskStore();

//   const [formData, setFormData] = useState({
//     day: "Monday",
//     title: "",
//     description: "",
//     tools: "",
//     priority: "Medium",
//     startTime: "09:00",
//     endTime: "10:00",
//     status: "Pending",
//   });

//   useEffect(() => {
//     if (task) {
//       setFormData(task);
//     } else {
//       setFormData({
//         day: "Monday",
//         title: "",
//         description: "",
//         tools: "",
//         priority: "Medium",
//         startTime: "09:00",
//         endTime: "10:00",
//         status: "Pending",
//       });
//     }
//   }, [task, isOpen]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (task) {
//       await updateTask(task.id, formData);
//     } else {
//       await addTask(formData);
//     }

//     onClose();
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   if (!isOpen) return null;

//   const timeOptions = [];
//   for (let i = 8; i <= 18; i++) {
//     timeOptions.push(`${i.toString().padStart(2, "0")}:00`);
//   }

//   return (
//     <div className="fixed inset-0 bg-black/30 bg-opacity-60 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">
//           {task ? "Edit Task" : "Add New Task"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Day
//             </label>
//             <select
//               name="day"
//               value={formData.day}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
//                 (day) => (
//                   <option key={day} value={day}>
//                     {day}
//                   </option>
//                 )
//               )}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Task Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows={3}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Tools
//             </label>
//             <input
//               type="text"
//               name="tools"
//               value={formData.tools}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="e.g., Figma, VS Code, Slack"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Priority
//             </label>
//             <select
//               name="priority"
//               value={formData.priority}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Start Time
//               </label>
//               <select
//                 name="startTime"
//                 value={formData.startTime}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 {timeOptions.map((time) => (
//                   <option key={time} value={time}>
//                     {time}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 End Time
//               </label>
//               <select
//                 name="endTime"
//                 value={formData.endTime}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 {timeOptions.map((time) => (
//                   <option key={time} value={time}>
//                     {time}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Status
//             </label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Complete">Complete</option>
//             </select>
//           </div>

//           <div className="flex space-x-3 pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
//             >
//               {loading ? "Saving..." : task ? "Update" : "Submit"}
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
