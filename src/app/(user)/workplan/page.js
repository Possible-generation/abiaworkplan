// "use client";

// import { useState, useMemo } from "react";
// import useTaskStore from "../../../store/taskStore";
// import TaskModal from "../../../components/taskmodal";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useRouter } from "next/navigation";

// export default function Tasks() {
//   const { getFilteredTasks, currentWeekCompleted, tasks } = useTaskStore();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTask, setEditingTask] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [priorityFilter, setPriorityFilter] = useState("all");
//   const router = useRouter();

//   const filteredTasks = useMemo(() => {
//     return tasks.filter((task) => {
//       // Date match filter
//       if (selectedDate) {
//         const taskDate = new Date(task.createdAt);
//         const selected = new Date(selectedDate);

//         if (
//           taskDate.getFullYear() !== selected.getFullYear() ||
//           taskDate.getMonth() !== selected.getMonth() ||
//           taskDate.getDate() !== selected.getDate()
//         ) {
//           return false;
//         }
//       }

//       // Status filter
//       if (statusFilter !== "all" && task.status !== statusFilter) return false;

//       // Priority filter
//       if (priorityFilter !== "all" && task.priority !== priorityFilter)
//         return false;

//       return true;
//     });
//   }, [tasks, selectedDate, statusFilter, priorityFilter]);

//   const handleEditTask = (task) => {
//     setEditingTask(task);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingTask(null);
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case "High":
//         return "bg-red-100 text-red-800";
//       case "Medium":
//         return "bg-yellow-100 text-yellow-800";
//       case "Low":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Complete":
//         return "bg-green-100 text-green-800";
//       case "In Progress":
//         return "bg-orange-100 text-orange-800";
//       case "Pending":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Week Tasks</h1>
//         <p className="text-gray-600 mt-2">
//           Manage your weekly tasks and schedule
//         </p>
//       </div>

//       {/* 📅 Calendar Filter */}
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">
//           📅 Filter by Date
//         </h3>
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholderText="Select a date"
//           isClearable
//         />
//       </div>

//       {/* 🎯 Filter Controls */}
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">
//           🧮 Filter Controls
//         </h3>
//         <div className="flex gap-6 justify-between">
//           {/* Task Status Filter */}
//           <div className="lg:flex grid gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Task Status Filter
//               </label>
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="all">All Tasks</option>
//                 <option value="Pending">Pending</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Complete">Complete</option>
//               </select>
//             </div>

//             {/* Priority Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Priority Filter
//               </label>
//               <select
//                 value={priorityFilter}
//                 onChange={(e) => setPriorityFilter(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="all">All Priorities</option>
//                 <option value="Low">Low</option>
//                 <option value="Medium">Medium</option>
//                 <option value="High">High</option>
//               </select>
//             </div>
//           </div>
//           {/* <div>
//             <div className="mb-6">
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-flag-green text-white px-6 py-3 rounded-lg font-medium hover:bg-flag-green-dark transition-colors inline-flex items-center"
//               >
//                 ➕ Add New Task
//               </button>
//             </div>
//           </div> */}

//           {/* Action Buttons */}
//           <div className="mt-6 flex space-x-4">
//             <button
//               onClick={() => router.push("/weeklyplan/addtask")}
//               disabled={currentWeekCompleted}
//               className={`px-4 py-2 rounded-md text-sm font-medium ${
//                 currentWeekCompleted
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//               }`}
//             >
//               Add New Task
//             </button>
//             {currentWeekCompleted && (
//               <button
//                 onClick={() => router.push("/reviewtasks")}
//                 className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
//               >
//                 Review Tasks
//               </button>
//             )}
//             {/* <button
//           onClick={() => setModalOpen(true)}
//           className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700"
//         >
//           Quick Add Task
//         </button> */}
//           </div>
//         </div>
//       </div>

//       {/* 📋 Tasks Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900">
//             📋 Tasks ({filteredTasks.length})
//           </h3>
//         </div>

//         {filteredTasks.length === 0 ? (
//           <div className="px-6 py-12 text-center">
//             <p className="text-gray-500 text-lg">
//               No tasks found matching your filters.
//             </p>
//             <p className="text-gray-400 mt-2">
//               Try adjusting your filters or add a new task.
//             </p>
//           </div>
//         ) : (
// <div className="overflow-x-auto">
//   <table className="min-w-full divide-y divide-gray-200">
//     <thead className="bg-gray-50">
//       <tr>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Day
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Task
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Description
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Tools
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Priority
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Time
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Status
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Action
//         </th>
//       </tr>
//     </thead>
//     <tbody className="bg-white divide-y divide-gray-200">
//       {filteredTasks.map((task) => (
//         <tr key={task.id} className="hover:bg-gray-50">
//           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//             {task.day}
//           </td>
//           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//             {task.title}
//           </td>
//           <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
//             {task.description}
//           </td>
//           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//             {task.tools}
//           </td>
//           <td className="px-6 py-4 whitespace-nowrap">
//             <span
//               className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
//                 task.priority
//               )}`}
//             >
//               {task.priority}
//             </span>
//           </td>
//           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//             {task.startTime} - {task.endTime}
//           </td>
//           <td className="px-6 py-4 whitespace-nowrap">
//             <span
//               className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                 task.status
//               )}`}
//             >
//               {task.status}
//             </span>
//           </td>
//           <td className="px-6 py-4 whitespace-nowrap text-sm">
//             <button
//               onClick={() => handleEditTask(task)}
//               className="text-blue-600 hover:text-blue-800 font-medium"
//             >
//               ✏️ Edit
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
//         )}
//       </div>

//       {/* Task Modal */}
//       <TaskModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         task={editingTask}
//       />
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useTaskStore } from "../../../store/taskStore";
// import TaskModal from "../../../components/taskModa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { PencilLine } from "lucide-react";

// export default function WeekTasksPage() {
//   const router = useRouter();
//   const [dateFilter, setDateFilter] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [priorityFilter, setPriorityFilter] = useState("all");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingTask, setEditingTask] = useState(null);
//   const { getFilteredTasks, hasCompletedWeeklyPlan } = useTaskStore();
//   const currentWeekCompleted = hasCompletedWeeklyPlan();

//   const filteredTasks = getFilteredTasks(
//     dateFilter,
//     statusFilter,
//     priorityFilter
//   );

//   const handleEditTask = (task) => {
//     setEditingTask(task);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setEditingTask(null);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "completed":
//         return " text-flag-green";
//       case "in-progress":
//         return " text-blue-800";
//       case "pending":
//         return " text-orange-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };
//   return (
//     <div className="px-4 sm:px-6 lg:px-8">
//       {/* Date Filtering Section */}
//       <div className="bg-white rounded-lg p-6 mb-6 flex justify-end">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4"></h3>
//         <DatePicker
//           selected={dateFilter}
//           onChange={(date) => setDateFilter(date)}
//           dateFormat="MMMM yyyy" // Displays as "August 2025"
//           showMonthYearPicker // Enables month + year picker
//           className=" rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-grey-300 border border-gray-300"
//           placeholderText="Select a month"
//           isClearable
//         />
//       </div>

//       <div className="mt-6 bg-white p-4  md:flex md:justify-between items-center">
//         <div className="flex space-x-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Filter by Status
//             </label>
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-none"
//             >
//               <option value="all">All Tasks</option>
//               <option value="pending">Pending</option>
//               <option value="in-progress">In Progress</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Sort by
//             </label>
//             <select
//               value={priorityFilter}
//               onChange={(e) => setPriorityFilter(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none outline-none focus:ring-none p-4"
//             >
//               <option value="all">All Priorities</option>
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </div>
//         </div>
//         <div className="mt-6 flex space-x-4">
//           <button
//             onClick={() => router.push("/weeklyplan/addtask")}
//             disabled={currentWeekCompleted}
//             className={`px-4 py-2 rounded-md text-sm font-medium ${
//               currentWeekCompleted
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-flag-green text-white hover:bg-blue-700"
//             }`}
//           >
//             Add New Task
//           </button>
//           {currentWeekCompleted && (
//             <button
//               onClick={() => router.push("/weeklyplan/reviewreport")}
//               className="px-4 py-2 bg-flag-green text-white rounded-md text-sm font-medium hover:bg-green-700"
//             >
//               Review Tasks
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Tasks Grid */}
//       <div className="mt-6">
//         {filteredTasks.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500">
//               No tasks found matching your filters.
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left  font-normal text-gray-500 uppercase tracking-wider">
//                     Day
//                   </th>
//                   <th className="px-6 py-3 text-left  font-normal text-gray-500 uppercase tracking-wider">
//                     Task
//                   </th>
//                   <th className="px-6 py-3 text-left font-normal text-gray-500 uppercase tracking-wider">
//                     Description
//                   </th>
//                   <th className="px-6 py-3 text-left  font-normal text-gray-500 uppercase tracking-wider">
//                     Tools
//                   </th>
//                   <th className="px-6 py-3 text-left  font-normal text-gray-500 uppercase tracking-wider">
//                     Priority
//                   </th>
//                   <th className="px-6 py-3 text-left  font-normal text-gray-500 uppercase tracking-wider">
//                     Time
//                   </th>
//                   <th className="px-6 py-3 text-left  font-normal text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-leftfont-normal text-gray-500 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredTasks.map((task) => (
//                   <tr key={task.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap font-normal text-gray-900">
//                       {task.day}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
//                       {task.title}
//                     </td>
//                     <td className="px-6 py-4 text-gray-700 max-w-xs truncate">
//                       {task.description}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap  text-gray-700">
//                       {task.tools}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {task.priority}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap  text-gray-700">
//                       {task.startTime} - {task.endTime}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 py-1 rounded-full font-normal ${getStatusColor(
//                           task.status
//                         )}`}
//                       >
//                         {task.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <button
//                         onClick={() => handleEditTask(task)}
//                         className="text-flag-green hover:text-flag-green border border-flag-green p-2 rounded-lg font-normal"
//                       >
//                         <PencilLine
//                           className="inline-block mr-1 text-flag-green"
//                           style={{ height: 18, width: 18 }}
//                         />
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//       <TaskModal
//         isOpen={modalOpen}
//         onClose={handleCloseModal}
//         task={editingTask}
//       />
//     </div>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTaskStore } from "../../../store/taskStore";
import TaskModal from "../../../components/taskModa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PencilLine } from "lucide-react";

function getCurrentWeekOfMonth() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const dayOfMonth = today.getDate();
  const dayOfWeek = firstDay.getDay();
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  return Math.ceil((dayOfMonth + offset) / 7);
}

export default function WeekTasksPage() {
  const router = useRouter();
  const [dateFilter, setDateFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const {
    getFilteredTasks,
    hasCompletedWeeklyPlan,
    getWeekDates,
    getAllTasks,
  } = useTaskStore();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeekOfMonth());
  const currentWeekCompleted = hasCompletedWeeklyPlan();
  const weekDates = getWeekDates();

  const filteredTasks = getFilteredTasks(
    dateFilter,
    statusFilter,
    priorityFilter
  );

  const allTasks = getAllTasks(); // For debugging

  // Debug log
  useEffect(() => {
    console.log("All tasks in week view:", allTasks);
    console.log("Filtered tasks:", filteredTasks);
    console.log("Date filter:", dateFilter);
    console.log("Week dates:", weekDates);
  }, [allTasks, filteredTasks, dateFilter, weekDates]);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return " text-flag-green";
      case "in-progress":
        return "text-blue-800";
      case "pending":
        return " text-orange-800";
      default:
        return " text-gray-800";
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      {/* Date Filtering Section */}
      <div className="bg-white rounded-lg p-6 mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Weekly Tasks</h2>
      </div>

      <div className="mt-6 bg-white p-4 md:flex grid place-content-center  md:justify-between items-center">
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-none"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Priority
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none appearance-flag-green focus:ring-none"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="mt-6 md:mt-0 flex space-x-4">
          <button
            onClick={() => router.push("/weeklyplan/addtask")}
            disabled={currentWeekCompleted}
            className={`px-4 py-2 rounded-md text-sm flex justify-center items-center  gap-2 font-medium ${
              currentWeekCompleted
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-flag-green text-white hover:bg-blue-700"
            }`}
          >
            <span className="hidden md:inline text-[30px]">+</span>
            Add New Task
          </button>
          {currentWeekCompleted && (
            <button
              onClick={() => router.push("/weeklyplan/reviewreport")}
              className="px-4 py-2 bg-flag-green text-white rounded-md text-sm font-medium hover:bg-green-700"
            >
              Review Tasks
            </button>
          )}
        </div>
      </div>

      <div className="md:flex justify-between items-center mb-8 bg-white p-4  rounded">
        <div className="mt-4 sm:mt-0 grid items-center space-y-2 mb-4 md:mb-0">
          <p className="text-sm">Month</p>
          <DatePicker
            selected={selectedMonth}
            onChange={(date) => {
              setSelectedMonth(date);
              setSelectedWeek(1); // Reset to week 1
            }}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className=" ">
          <div className="grid grid-cols-5 place-items-center item-center gap-3">
            {[1, 2, 3, 4].map((week) => (
              <button
                key={week}
                // i remove onclick function
                className={` font-meduim transition-colors ${
                  selectedWeek === week
                    ? "text-flag-green"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
              >
                Week {week}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="mt-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No tasks found matching your filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left  font-semibold tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-semibold tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left font-semibold tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left ffont-semibold  tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left  font-semibold tracking-wider">
                    Tools
                  </th>
                  <th className="px-6 py-3 text-left font-semibold tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left font-semibold tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left  font-semibold tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left font-semibold tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left font-semibold tracking-wider">
                    Constraints
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.date || "Not set"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {task.day}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                      {task.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {task.tools}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.priority || "Not set"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {task.startTime && task.endTime
                        ? `${task.startTime} - ${task.endTime}`
                        : "Not set"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status || "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="text-flag-green  hover:border hover:border-flag-green  px-3 py-1 rounded-lg  font-normal inline-flex items-center"
                      >
                        <PencilLine className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {task.constraints || "Not set"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        task={editingTask}
      />
    </div>
  );
}
