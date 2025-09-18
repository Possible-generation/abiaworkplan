// "use client";
// import { useState, useEffect, useRef } from "react";
// import useTaskFilterStore from "../../../store/useTaskFilterStore";
// import "react-datepicker/dist/react-datepicker.css";
// import { Calendar, ChevronDown, Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function DashboardPage() {
//   const router = useRouter();

//   // Use the same store as WeekTasksPage
//   const {
//     tasks,
//     loading,
//     error,
//     selectedWeek,
//     selectedMonth,
//     fetchTasks,
//     setWeek,
//     setMonth,
//     resetFilters,
//     currentWeekCompleted,
//   } = useTaskFilterStore();

//   // Local UI state
//   const [isMonthOpen, setIsMonthOpen] = useState(false);
//   const monthDropdownRef = useRef(null);

//   const monthOptions = [
//     { label: "January", value: "JANUARY" },
//     { label: "February", value: "FEBRUARY" },
//     { label: "March", value: "MARCH" },
//     { label: "April", value: "APRIL" },
//     { label: "May", value: "MAY" },
//     { label: "June", value: "JUNE" },
//     { label: "July", value: "JULY" },
//     { label: "August", value: "AUGUST" },
//     { label: "September", value: "SEPTEMBER" },
//     { label: "October", value: "OCTOBER" },
//     { label: "November", value: "NOVEMBER" },
//     { label: "December", value: "DECEMBER" },
//   ];

//   const weekOptions = [
//     { label: "Week 1", value: "WEEK_1" },
//     { label: "Week 2", value: "WEEK_2" },
//     { label: "Week 3", value: "WEEK_3" },
//     { label: "Week 4", value: "WEEK_4" },
//   ];

//   // Get display labels for selected values
//   const selectedMonthLabel =
//     monthOptions.find((opt) => opt.value === selectedMonth)?.label || "August";
//   const selectedWeekLabel =
//     weekOptions.find((opt) => opt.value === selectedWeek)?.label || "Week 1";

//   // Fetch tasks on component mount
//   useEffect(() => {
//     console.log("Dashboard component mounted, fetching initial tasks...");
//     fetchTasks();
//   }, []);

//   // Handle month selection
//   const handleMonthSelect = async (month) => {
//     setIsMonthOpen(false);
//     console.log("Month changed:", month.value);
//     setMonth(month.value);
//     try {
//       await fetchTasks({
//         statusFilter: "ALL",
//         priorityFilter: "ALL",
//         week: selectedWeek,
//         month: month.value,
//       });
//     } catch (error) {
//       console.error("Failed to change month:", error);
//     }
//   };

//   // Handle week selection
//   const handleWeekSelect = async (week) => {
//     console.log("Week changed from", selectedWeek, "to", week);
//     setWeek(week);
//     try {
//       await fetchTasks({
//         statusFilter: "ALL",
//         priorityFilter: "ALL",
//         week: week,
//         month: selectedMonth,
//       });
//       console.log("Tasks fetched for week:", week);
//     } catch (error) {
//       console.error("Failed to change week:", error);
//     }
//   };

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         monthDropdownRef.current &&
//         !monthDropdownRef.current.contains(event.target)
//       ) {
//         setIsMonthOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Close dropdowns on escape key
//   const handleKeyDown = (event) => {
//     if (event.key === "Escape") {
//       setIsMonthOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   // Calculate statistics from tasks
//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter(
//     (task) => task.status?.toLowerCase() === "completed"
//   ).length;
//   const inProgressTasks = tasks.filter(
//     (task) =>
//       task.status?.toLowerCase() === "in progress" ||
//       task.status?.toLowerCase() === "in_progress"
//   ).length;
//   const pendingTasks = tasks.filter(
//     (task) => task.status?.toLowerCase() === "pending" || !task.status
//   ).length;

//   const StatCard = ({ title, value }) => (
//     <div className="bg-white p-3 rounded">
//       <div className="text-center">
//         <p className="font-semibold">{title}</p>
//         <p className="text-gray-800">{value}</p>
//       </div>
//     </div>
//   );

//   const getStatusDot = (status) => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return "bg-flag-green";
//       case "in progress":
//       case "in_progress":
//         return "bg-blue-500";
//       case "pending":
//         return "bg-red-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return "text-flag-green";
//       case "in progress":
//       case "in_progress":
//         return "text-blue-800";
//       case "pending":
//         return "text-orange-800";
//       default:
//         return "text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-gray-100 md:px-10 px-4 py-6">
//       {/* Header */}
//       <div className="mb-8 flex flex-col sm:flex-row justify-between mt-6 md:items-center">
//         <h1 className="font-bold text-gray-900 bg-white p-4 rounded">
//           Welcome Back!!
//         </h1>
//         <button
//           onClick={() => router.push("/weeklyplan/addtask")}
//           disabled={
//             currentWeekCompleted ||
//             tasks.some((task) => task.week === selectedWeek)
//           } // ✅ Disable if tasks exist
//           className={`px-2 py-2 rounded-md text-sm flex justify-center items-center ${
//             currentWeekCompleted ||
//             tasks.some((task) => task.week === selectedWeek)
//               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//               : "bg-flag-green text-white hover:bg-green-700"
//           }`}
//         >
//           <span className="text-lg hidden md:block">+</span>
//           Add New Task
//         </button>
//       </div>

//       {/* Error Display */}
//       {error && (
//         <div className="mb-6 text-red-600 text-sm bg-red-50 px-3 py-2 rounded">
//           {error}
//         </div>
//       )}

//       {/* Statistics */}
//       <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
//         <StatCard title="Total Tasks Planned" value={totalTasks} />
//         <StatCard title="Tasks Completed" value={completedTasks} />
//         <StatCard title="In Progress" value={inProgressTasks} />
//         <StatCard title="Not Started" value={pendingTasks} />
//       </div>

//       {/* Week Buttons */}
//       <div className="md:flex gap-10 items-center mb-8 bg-white p-4 rounded">
//         <div className="mt-4 sm:mt-0 grid items-center space-y-2 mb-4 md:mb-0">
//           <p className="text-sm">Month</p>
//           <div className="relative" ref={monthDropdownRef}>
//             <button
//               onClick={() => setIsMonthOpen(!isMonthOpen)}
//               className="flex items-center justify-between w-32 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
//               disabled={loading}
//             >
//               <span className="text-gray-700">{selectedMonthLabel}</span>
//               <ChevronDown size={16} className="text-gray-400" />
//             </button>

//             {isMonthOpen && (
//               <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                 {monthOptions.map((option, index) => (
//                   <button
//                     key={option.value}
//                     onClick={() => handleMonthSelect(option)}
//                     className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
//                       index === 0 ? "rounded-t-lg" : ""
//                     } ${
//                       index === monthOptions.length - 1
//                         ? "rounded-b-lg"
//                         : "border-b border-gray-100"
//                     } ${
//                       selectedMonth === option.value
//                         ? "bg-blue-50 text-flag-green"
//                         : "text-gray-700"
//                     }`}
//                   >
//                     {option.label}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div>
//           <div className="grid grid-cols-4 gap-3">
//             {weekOptions.map((week) => (
//               <button
//                 key={week.value}
//                 onClick={() => handleWeekSelect(week.value)}
//                 disabled={loading}
//                 className={`font-bold transition-colors px-2 py-1 rounded ${
//                   selectedWeek === week.value
//                     ? "text-flag-green bg-green-50"
//                     : "text-gray-700 hover:bg-gray-300 disabled:opacity-50"
//                 }`}
//               >
//                 {week.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Task Table */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <Loader2 className="h-8 w-8 animate-spin text-flag-green" />
//             <span className="ml-2 text-gray-600">Loading tasks...</span>
//           </div>
//         ) : tasks.length === 0 ? (
//           <div className="text-center py-12">
//             <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500 text-lg">
//               No tasks for {selectedWeekLabel} of {selectedMonthLabel}.
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-3 px-4 font-semibold">Day</th>
//                   <th className="text-left py-3 px-4 font-semibold">Task</th>
//                   <th className="text-left py-3 px-4 font-semibold">
//                     Description
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold">Tools</th>
//                   <th className="text-left py-3 px-4 font-semibold">
//                     Priority
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold">Time</th>
//                   <th className="text-left py-3 px-4 font-semibold">Status</th>
//                   <th className="text-left py-3 px-4 font-semibold">
//                     Constraints
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tasks.map((task) => (
//                   <tr
//                     key={task.id}
//                     className="border-b border-gray-600 hover:bg-gray-50"
//                   >
//                     <td className="py-3 px-4 text-sm text-gray-900">
//                       <div className="flex flex-col">
//                         <span>{task.day || "Not set"}</span>
//                         <span>{task.date || "Not set"}</span>
//                       </div>
//                     </td>
//                     <td className="py-3 px-4 text-sm">
//                       {task.title || task.name}
//                     </td>
//                     <td className="py-3 px-4 text-sm">
//                       {task.description || task.notes}
//                     </td>
//                     <td className="py-3 px-4 text-sm">
//                       {task.tools || task.tool || "Not set"}
//                     </td>
//                     <td className="py-3 px-4 text-sm">
//                       {task.priority || "Not set"}
//                     </td>
//                     <td className="py-3 px-4 text-sm">
//                       {task.startTime || task.time || "Not set"}
//                     </td>
// <td className="px-6 py-4 whitespace-nowrap">
//   <div className="flex items-center">
//     <span
//       className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${getStatusDot(
//         task.status
//       )}`}
//     ></span>
//     <span
//       className={`text-xs font-medium ${getStatusColor(
//         task.status
//       )}`}
//     >
//       {task.status || "Pending"}
//     </span>
//   </div>
// </td>
//                     <td className="py-3 px-4 text-sm">
//                       {task.constraints || "None"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect, useRef } from "react";
import useTaskFilterStore from "../../../store/useTaskFilterStore";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  // Use the same store as WeekTasksPage
  const {
    tasks,
    loading,
    error,
    selectedWeek,
    selectedMonth,
    fetchTasks,
    setWeek,
    setMonth,
    resetFilters,
  } = useTaskFilterStore();

  // Local UI state
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const monthDropdownRef = useRef(null);

  const monthOptions = [
    { label: "January", value: "JANUARY" },
    { label: "February", value: "FEBRUARY" },
    { label: "March", value: "MARCH" },
    { label: "April", value: "APRIL" },
    { label: "May", value: "MAY" },
    { label: "June", value: "JUNE" },
    { label: "July", value: "JULY" },
    { label: "August", value: "AUGUST" },
    { label: "September", value: "SEPTEMBER" },
    { label: "October", value: "OCTOBER" },
    { label: "November", value: "NOVEMBER" },
    { label: "December", value: "DECEMBER" },
  ];

  const weekOptions = [
    { label: "Week 1", value: "WEEK_1" },
    { label: "Week 2", value: "WEEK_2" },
    { label: "Week 3", value: "WEEK_3" },
    { label: "Week 4", value: "WEEK_4" },
  ];

  // Get display labels for selected values
  const selectedMonthLabel =
    monthOptions.find((opt) => opt.value === selectedMonth)?.label || "August";
  const selectedWeekLabel =
    weekOptions.find((opt) => opt.value === selectedWeek)?.label || "Week 1";

  // Fetch tasks on component mount
  useEffect(() => {
    console.log("Dashboard component mounted, fetching initial tasks...");
    fetchTasks();
  }, []);

  // Handle month selection
  const handleMonthSelect = async (month) => {
    setIsMonthOpen(false);
    console.log("Month changed:", month.value);
    setMonth(month.value);
    try {
      await fetchTasks({
        statusFilter: "ALL",
        priorityFilter: "ALL",
        week: selectedWeek,
        month: month.value,
      });
    } catch (error) {
      console.error("Failed to change month:", error);
    }
  };

  // Handle week selection
  const handleWeekSelect = async (week) => {
    console.log("Week changed from", selectedWeek, "to", week);
    setWeek(week);
    try {
      await fetchTasks({
        statusFilter: "ALL",
        priorityFilter: "ALL",
        week: week,
        month: selectedMonth,
      });
      console.log("Tasks fetched for week:", week);
    } catch (error) {
      console.error("Failed to change week:", error);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        monthDropdownRef.current &&
        !monthDropdownRef.current.contains(event.target)
      ) {
        setIsMonthOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdowns on escape key
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsMonthOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Calculate statistics from tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status?.toLowerCase() === "completed"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) =>
      task.status?.toLowerCase() === "in progress" ||
      task.status?.toLowerCase() === "in_progress"
  ).length;
  const pendingTasks = tasks.filter(
    (task) => task.status?.toLowerCase() === "pending" || !task.status
  ).length;

  const StatCard = ({ title, value }) => (
    <div className="bg-white p-3 rounded">
      <div className="text-center">
        <p className="font-semibold">{title}</p>
        <p className="text-gray-800">{value}</p>
      </div>
    </div>
  );

  const getStatusDot = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-flag-green";
      case "in progress":
      case "in_progress":
        return "bg-blue-800";
      case "pending":
        return "bg-red-600";
      default:
        return "bg-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-flag-green";
      case "in progress":
      case "in_progress":
        return "text-blue-800";
      case "pending":
        return "text-red-600";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="bg-gray-100 md:px-10 px-4 py-6">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between mt-6 md:items-center">
        <h1 className="font-bold text-gray-900 bg-white p-4 rounded">
          Welcome Back!!
        </h1>
        <button
          onClick={() => router.push("/weeklyplan/addtask")}
          className="bg-flag-green text-white px-4 py-2 flex justify-center items-center gap-2 rounded-md hover:bg-flag-green-dark transition-colors duration-200"
        >
          <span className="hidden md:inline text-[30px]">+</span>
          Add New Task
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 text-red-600 text-sm bg-red-50 px-3 py-2 rounded">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard title="Total Tasks Planned" value={totalTasks} />
        <StatCard title="Tasks Completed" value={completedTasks} />
        <StatCard title="In Progress" value={inProgressTasks} />
        <StatCard title="Not Started" value={pendingTasks} />
      </div>

      {/* Week Buttons */}
      <div className="md:flex gap-10 items-center mb-8 bg-white p-4 rounded">
        <div className="mt-4 sm:mt-0 grid items-center space-y-2 mb-4 md:mb-0">
          <p className="text-sm">Month</p>
          <div className="relative" ref={monthDropdownRef}>
            <button
              onClick={() => setIsMonthOpen(!isMonthOpen)}
              className="flex items-center justify-between w-32 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
              disabled={loading}
            >
              <span className="text-gray-700">{selectedMonthLabel}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {isMonthOpen && (
              <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {monthOptions.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => handleMonthSelect(option)}
                    className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                      index === 0 ? "rounded-t-lg" : ""
                    } ${
                      index === monthOptions.length - 1
                        ? "rounded-b-lg"
                        : "border-b border-gray-100"
                    } ${
                      selectedMonth === option.value
                        ? "bg-blue-50 text-flag-green"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-4 gap-3">
            {weekOptions.map((week) => (
              <button
                key={week.value}
                onClick={() => handleWeekSelect(week.value)}
                disabled={loading}
                className={`font-bold transition-colors  py-1 rounded ${
                  selectedWeek === week.value
                    ? "text-flag-green bg-green-50"
                    : "text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                }`}
              >
                {week.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-flag-green" />
            <span className="ml-2 text-gray-600">Loading tasks...</span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No tasks for {selectedWeekLabel} of {selectedMonthLabel}.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Day</th>
                  <th className="text-left py-3 px-4 font-semibold">Task</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Description
                  </th>
                  {/* <th className="text-left py-3 px-4 font-semibold">Tools</th> */}
                  <th className="text-left py-3 px-4 font-semibold">
                    Priority
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  {/* <th className="text-left py-3 px-4 font-semibold">
                    Constraints
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  tasks.reduce((grouped, task) => {
                    const dayKey = task.day || "Not set";
                    if (!grouped[dayKey]) {
                      grouped[dayKey] = [];
                    }
                    grouped[dayKey].push(task);
                    return grouped;
                  }, {})
                ).map(([day, dayTasks]) =>
                  dayTasks.map((task, index) => (
                    <tr
                      key={task.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      {index === 0 ? (
                        <td
                          className="py-3 px-4 text-sm text-gray-900 border-b border-gray-600"
                          rowSpan={dayTasks.length}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{day}</span>
                            <span className="text-gray-600">
                              {task.date || "Not set"}
                            </span>
                          </div>
                        </td>
                      ) : null}
                      <td className="px-6 py-4 text-sm  border-b border-gray-600 max-w-xs">
                        <div
                          className="truncate"
                          title={task.title || task.name}
                        >
                          {task.title || task.name || "No title"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm  max-w-xs border-b border-gray-600">
                        <div
                          className="truncate"
                          title={task.description || task.notes}
                        >
                          {task.description || task.notes || "No description"}
                        </div>
                      </td>
                      {/* <td className="py-3 px-4 text-sm border-b border-gray-600">
                        {task.tools || task.tool || "Not set"}
                      </td> */}
                      <td className="py-3 px-4 text-sm border-b border-gray-600">
                        {task.priority || "Not set"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-b border-gray-600">
                        {task.startTime && task.endTime
                          ? `${task.startTime} - ${task.endTime}`
                          : task.startTime || task.time || "Not set"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-600">
                        <div className="flex items-center">
                          <span
                            className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${getStatusDot(
                              task.status
                            )}`}
                          ></span>
                          <span
                            className={`text-xs font-medium ${getStatusColor(
                              task.status
                            )}`}
                          >
                            {task.status || "Pending"}
                          </span>
                        </div>
                      </td>
                      {/* <td className="py-3 px-4 text-sm border-b border-gray-600">
                        {task.constraints || "None"}
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
