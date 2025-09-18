// // --------------------------------------------------------------------------------

// "use client";

// import React, { useState, useEffect, useRef, use } from "react";
// import { ChevronDown } from "lucide-react";
// import { useRouter } from "next/navigation";
// import usePermsecTask from "../../../../../../../../../store/admin/usePermsecTask";
// // import usehodReport from "../../../../../../../store/admin/usehodReport";

// export default function WeeklyPerformanceReview() {
//   const router = useRouter();
//   // const [activeWeek, setActiveWeek] = useState(0);
//   const [isMonthOpen, setIsMonthOpen] = useState(false);
//   // const [selectedMonth, setSelectedMonth] = useState("August");
//   const { tasks, loading, fetchStaffTasks, plans, staff } = usePermsecTask();
//   // const { fetchReport } = usehodReport();
//   const monthDropdownRef = useRef(null);
//   const isAnyDropdownOpen = isMonthOpen;
//   const monthOptions = [
//     { label: "JANUARY" },
//     { label: "FEBRUARY" },
//     { label: "MARCH" },
//     { label: "APRIL" },
//     { label: "MAY" },
//     { label: "JUNE" },
//     { label: "JULY" },
//     { label: "AUGUST" },
//     { label: "SEPTEMBER" },
//     { label: "OCTOBER" },
//     { label: "NOVEMBER" },
//     { label: "DECEMBER" },
//   ];

//   // const handlePerformanceReview = async () => {
//   //   try {
//   //     const staffId = plans[0]?.user_id || staff?.id;
//   //     const unitId = staff?.unit_id;

//   //     if (!staffId) {
//   //       console.error("No staff ID available");
//   //       return;
//   //     }

//   //     console.log("Generating performance report for:", {
//   //       staffId,
//   //       unitId,
//   //       month: selectedMonth,
//   //       week: activeWeek,
//   //     });

//   //     // Send data to backend
//   //     const response = await fetchReport(
//   //       staffId,
//   //       unitId,
//   //       selectedMonth,
//   //       activeWeek
//   //     );

//   //     if (response.success) {
//   //       // Navigate to performance review page after successful API call
//   //       console.log(
//   //         "Performance report generated frontend successfully:",
//   //         response.data
//   //       );

//   //       router.push(
//   //         `/admin/hodd/dashboard/${staffId}/workplan/${unitId}/reviews/${unitId}?month=${selectedMonth}&week=${activeWeek}`
//   //       );
//   //     }
//   //   } catch (error) {
//   //     console.error("Failed to generate performance report:", error);
//   //     // Optionally show user-friendly error message
//   //     alert("Failed to generate performance report. Please try again.");
//   //   }
//   // };

//   const getCurrentWeekOfMonth = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = now.getMonth();

//     // First and last day of month
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);

//     // Day of month
//     const dayOfMonth = now.getDate();

//     // Calculate raw week number (calendar style)
//     const weekNumber = Math.ceil((dayOfMonth + firstDay.getDay()) / 7);

//     // Force maximum 4 weeks
//     if (weekNumber <= 1) return "WEEK_1";
//     if (weekNumber === 2) return "WEEK_2";
//     if (weekNumber === 3) return "WEEK_3";
//     return "WEEK_4"; // any 4th or 5th week gets merged here
//   };
//   const getCurrentMonth = () => {
//     return new Date().toLocaleString("en-US", { month: "long" }).toUpperCase();
//   };

//   const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
//   const [activeWeek, setActiveWeek] = useState(getCurrentWeekOfMonth());

//   // Handle Month selection
//   const handleMonthSelect = (month) => {
//     setSelectedMonth(month.label);
//     setIsMonthOpen(false);
//     const staffId = plans[0]?.user_id || staff?.id; // Try multiple sources for staffId
//     const unitId = staff?.unit_id; // Fallback unit ID if not available
//     const departmentId = staff?.department_id; // Fallback department ID if not available

//     console.log(
//       "Selecting month:",
//       month.label,
//       "for staff:",
//       staffId,
//       "unit:",
//       unitId,
//       "department:",
//       departmentId,
//       "week:",
//       activeWeek
//     );
//     fetchStaffTasks(staffId, departmentId, unitId, month.label, activeWeek); // Use activeWeek as is (already in WEEK_X format)
//   };

//   // Handle Week selection
//   const handleWeekSelect = (week) => {
//     const weekString = `WEEK_${week}`; // Convert number to WEEK_X format
//     setActiveWeek(weekString);
//     const staffId = plans[0]?.user_id || staff?.id || "123"; // Try multiple sources for staffId
//     const unitId = staff?.unit_id || "defaultUnit"; // Fallback unit ID if not available
//     const departmentId = staff?.department_id || "defaultDepartment"; // Fallback department ID if not available

//     console.log(
//       "Selecting week:",
//       weekString,
//       "for staff:",
//       staffId,
//       "unit:",
//       unitId,
//       "department:",
//       departmentId,
//       "month:",
//       selectedMonth
//     );
//     fetchStaffTasks(staffId, departmentId, unitId, selectedMonth, weekString); // Always fetch fresh data
//   };

//   useEffect(() => {
//     // Only fetch on initial load with proper staff ID
//     const staffId = plans[0]?.user_id || staff?.id || "123";
//     const unitId = staff?.unit_id || "defaultUnit"; // Fallback unit ID if not available
//     const departmentId = staff?.department_id || "defaultDepartment"; // Fallback department ID if not available

//     console.log(
//       "Initial fetch for staff:",
//       staffId,
//       "month:",
//       selectedMonth,
//       "unit:",
//       unitId,
//       "department:",
//       departmentId,
//       "week:",
//       activeWeek
//     );
//     fetchStaffTasks(staffId, departmentId, unitId, selectedMonth, activeWeek);
//   }, [fetchStaffTasks]); // Remove dependencies to prevent infinite loops

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
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return "bg-flag-green";
//       case "in progress":
//       case "in_progress":
//         return "bg-blue-800";
//       case "pending":
//         return "bg-red-600";
//       default:
//         return "bg-gray-800";
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
//         return "text-red-600";
//       default:
//         return "text-gray-800";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-lg font-semibold text-gray-900">
//               {staff?.employee_id}
//             </h1>

//             <span>{staff?.role}</span>
//             <br></br>
//           </div>
//           {/* <button
//             // onClick={handlePerformanceReview}
//             disabled={loading}
//             className={`${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-flag-green hover:bg-flag-green-dark"
//             } text-white px-6 py-4 rounded text-sm font-medium transition-colors`}
//           >
//             {loading ? "Generating..." : "Performance Review"}
//           </button> */}
//         </div>

//         {/* Month and Week Selection */}
//         <div className="bg-white rounded-lg shadow-sm  mb-6">
//           <div className="p-4 ">
//             <div className="md:flex items-center  space-x-6">
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
//               <div className="flex  ">
//                 {[1, 2, 3, 4].map((week) => (
//                   <button
//                     key={week}
//                     onClick={() => handleWeekSelect(week)}
//                     className={`px-2 py-2 text-sm font-medium rounded ${
//                       activeWeek === `WEEK_${week}` // Compare with WEEK_X format
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
//             {loading ? (
//               // Loading state
//               <div className="flex items-center justify-center py-12">
//                 <div className="text-gray-500">Loading tasks...</div>
//               </div>
//             ) : tasks.length === 0 ? (
//               // No tasks found
//               <div className="flex flex-col items-center justify-center py-12">
//                 <div className="text-gray-500 text-lg mb-2">No tasks found</div>
//                 <div className="text-gray-400 text-sm">
//                   No tasks are scheduled for {selectedMonth} Week{" "}
//                   {activeWeek.replace("WEEK_", "")}
//                 </div>
//               </div>
//             ) : (
//               // Tasks table
//               <table className="min-w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-left py-3 px-4 font-semibold">Day</th>
//                     <th className="text-left py-3 px-4 font-semibold">Task</th>
//                     <th className="text-left py-3 px-4 font-semibold">
//                       Expected Outcome
//                     </th>
//                     {/* <th className="text-left py-3 px-4 font-semibold">Tools</th> */}
//                     <th className="text-left py-3 px-4 font-semibold">
//                       Priority
//                     </th>
//                     <th className="text-left py-3 px-4 font-semibold">Time</th>
//                     <th className="text-left py-3 px-4 font-semibold">
//                       Status
//                     </th>
//                     {/* <th className="text-left py-3 px-4 font-semibold">
//                       Constraints
//                     </th> */}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Object.entries(
//                     tasks.reduce((grouped, task) => {
//                       const dayKey = task.day || "Not set";
//                       if (!grouped[dayKey]) {
//                         grouped[dayKey] = [];
//                       }
//                       grouped[dayKey].push(task);
//                       return grouped;
//                     }, {})
//                   ).map(([day, dayTasks]) =>
//                     dayTasks.map((task, index) => (
//                       <tr
//                         key={task.id}
//                         className="border-b border-gray-100 hover:bg-gray-50"
//                       >
//                         {index === 0 ? (
//                           <td
//                             className="py-3 px-4 text-sm text-gray-900 border-b border-gray-600"
//                             rowSpan={dayTasks.length}
//                           >
//                             <div className="flex flex-col">
//                               <span className="font-medium">{day}</span>
//                               <span className="text-gray-600">
//                                 {task.date || "Not set"}
//                               </span>
//                             </div>
//                           </td>
//                         ) : null}
//                         <td className="px-6 py-4 text-sm  border-b border-gray-600 max-w-xs">
//                           <div
//                             className="truncate"
//                             title={task.title || task.name}
//                           >
//                             {task.title || task.name || "No title"}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-sm  max-w-xs border-b border-gray-600">
//                           <div
//                             className="truncate"
//                             title={task.description || task.notes}
//                           >
//                             {task.description || task.notes || "No description"}
//                           </div>
//                         </td>
//                         {/* <td className="py-3 px-4 text-sm border-b border-gray-600">
//                           {task.tools || task.tool || "Not set"}
//                         </td> */}
//                         <td className="py-3 px-4 text-sm border-b border-gray-600">
//                           {task.priority || "Not set"}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-b border-gray-600">
//                           {task.startTime && task.endTime
//                             ? `${task.startTime} - ${task.endTime}`
//                             : task.startTime || task.time || "Not set"}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap border-b border-gray-600">
//                           <div className="flex items-center">
//                             <span
//                               className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${getStatusDot(
//                                 task.status
//                               )}`}
//                             ></span>
//                             <span
//                               className={`text-xs font-medium ${getStatusColor(
//                                 task.status
//                               )}`}
//                             >
//                               {task.status || "Pending"}
//                             </span>
//                           </div>
//                         </td>
//                         {/* <td className="py-3 px-4 text-sm border-b border-gray-600">
//                           {task.constraints || "None"}
//                         </td> */}
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             )}
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
import useAdminHosDashboardStore from "../../../../../../../store/admin/useAdminHosDashboardStore";
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
