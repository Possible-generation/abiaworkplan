// "use client";

// import { use, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useTaskStore } from "../../../../store/taskStore";
// import ProgressTracker from "../../../../components/progressiontracker";

// const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// export default function AddTaskPage() {
//   const router = useRouter();
//   const [currentDay, setCurrentDay] = useState(0);
//   const [weeklyTasks, setWeeklyTasks] = useState({
//     Monday: [],
//     Tuesday: [],
//     Wednesday: [],
//     Thursday: [],
//     Friday: [],
//   });
//   const [currentTask, setCurrentTask] = useState({
//     title: "",
//     description: "",
//     tools: "",
//     priority: "",
//     startTime: "09:00",
//     endTime: "10:00",
//     status: "",
//   });

//   const { setWeeklyTasks: saveWeeklyTasks, setCurrentWeekCompleted } =
//     useTaskStore();

//   const handleAddTask = () => {
//     if (!currentTask.title.trim()) return;

//     const dayName = DAYS[currentDay];
//     setWeeklyTasks((prev) => ({
//       ...prev,
//       [dayName]: [
//         ...prev[dayName],
//         { ...currentTask, id: Date.now(), day: dayName },
//       ],
//     }));

//     setCurrentTask({
//       title: "",
//       description: "",
//       tools: "",
//       priority: "medium",
//       startTime: "09:00",
//       endTime: "10:00",
//       status: "pending",
//     });
//   };

//   const handleRemoveTask = (taskId) => {
//     const dayName = DAYS[currentDay];
//     setWeeklyTasks((prev) => ({
//       ...prev,
//       [dayName]: prev[dayName].filter((task) => task.id !== taskId),
//     }));
//   };

//   const canProceed = () => {
//     const dayName = DAYS[currentDay];
//     return weeklyTasks[dayName].length > 0;
//   };

//   const handleNext = () => {
//     if (canProceed() && currentDay < DAYS.length - 1) {
//       setCurrentDay(currentDay + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentDay > 0) {
//       setCurrentDay(currentDay - 1);
//     }
//   };

//   const handleSubmit = () => {
//     saveWeeklyTasks(weeklyTasks);
//     console.log("Weekly tasks saved:", weeklyTasks);

//     setCurrentWeekCompleted(true);
//     router.push("/weeklyplan");
//   };

//   const handleChange = (e) => {
//     setCurrentTask({
//       ...currentTask,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const timeOptions = [];
//   for (let i = 8; i <= 18; i++) {
//     timeOptions.push(`${i.toString().padStart(2, "0")}:00`);
//   }

//   const currentDayName = DAYS[currentDay];
//   const currentDayTasks = weeklyTasks[currentDayName];

//   return (
//     <div className="px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-900 mb-6">
//           Add New Task
//         </h1>

//         <ProgressTracker currentDay={currentDay} days={DAYS} />

//         <div className="bg-white p-6 rounded-lg shadow-sm border">
//           <h2 className="text-lg font-medium text-gray-900 mb-4">
//             {currentDayName} Tasks
//           </h2>

//           {/* Task Form */}
//           <div className="space-y-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Task Title
//               </label>
//               <input
//                 type="text"
//                 value={currentTask.title}
//                 onChange={(e) =>
//                   setCurrentTask({ ...currentTask, title: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter task title"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description
//               </label>
//               <textarea
//                 value={currentTask.description}
//                 onChange={(e) =>
//                   setCurrentTask({
//                     ...currentTask,
//                     description: e.target.value,
//                   })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 rows="3"
//                 placeholder="Enter task description"
//               />
//             </div>

//             <div className="grid grid-cols-1  gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Tools
//                 </label>
//                 <input
//                   type="text"
//                   value={currentTask.tools}
//                   onChange={(e) =>
//                     setCurrentTask({ ...currentTask, tools: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Required tools"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Priority
//                 </label>
//                 <select
//                   value={currentTask.priority}
//                   name="priority"
//                   onChange={(e) =>
//                     setCurrentTask({ ...currentTask, priority: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                 </select>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Start Time
//                   </label>
//                   <select
//                     name="startTime"
//                     value={currentTask.startTime}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   >
//                     {timeOptions.map((time) => (
//                       <option key={time} value={time}>
//                         {time}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     End Time
//                   </label>
//                   <select
//                     name="endTime"
//                     value={currentTask.endTime}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   >
//                     {timeOptions.map((time) => (
//                       <option key={time} value={time}>
//                         {time}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Status
//               </label>
//               <select
//                 value={currentTask.status}
//                 onChange={(e) =>
//                   setCurrentTask({ ...currentTask, status: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="pending">Pending</option>
//                 <option value="in-progress">In Progress</option>
//                 <option value="completed">Completed</option>
//               </select>
//             </div>

//             <button
//               onClick={handleAddTask}
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               + Add Task
//             </button>
//           </div>

//           {/* Added Tasks */}
//           {currentDayTasks.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-md font-medium text-gray-900 mb-3">
//                 Added Tasks for {currentDayName}
//               </h3>
//               <div className="space-y-2">
//                 {currentDayTasks.map((task) => (
//                   <div
//                     key={task.id}
//                     className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
//                   >
//                     <div>
//                       <span className="font-medium">{task.title}</span>
//                       <span className="text-sm text-gray-500 ml-2">
//                         ({task.priority} priority, {task.time})
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => handleRemoveTask(task.id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Navigation */}
//           <div className="flex justify-between">
//             <button
//               onClick={handlePrevious}
//               disabled={currentDay === 0}
//               className={`px-4 py-2 rounded-md text-sm font-medium ${
//                 currentDay === 0
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-gray-600 text-white hover:bg-gray-700"
//               }`}
//             >
//               Previous
//             </button>

//             {currentDay === DAYS.length - 1 ? (
//               <button
//                 onClick={handleSubmit}
//                 disabled={!canProceed()}
//                 className={`px-4 py-2 rounded-md text-sm font-medium ${
//                   canProceed()
//                     ? "bg-green-600 text-white hover:bg-green-700"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 Submit
//               </button>
//             ) : (
//               <button
//                 onClick={handleNext}
//                 disabled={!canProceed()}
//                 className={`px-4 py-2 rounded-md text-sm font-medium ${
//                   canProceed()
//                     ? "bg-blue-600 text-white hover:bg-blue-700"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// original copy
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useTaskStore } from "../../../../store/taskStore";
// import ProgressTracker from "../../../../components/progressiontracker";

// const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// export default function AddTaskPage() {
//   const router = useRouter();
//   const [currentDay, setCurrentDay] = useState(0);

//   const {
//     weeklyTasks,
//     addTaskToDay,
//     removeTaskFromDay,
//     initializeWeeklyPlan,
//     submitWeeklyPlan,
//     hasCompletedWeeklyPlan,
//   } = useTaskStore();

//   const [currentTask, setCurrentTask] = useState({
//     title: "",
//     description: "",
//     tools: "",
//     priority: "medium",
//     startTime: "09:00",
//     endTime: "10:00",
//     status: "pending",
//   });

//   // Initialize plan on mount
//   useEffect(() => {
//     if (!hasCompletedWeeklyPlan()) {
//       initializeWeeklyPlan();
//     }
//   }, [initializeWeeklyPlan, hasCompletedWeeklyPlan]);

//   const handleAddTask = () => {
//     if (!currentTask.title.trim()) return;

//     const dayName = DAYS[currentDay];

//     addTaskToDay(dayName, currentTask);

//     setCurrentTask({
//       title: "",
//       description: "",
//       tools: "",
//       priority: "medium",
//       startTime: "09:00",
//       endTime: "10:00",
//       status: "pending",
//     });
//   };

//   const handleRemoveTask = (taskId) => {
//     const dayName = DAYS[currentDay];
//     removeTaskFromDay(dayName, taskId);
//   };

//   const canProceed = () => {
//     const dayName = DAYS[currentDay];
//     return (weeklyTasks[dayName] || []).length > 0;
//   };

//   const handleNext = () => {
//     if (canProceed() && currentDay < DAYS.length - 1) {
//       setCurrentDay((prev) => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentDay > 0) {
//       setCurrentDay((prev) => prev - 1);
//     }
//   };

//   const handleSubmit = async () => {
//     const result = await submitWeeklyPlan();
//     console.log("Weekly tasks submitted:", result);

//     if (result.success) {
//       router.push("/weeklyplan");
//     }
//   };

//   const handleChange = (e) => {
//     setCurrentTask({
//       ...currentTask,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const timeOptions = [];
//   for (let i = 8; i <= 18; i++) {
//     timeOptions.push(`${i.toString().padStart(2, "0")}:00`);
//   }

//   const currentDayName = DAYS[currentDay];
//   const currentDayTasks = weeklyTasks[currentDayName] || [];

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 mt-10">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-900 mb-6">
//           Add New Task
//         </h1>

//         <ProgressTracker currentDay={currentDay} days={DAYS} />

//         <div className="bg-white p-6 rounded-lg">
//           <h2 className="text-lg font-medium text-gray-900 mb-4">
//             {currentDayName} Tasks
//           </h2>

//           {/* Task Form */}
//           <div className="space-y-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Task Title
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={currentTask.title}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter task title"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={currentTask.description}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 rows="3"
//                 placeholder="Enter task description"
//               />
//             </div>

//             <div className="grid grid-cols-1 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Tools
//                 </label>
//                 <input
//                   type="text"
//                   name="tools"
//                   value={currentTask.tools}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Required tools"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Priority
//                 </label>
//                 <select
//                   name="priority"
//                   value={currentTask.priority}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                 </select>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Start Time
//                   </label>
//                   <select
//                     name="startTime"
//                     value={currentTask.startTime}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     {timeOptions.map((time) => (
//                       <option key={time} value={time}>
//                         {time}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     End Time
//                   </label>
//                   <select
//                     name="endTime"
//                     value={currentTask.endTime}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     {timeOptions.map((time) => (
//                       <option key={time} value={time}>
//                         {time}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Status
//               </label>
//               <select
//                 name="status"
//                 value={currentTask.status}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="pending">Pending</option>
//                 <option value="in-progress">In Progress</option>
//                 <option value="completed">Completed</option>
//               </select>
//             </div>

//             <button
//               onClick={handleAddTask}
//               className="w-full bg-flag-green text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Add Task
//             </button>
//           </div>

//           {/* Added Tasks */}
//           {currentDayTasks.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-md font-medium text-gray-900 mb-3">
//                 Added Tasks for {currentDayName}
//               </h3>
//               <div className="space-y-2">
//                 {currentDayTasks.map((task) => (
//                   <div
//                     key={task.id}
//                     className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
//                   >
//                     <div>
//                       <span className="font-medium">{task.title}</span>
//                       <span className="text-sm text-gray-500 ml-2">
//                         ({task.priority} priority, {task.startTime} -{" "}
//                         {task.endTime})
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => handleRemoveTask(task.id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Navigation */}
//           <div className="flex justify-end gap-2">
//             <button
//               onClick={handlePrevious}
//               disabled={currentDay === 0}
//               className={`px-4 py-2 rounded-md text-sm font-medium ${
//                 currentDay === 0
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-gray-600 text-white hover:bg-gray-700"
//               }`}
//             >
//               Previous
//             </button>

//             {currentDay === DAYS.length - 1 ? (
//               <button
//                 onClick={handleSubmit}
//                 disabled={!canProceed()}
//                 className={`px-4 py-2 rounded-md text-sm font-medium ${
//                   canProceed()
//                     ? "bg-green-600 text-white hover:bg-green-700"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 Submit
//               </button>
//             ) : (
//               <button
//                 onClick={handleNext}
//                 disabled={!canProceed()}
//                 className={`px-4 py-2 rounded-md text-sm font-medium ${
//                   canProceed()
//                     ? "bg-flag-green text-white hover:bg-blue-700"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 Proceed
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTaskStore } from "../../../../store/taskStore";
import ProgressTracker from "../../../../components/progressiontracker";
import { CircleCheck } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function AddTaskPage() {
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [modalCurrentDay, setModalCurrentDay] = useState(0);
  const [editingTask, setEditingTask] = useState(null);
  const [showSubmittedModal, setShowSubmittedModal] = useState(false);

  const {
    weeklyTasks,
    addTaskToDay,
    removeTaskFromDay,
    updateTaskInDay,
    initializeWeeklyPlan,
    submitWeeklyPlan,
    hasCompletedWeeklyPlan,
  } = useTaskStore();

  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    tools: "",
    priority: "medium",
    startTime: "09:00",
    endTime: "10:00",
    status: "pending",
    constraints: "",
  });

  // Initialize plan on mount
  useEffect(() => {
    if (!hasCompletedWeeklyPlan()) {
      initializeWeeklyPlan();
    }
  }, [initializeWeeklyPlan, hasCompletedWeeklyPlan]);

  const handleAddTask = () => {
    if (!currentTask.title.trim()) return;

    const dayName = DAYS[currentDay];

    addTaskToDay(dayName, currentTask);

    setCurrentTask({
      title: "",
      description: "",
      tools: "",
      priority: "medium",
      startTime: "09:00",
      endTime: "10:00",
      status: "pending",
      constraints: "",
    });
  };

  const handleRemoveTask = (taskId) => {
    const dayName = DAYS[currentDay];
    removeTaskFromDay(dayName, taskId);
  };

  const handleRemoveTaskFromModal = (dayName, taskId) => {
    removeTaskFromDay(dayName, taskId);
  };

  const handleEditTask = (dayName, task) => {
    setEditingTask({ dayName, task });
  };

  const handleSaveEditTask = () => {
    if (editingTask && editingTask.task.title.trim()) {
      updateTaskInDay(
        editingTask.dayName,
        editingTask.task.id,
        editingTask.task
      );
      setEditingTask(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleEditTaskChange = (field, value) => {
    setEditingTask((prev) => ({
      ...prev,
      task: {
        ...prev.task,
        [field]: value,
      },
    }));
  };

  const canProceed = () => {
    const dayName = DAYS[currentDay];
    return (weeklyTasks[dayName] || []).length > 0;
  };

  const handleNext = () => {
    if (canProceed() && currentDay < DAYS.length - 1) {
      setCurrentDay((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentDay > 0) {
      setCurrentDay((prev) => prev - 1);
    }
  };

  const handleShowReview = () => {
    setShowReviewModal(true);
    setModalCurrentDay(0);
  };

  const handleShowSubmitted = () => {
    setShowReviewModal(false);
    setShowSubmittedModal(true);
  };

  const handleFinalSubmit = async () => {
    setShowSubmittedModal(true);
    setShowReviewModal(false);
    const result = await submitWeeklyPlan();
    console.log("Weekly tasks submitted:", result);

    if (result.success) {
      setShowReviewModal(false);
      setShowSubmittedModal(true);
      // router.push("/weeklyplan");
    }
  };

  const handleChange = (e) => {
    setCurrentTask({
      ...currentTask,
      [e.target.name]: e.target.value,
    });
  };

  const timeOptions = [];
  for (let i = 8; i <= 18; i++) {
    timeOptions.push(`${i.toString().padStart(2, "0")}:00`);
  }

  const currentDayName = DAYS[currentDay];
  const currentDayTasks = weeklyTasks[currentDayName] || [];
  const modalCurrentDayName = DAYS[modalCurrentDay];
  const modalCurrentDayTasks = weeklyTasks[modalCurrentDayName] || [];

  const exportToPDF = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Work Plan - Ministry of Agriculture</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 15px;
              font-size: 11px;
              line-height: 1.3;
            }
            .header {
              text-align: center;
              margin-bottom: 25px;
            }
            .logo-placeholder {
              width: 50px;
              height: 50px;
              background-color: #8B4513;
              margin: 0 auto 8px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 10px;
            }
            .work-plan-title {
              font-size: 13px;
              font-weight: bold;
              margin: 4px 0;
            }
            .ministry-title {
              font-size: 15px;
              font-weight: bold;
              margin: 4px 0;
            }
            .week-plan {
              font-size: 13px;
              margin: 4px 0;
            }
            .info-section {
              display: flex;
              justify-content: space-between;
              margin: 15px 0;
              padding: 8px 0;
              border-bottom: 1px solid #ccc;
            }
            .info-left {
              text-align: left;
            }
            .info-right {
              text-align: right;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
              font-size: 10px;
            }
            th, td {
              border: 1px solid #333;
              padding: 6px;
              text-align: left;
              vertical-align: top;
            }
            th {
              background-color: #f5f5f5;
              font-weight: bold;
              text-align: center;
            }
            .task-row {
              page-break-inside: avoid;
            }
            .day-cell {
              font-weight: bold;
            }
            .status-completed {
              color: #16a34a;
              font-weight: bold;
            }
            .status-progress {
              color: #2563eb;
              font-weight: bold;
            }
            .status-pending {
              color: #dc2626;
              font-weight: bold;
            }
            .signatures {
              display: flex;
              justify-content: space-between;
              margin-top: 40px;
              padding-top: 20px;
            }
            .signature-section {
              text-align: center;
              flex: 1;
            }
            .signature-line {
              border-top: 1px dashed #333;
              margin: 20px 10px 5px 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo-placeholder">LOGO</div>
            <div class="work-plan-title">WORK PLAN</div>
            <div class="ministry-title">Ministry of Agriculture</div>
            <div class="week-plan">Week Plan</div>
          </div>
          
          <div class="info-section">
            <div class="info-left">
              <div><strong>Name:</strong> Chukwu Benedict</div>
              <div><strong>Department:</strong> Finance & Account</div>
              <div><strong>Role:</strong> Internal Auditor</div>
            </div>
            <div class="info-right">
              <div><strong>Monday, 04 - Friday, 08 August 2025</strong></div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Tasks</th>
                <th>Notes</th>
                <th>Tool</th>
                <th>Priority</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map((day) =>
                  day.tasks
                    .map(
                      (task, index) => `
                  <tr class="task-row">
                    <td class="day-cell">${
                      index === 0 ? day.day + "<br/>" + day.date : ""
                    }</td>
                    <td>${task.name}</td>
                    <td>${task.notes}</td>
                    <td>${task.tool}</td>
                    <td>${task.priority}</td>
                    <td>${task.time}</td>
                    <td class="status-${task.status
                      .toLowerCase()
                      .replace(" ", "")}">${task.status}</td>
                  </tr>
                `
                    )
                    .join("")
                )
                .join("")}
            </tbody>
          </table>
          
          <div class="signatures">
            <div class="signature-section">
              <div class="signature-line"></div>
              <div>Head of Unit</div>
            </div>
            <div class="signature-section">
              <div class="signature-line"></div>
              <div>Head of Department</div>
            </div>
            <div class="signature-section">
              <div class="signature-line"></div>
              <div>Perm. Secretary</div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Write the HTML content to the new window
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for the content to load, then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  // mock up to download PDF
  const data = [
    {
      day: "Monday",
      date: "04/08/2025",
      tasks: [
        {
          name: "Review emails and prioritize audit task",
          notes: "Check for new requests or update",
          tool: "Outlook, Notion",
          priority: "Medium",
          time: "9:00am - 10:00am",
          status: "Completed",
        },
        {
          name: "Follow up on prior audit findings",
          notes: "Contact Finance and Procurement teams",
          tool: "Email, Excel",
          priority: "High",
          time: "10:00am - 12:00pm",
          status: "In progress",
        },
        {
          name: "Conduct risk assessment planning",
          notes: "Identify high risk areas for Q3 audit",
          tool: "Risk matrix, Google sheet",
          priority: "High",
          time: "01:00pm - 03:00pm",
          status: "Pending",
        },
      ],
    },
    {
      day: "Tuesday",
      date: "05/08/2025",
      tasks: [
        {
          name: "Field audit",
          notes: "Onsite review or via ERP",
          tool: "ERP system, Notepad",
          priority: "High",
          time: "9:00am - 11:00am",
          status: "Pending",
        },
        {
          name: "Interview key stakeholders",
          notes: "CFO and Accountant general",
          tool: "Google Meet, Voice Recorder",
          priority: "High",
          time: "11:00am - 01:00pm",
          status: "Pending",
        },
        {
          name: "Analyze evidence and collect transactions",
          notes: "Match with controls",
          tool: "Excel, Audit Software",
          priority: "High",
          time: "01:00pm - 03:00pm",
          status: "In progress",
        },
      ],
    },
    {
      day: "Wednesday",
      date: "06/08/2025",
      tasks: [
        {
          name: "Team alignment meeting",
          notes: "Discuss blockers, schedule check-in",
          tool: "Team, Miro",
          priority: "High",
          time: "9:00am - 11:00am",
          status: "Completed",
        },
        {
          name: "Review policies/ procedure compliance",
          notes: "Focus on Procurement & Travel policies",
          tool: "PDF reader, MS Word",
          priority: "Medium",
          time: "11:00am - 01:00pm",
          status: "In progress",
        },
        {
          name: "Analyze evidence and collect transactions",
          notes: "Draft audit report for Finance Department",
          tool: "Word, Excel",
          priority: "High",
          time: "01:00pm - 03:00pm",
          status: "Pending",
        },
      ],
    },
    {
      day: "Thursday",
      date: "07/08/2025",
      tasks: [
        {
          name: "Test control effectiveness (sampling)",
          notes: "Use random sample from 3 depts",
          tool: "Excel, Audit Software",
          priority: "High",
          time: "9:00am - 11:00am",
          status: "Pending",
        },
        {
          name: "Perform data analytics",
          notes: "Focus on duplicate payments",
          tool: "Excel, IDEA/ ACL",
          priority: "Medium",
          time: "1:00pm - 3:00pm",
          status: "Completed",
        },
        {
          name: "Continue report compilation",
          notes: "Add graphs & findings",
          tool: "Word, PowerPoint",
          priority: "Medium",
          time: "03:00pm - 04:30pm",
          status: "Pending",
        },
      ],
    },
    {
      day: "Friday",
      date: "08/08/2025",
      tasks: [
        {
          name: "Finalize and submit audit report",
          notes: "Send to supervisor and archive",
          tool: "Email, PDF",
          priority: "High",
          time: "9:00am - 11:00am",
          status: "Pending",
        },
        {
          name: "Review previous audit action items",
          notes: "Check what has been implemented",
          tool: "Trello, Sheets",
          priority: "Medium",
          time: "11:00am - 1:00pm",
          status: "Completed",
        },
        {
          name: "Staff development/ self-learning",
          notes: "Compliance course or audit webinar",
          tool: "LMS, YouTube",
          priority: "Low",
          time: "02:00pm - 04:00pm",
          status: "Pending",
        },
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600";
      case "in progress":
        return "text-blue-600";
      case "pending":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusDot = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "in progress":
        return "bg-blue-500";
      case "pending":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Add New Task
          </h1>

          <ProgressTracker currentDay={currentDay} days={DAYS} />

          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {currentDayName} Tasks
            </h2>

            {/* Task Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentTask.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note
                </label>
                <textarea
                  name="description"
                  value={currentTask.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                  rows="3"
                  placeholder="Enter task description"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tools
                  </label>
                  <input
                    type="text"
                    name="tools"
                    value={currentTask.tools}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                    placeholder="Required tools"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={currentTask.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <select
                      name="startTime"
                      value={currentTask.startTime}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flag-green"
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
                      value={currentTask.endTime}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flag-green"
                    >
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={currentTask.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Constraints
                </label>
                <input
                  type="text"
                  name="constraints"
                  value={currentTask.constraints}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flag-green"
                />
              </div>

              <button
                onClick={handleAddTask}
                className="w-full bg-flag-green text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-flag-green"
              >
                Add Task
              </button>
            </div>

            {/* Added Tasks */}
            {currentDayTasks.length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">
                  Added Tasks for {currentDayName}
                </h3>
                <div className="space-y-2">
                  {currentDayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                    >
                      <div>
                        <span className="font-medium">{task.title}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({task.priority} priority, {task.startTime} -{" "}
                          {task.endTime})
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveTask(task.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-end gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentDay === 0}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentDay === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                Previous
              </button>

              {currentDay === DAYS.length - 1 ? (
                <button
                  onClick={handleShowReview}
                  disabled={!canProceed()}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    canProceed()
                      ? "bg-flag-green text-white hover:bg-flag-green"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Review & Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    canProceed()
                      ? "bg-flag-green text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Proceed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0  bg-black/30 backdrop-opacity-20  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Review Weekly Tasks - {modalCurrentDayName}
                </h2>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Task List for Current Modal Day */}
              {modalCurrentDayTasks.length > 0 ? (
                <div className="space-y-4">
                  {modalCurrentDayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      {editingTask && editingTask.task.id === task.id ? (
                        /* Edit Form */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Task Title
                            </label>
                            <input
                              type="text"
                              value={editingTask.task.title}
                              onChange={(e) =>
                                handleEditTaskChange("title", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={editingTask.task.description}
                              onChange={(e) =>
                                handleEditTaskChange(
                                  "description",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows="3"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tools
                              </label>
                              <input
                                type="text"
                                value={editingTask.task.tools}
                                onChange={(e) =>
                                  handleEditTaskChange("tools", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Priority
                              </label>
                              <select
                                value={editingTask.task.priority}
                                onChange={(e) =>
                                  handleEditTaskChange(
                                    "priority",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Time
                              </label>
                              <select
                                value={editingTask.task.startTime}
                                onChange={(e) =>
                                  handleEditTaskChange(
                                    "startTime",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                value={editingTask.task.endTime}
                                onChange={(e) =>
                                  handleEditTaskChange(
                                    "endTime",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                Status
                              </label>
                              <select
                                value={editingTask.task.status}
                                onChange={(e) =>
                                  handleEditTaskChange("status", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveEditTask}
                              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Task Display */
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-medium text-gray-900">
                              {task.title}
                            </h4>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleEditTask(modalCurrentDayName, task)
                                }
                                className="text-flag-green hover:text-flag-green-dark text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleRemoveTaskFromModal(
                                    modalCurrentDayName,
                                    task.id
                                  )
                                }
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          {task.description && (
                            <p className="text-gray-600 mb-2">
                              {task.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>
                              Priority:{" "}
                              <span className="font-medium">
                                {task.priority}
                              </span>
                            </span>
                            <span>
                              Time:{" "}
                              <span className="font-medium">
                                {task.startTime} - {task.endTime}
                              </span>
                            </span>
                            <span>
                              Status:{" "}
                              <span className="font-medium">{task.status}</span>
                            </span>
                            {task.tools && (
                              <span>
                                Tools:{" "}
                                <span className="font-medium">
                                  {task.tools}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No tasks added for {modalCurrentDayName}
                </div>
              )}
            </div>

            {/* Modal Footer with Pagination */}
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-end  items-center">
                {/* Pagination */}
                <div className="flex gap-1">
                  {DAYS.map((day, index) => (
                    <button
                      key={day}
                      onClick={() => setModalCurrentDay(index)}
                      className={`w-10 h-10  text-sm font-medium ${
                        modalCurrentDay === index
                          ? "  rounded-md border border-flag-green text-gray-700"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Submit Button (only show on Friday - index 4) */}
                {modalCurrentDay === 4 && (
                  <button
                    onClick={handleFinalSubmit}
                    className="px-6 py-2 bg-flag-green text-white ml-2 rounded-md hover:bg-flag-green-dark font-medium"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showSubmittedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-opacity-50">
          <div className="bg-white item-center rounded-lg p-6 max-w-sm mx-auto grid place-items-center">
            <CircleCheck size={30} />
            <h2 className=" font-semibold m-4">New Work Plan Submitted</h2>

            <div className="">
              <button
                onClick={() => {
                  setShowSubmittedModal(false);
                  exportToPDF();
                  router.push("/weeklyplan");
                }}
                className="px-4 py-2 text-flag-green  rounded-md "
              >
                Download Work Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
