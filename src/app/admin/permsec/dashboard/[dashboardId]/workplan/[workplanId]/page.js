// "use client";

// import React, { useState } from "react";
// import { ChevronDown } from "lucide-react";

// export default function WeeklyPerformanceReview() {
//   const [activeWeek, setActiveWeek] = useState(1);
//   const [selectedMonth, setSelectedMonth] = useState("AUGUST");

//   const getStatusDot = (status) => {
//     switch (status) {
//       case "Completed":
//         return "bg-flag-green";
//       case "In progress":
//         return "bg-blue-800";
//       case "Pending":
//         return "bg-orange-500";
//       default:
//         return "bg-gray-800";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Completed":
//         return " text-flag-green ";
//       case "In progress":
//         return "text-blue-800";
//       case "Pending":
//         return " text-orange-800";
//       default:
//         return " text-gray-800";
//     }
//   };

//   const weeklyTasks = [
//     {
//       day: "Monday",
//       date: "04/08/2024",
//       tasks: "Review goals and priorities work tasks",
//       notes: "Check to-own response or update",
//       tool: "Outlook, Norton",
//       priority: "Medium",
//       time: "8:00am - 10:00am",
//       status: "Completed",
//       constraints: "",
//     },
//     {
//       day: "",
//       date: "",
//       tasks: "Follow up on daily work findings",
//       notes: "General finance and Procurement Admin",
//       tool: "Excel, Email",
//       priority: "High",
//       time: "11:00am - 12:00pm",
//       status: "Completed",

//       constraints: "",
//     },
//     {
//       day: "",
//       date: "",
//       tasks: "Conduct trial balancing audit recurring",
//       notes: "Monthly trial audit results for tax and preparation",
//       tool: "audit metrics and features",
//       priority: "High",
//       time: "2:00pm - 4:00pm",
//       status: "Pending",

//       constraints: "",
//     },
//     {
//       day: "Tuesday",
//       date: "05/08/2024",
//       tasks: "Field audit assignment",
//       notes: "Double review on HIS Excel reports",
//       tool: "pdf systems, HIS office",
//       priority: "High",
//       time: "8:00am - 10:00am",
//       status: "Pending",

//       constraints: "",
//     },
//     {
//       day: "",
//       date: "",
//       tasks: "Internal risk identification",
//       notes: "ZTI and information audit and fraud Measures",
//       tool: "Chargib solution",
//       priority: "High",
//       time: "11:00am - 1:00pm",
//       status: "Pending",

//       constraints: "",
//     },
//     {
//       day: "",
//       date: "",
//       tasks: "Analyse evidence and record transactions",
//       notes: "March and summary statistics",
//       tool: "Excel, Audit software",
//       priority: "High",
//       time: "2:00pm - 4:00pm",
//       status: "In progress",

//       constraints: "",
//     },
//     {
//       day: "Wednesday",
//       date: "07/08/2024",
//       tasks: "Team alignment meeting",
//       notes: "Discuss deadlines, conduct weekly audit schedule",
//       tool: "Teams, M-s office",
//       priority: "High",
//       time: "9:00am - 11:00am",
//       status: "Completed",

//       constraints: "",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-lg font-semibold text-gray-900">
//               Chucker Benedict
//             </h1>
//             <span>Internal Auditor</span>
//           </div>
//           <button className="bg-flag-green  hover:bg-flag-green-dark text-white px-6 py-4 rounded text-sm font-medium">
//             Performance Review
//           </button>
//         </div>

//         {/* Month and Week Selection */}
//         <div className="bg-white rounded-lg   mb-6">
//           <div className="p-4">
//             <div className="flex items-center space-x-6">
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm font-medium text-gray-700">Month</span>
//                 <div className="relative">
//                   <select
//                     value={selectedMonth}
//                     onChange={(e) => setSelectedMonth(e.target.value)}
//                     className="appearance-none bg-white border border-gray-200 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="AUGUST">AUGUST</option>
//                     <option value="JULY">JULY</option>
//                     <option value="SEPTEMBER">SEPTEMBER</option>
//                   </select>
//                   <ChevronDown
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={12}
//                   />
//                 </div>
//               </div>

//               {/* Week Tabs */}
//               <div className="flex space-x-1">
//                 {[1, 2, 3, 4].map((week) => (
//                   <button
//                     key={week}
//                     onClick={() => setActiveWeek(week)}
//                     className={`px-4 py-2 text-sm font-medium rounded ${
//                       activeWeek === week
//                         ? " text-flag-green"
//                         : " text-gray-600 "
//                     }`}
//                   >
//                     Week {week}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tasks Table */}
//         <div className="bg-white rounded-lg shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200 bg-gray-50">
//                   <th className="text-left px-4 py-3 font-bold text-gray-600">
//                     Day
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Tasks
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Notes
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Tool
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Priority
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Time
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Status
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Constraints
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {weeklyTasks.map((task, index) => (
//                   <tr
//                     key={index}
//                     className="border-b border-gray-100 hover:bg-gray-50 border-b"
//                   >
//                     <td className="px-4 py-3 ">
//                       {task.day && (
//                         <div>
//                           <div className="text-sm font-medium  text-gray-900">
//                             {task.day}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {task.date}
//                           </div>
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-4 border-b py-3 text-sm text-gray-900 max-w-xs">
//                       {task.tasks}
//                     </td>
//                     <td className="px-4  border-b py-3 text-sm text-gray-600 max-w-xs">
//                       {task.notes}
//                     </td>
//                     <td className="px-4 py-3 border-b text-sm text-gray-600 max-w-xs">
//                       {task.tool}
//                     </td>
//                     <td className="px-4 py-3 border-b">
//                       <span>{task.priority}</span>
//                     </td>
//                     <td className="px-4 py-3 border-b text-sm text-gray-600">
//                       {task.time}
//                     </td>
//                     <td className="px-4 py-3 border-b ">
//                       <div>
//                         <span
//                           className={`inline-block w-2.5 h-2.5 rounded-full ${getStatusDot(
//                             task.status
//                           )}`}
//                         ></span>
//                         <span
//                           className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                             task.status
//                           )}`}
//                         >
//                           {task.status}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 border-b text-sm text-gray-600">
//                       {task.constraints}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { ChevronDown } from "lucide-react";

// export default function WeeklyPerformanceReview() {
//   const [activeWeek, setActiveWeek] = useState(1);
//   const [isMonthOpen, setIsMonthOpen] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState("August");

//   const monthDropdownRef = useRef(null);
//   const isAnyDropdownOpen = isMonthOpen;
//   const monthOptions = [
//     { label: "January" },
//     { label: "February" },
//     { label: "March" },
//     { label: "April" },
//     { label: "May" },
//     { label: "June" },
//     { label: "July" },
//     { label: "August" },
//     { label: "September" },
//     { label: "October" },
//     { label: "November" },
//     { label: "December" },
//   ];
//   const handleMonthSelect = (month) => {
//     setSelectedMonth(month.label);
//     setIsMonthOpen(false);
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

//   const getStatusDot = (status) => {
//     switch (status) {
//       case "Completed":
//         return "bg-flag-green";
//       case "In progress":
//         return "bg-blue-800";
//       case "Pending":
//         return "bg-orange-500";
//       default:
//         return "bg-gray-800";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Completed":
//         return " text-flag-green ";
//       case "In progress":
//         return "text-blue-800";
//       case "Pending":
//         return " text-orange-800";
//       default:
//         return " text-gray-800";
//     }
//   };

//   const weeklyTasks = [
//     {
//       day: "Monday",
//       date: "04/08/2024",
//       tasks: "Review goals and priorities work tasks",
//       notes: "Check to-own response or update",
//       tool: "Outlook, Norton",
//       priority: "Medium",
//       time: "8:00am - 10:00am",
//       status: "Completed",
//       constraints: "",
//     },
//     {
//       day: "",
//       date: "",
//       tasks: "Follow up on daily work findings",
//       notes: "General finance and Procurement Admin",
//       tool: "Excel, Email",
//       priority: "High",
//       time: "11:00am - 12:00pm",
//       status: "Completed",

//       constraints: "",
//     },
//     {
//       day: "",
//       date: "",
//       tasks: "Conduct trial balancing audit recurring",
//       notes: "Monthly trial audit results for tax and preparation",
//       tool: "audit metrics and features",
//       priority: "High",
//       time: "2:00pm - 4:00pm",
//       status: "Pending",

//       constraints: "",
//     },
//     {
//       day: "Tuesday",
//       date: "05/08/2024",
//       tasks: "Field audit assignment",
//       notes: "Double review on HIS Excel reports",
//       tool: "pdf systems, HIS office",
//       priority: "High",
//       time: "8:00am - 10:00am",
//       status: "Pending",

//       constraints: "",
//     },
//     {
//       day: "",
//       date: "",
//       tasks: "Internal risk identification",
//       notes: "ZTI and information audit and fraud Measures",
//       tool: "Chargib solution",
//       priority: "High",
//       time: "11:00am - 1:00pm",
//       status: "Pending",

//       constraints: "",
//     },
//     {
//       day: "",
//       date: "",
//       tasks: "Analyse evidence and record transactions",
//       notes: "March and summary statistics",
//       tool: "Excel, Audit software",
//       priority: "High",
//       time: "2:00pm - 4:00pm",
//       status: "In progress",

//       constraints: "",
//     },
//     {
//       day: "Wednesday",
//       date: "07/08/2024",
//       tasks: "Team alignment meeting",
//       notes: "Discuss deadlines, conduct weekly audit schedule",
//       tool: "Teams, M-s office",
//       priority: "High",
//       time: "9:00am - 11:00am",
//       status: "Completed",

//       constraints: "",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-lg font-semibold text-gray-900">
//               Chucker Benedict
//             </h1>
//             <span>Internal Auditor</span>
//           </div>
//           <button className="bg-flag-green  hover:bg-flag-green-dark text-white px-6 py-4 rounded text-sm font-medium">
//             Performance Review
//           </button>
//         </div>

//         {/* Month and Week Selection */}
//         <div className="bg-white rounded-lg shadow-sm  mb-6">
//           <div className="p-4">
//             <div className="flex items-center space-x-6">
//               {/* Sort by Month Dropdown */}
//               <div className="relative " ref={monthDropdownRef}>
//                 <div className="relative" ref={monthDropdownRef}>
//                   <button
//                     onClick={() => {
//                       setIsMonthOpen(!isMonthOpen);
//                       setIsStatusOpen(false);
//                       setIsSortOpen(false);
//                     }}
//                     className="flex items-center justify-between w-32 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
//                   >
//                     <span className="text-gray-700">{selectedMonth}</span>
//                     <ChevronDown size={16} className="text-gray-400" />
//                   </button>

//                   {isMonthOpen && (
//                     <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                       {monthOptions.map((option, index) => (
//                         <button
//                           key={index}
//                           onClick={() => handleMonthSelect(option)}
//                           className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
//                             index === 0 ? "rounded-t-lg" : ""
//                           } ${
//                             index === monthOptions.length - 1
//                               ? "rounded-b-lg"
//                               : "border-b border-gray-100"
//                           } ${
//                             selectedMonth === option.label
//                               ? "bg-blue-50 text-flag-green"
//                               : "text-gray-700"
//                           }`}
//                         >
//                           {option.label}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Week Tabs */}
//               <div className="flex space-x-1">
//                 {[1, 2, 3, 4].map((week) => (
//                   <button
//                     key={week}
//                     onClick={() => setActiveWeek(week)}
//                     className={`px-4 py-2 text-sm font-medium rounded ${
//                       activeWeek === week
//                         ? " text-flag-green"
//                         : " text-gray-600 "
//                     }`}
//                   >
//                     Week {week}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tasks Table */}
//         <div className="bg-white rounded-lg shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200 bg-gray-50">
//                   <th className="text-left px-4 py-3 font-bold text-gray-600">
//                     Day
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Tasks
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Notes
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Tool
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Priority
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Time
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Status
//                   </th>
//                   <th className="text-left px-4 py-3  font-bold text-gray-600">
//                     Constraints
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {weeklyTasks.map((task, index) => (
//                   <tr
//                     key={index}
//                     className="border-b border-gray-100 hover:bg-gray-50 border-b"
//                   >
//                     <td className="px-4 py-3 ">
//                       {task.day && (
//                         <div>
//                           <div className="text-sm font-medium  text-gray-900">
//                             {task.day}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {task.date}
//                           </div>
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-4 border-b py-3 text-sm text-gray-900 max-w-xs">
//                       {task.tasks}
//                     </td>
//                     <td className="px-4  border-b py-3 text-sm text-gray-600 max-w-xs">
//                       {task.notes}
//                     </td>
//                     <td className="px-4 py-3 border-b text-sm text-gray-600 max-w-xs">
//                       {task.tool}
//                     </td>
//                     <td className="px-4 py-3 border-b">
//                       <span>{task.priority}</span>
//                     </td>
//                     <td className="px-4 py-3 border-b text-sm text-gray-600">
//                       {task.time}
//                     </td>

//                     <td className="px-4 py-3 border-b">
//                       <div className="flex items-center gap-2">
//                         <span
//                           className={`inline-block w-2.5 h-2.5 rounded-full ${getStatusDot(
//                             task.status
//                           )}`}
//                         ></span>
//                         <span
//                           className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                             task.status
//                           )}`}
//                         >
//                           {task.status}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="px-4 py-3 border-b text-sm text-gray-600">
//                       {task.constraints}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  SlidersHorizontal,
  ListFilter,
  Search,
  Filter,
  ChevronDown,
  CircleUserRound,
  CircleCheck,
  FilePlus2,
  UserRound,
  UserRoundX,
} from "lucide-react";
import useAdminPermsecDashboardStore from "../../../../../../../store/admin/useAdminPermsecDashboardStore";
import usePermsecTask from "../../../../../../../store/admin/usePermsecTask";
import { useRouter } from "next/navigation";

export default function StaffDashboard({ params }) {
  const router = useRouter();
  const [activeWeek, setActiveWeek] = useState(1);

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Role");
  const [selectedSort, setSelectedSort] = useState("Status");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const {
    staff,
    roles,
    unit,
    departmentName,
    user,
    PostStaff,
    fetchAdminDashboard,
  } = useAdminPermsecDashboardStore();

  const statusDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const monthDropdownRef = useRef(null);

  const { fetchStaffTasks } = usePermsecTask();

  const isAnyDropdownOpen = isStatusOpen || isSortOpen || isMonthOpen;

  const sortOptions = [
    { label: "Status" },
    { label: "Pending" },
    { label: "Approved" },
  ];

  const handleSortSelect = (sort) => {
    setSelectedSort(sort.label);
    setIsSortOpen(false);
  };

  useEffect(() => {
    fetchAdminDashboard();
  }, [fetchAdminDashboard]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        monthDropdownRef.current &&
        !monthDropdownRef.current.contains(event.target)
      ) {
        setIsMonthOpen(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
        setIsStatusOpen(false);
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setIsSortOpen(false);
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

  const getCurrentWeekOfMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    // First and last day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Day of month
    const dayOfMonth = now.getDate();

    // Calculate raw week number (calendar style)
    const weekNumber = Math.ceil((dayOfMonth + firstDay.getDay()) / 7);

    // Force maximum 4 weeks
    if (weekNumber <= 1) return "WEEK_1";
    if (weekNumber === 2) return "WEEK_2";
    if (weekNumber === 3) return "WEEK_3";
    return "WEEK_4"; // any 4th or 5th week gets merged here
  };
  const getCurrentMonth = () => {
    return new Date().toLocaleString("en-US", { month: "long" }).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {" "}
            {roles?.department} Department
          </h1>
          <span className="text-gray-600 font-bold text-xl">
            {roles?.unit} Unit
          </span>
        </div>
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm  mb-6">
          <div className="p-4">
            <div className="md:flex grid items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-600">
                <Filter size={16} />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              <div className="md:flex grid gap-4 items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="search staff"
                    className="pl-10 pr-4 py-2 border w-full border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-flag-green"
                  />
                </div>

                {/* Sort by Priority Dropdown */}
                <div className="relative ">
                  <div className="flex items-center space-x-4">
                    <div className="relative" ref={sortDropdownRef}>
                      <div className="relative">
                        <button
                          onClick={() => {
                            setIsSortOpen(!isSortOpen);
                            setIsStatusOpen(false);
                          }}
                          className="flex items-center justify-between w-32 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
                        >
                          <span className="text-gray-700">{selectedSort}</span>
                          <ChevronDown size={16} className="text-gray-400" />
                        </button>

                        {isSortOpen && (
                          <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            {sortOptions.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleSortSelect(option)}
                                className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                                  index === 0 ? "rounded-t-lg" : ""
                                } ${
                                  index === sortOptions.length - 1
                                    ? "rounded-b-lg"
                                    : "border-b border-gray-100"
                                } ${
                                  selectedSort === option.label
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-lg shadow-sm pt-10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-6 py-4 font-medium text-gray-600">
                    Staff Member
                  </th>
                  <th className="text-left px-6 py-4  font-medium text-gray-600">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-gray-600">
                    Submission
                  </th>
                  <th className="text-left px-6 py-4  font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {staff.map((staffs, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-gray-900">
                      {staffs?.employee_id}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{staffs?.role}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {/* {staffs.plans.length > 0
                        ? staffs.plans[0].created_at
                        : "-"} */}
                      {staffs.plans?.length > 0
                        ? new Date(
                            staffs.plans[0].created_at
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="px-6 py-4">
                      {/* <span
                        className={`inline-flex px-2 py-1 text-xs my-2 font-medium rounded-full ${staff.statusColor}`}
                      >
                        {staffs?.plans?.length > 0
                          ? staffs?.plans[0].approved
                          : "-"}
                      </span> */}
                      <span
                        className={`inline-flex px-2 py-1 my-2 font-medium rounded-full ${
                          staffs.plans?.[0]?.approved
                            ? " text-flag-green"
                            : " text-red-600"
                        }`}
                      >
                        {staffs.plans?.[0]?.approved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={async () => {
                          const payload = {
                            staff_id: String(staffs?.id),
                            unit_id: String(unit?.[0]?.id),
                            department_id: String(departmentName?.id),
                            month: String(getCurrentMonth()),
                            week: String(getCurrentWeekOfMonth()),
                          };

                          console.log("Sending payload:", payload);
                          await fetchStaffTasks(
                            staffs?.id,
                            departmentName?.id,
                            unit?.[0]?.id,
                            getCurrentMonth(),
                            getCurrentWeekOfMonth()
                          );
                          //  Send to backend
                          router.push(
                            `/admin/permsec/dashboard/${staffs?.id}/workplan/${departmentName?.id}/reviews/${unit?.[0]?.id}`
                          ); //  Navigate
                        }}
                        className="text-flag-green   font-medium  transition-colors cursor-pointer duration-150"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
