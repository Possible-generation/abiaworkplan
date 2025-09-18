// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import {
//   SlidersHorizontal,
//   ListFilter,
//   Search,
//   Filter,
//   ChevronDown,
//   CircleUserRound,
//   CircleCheck,
//   FilePlus2,
//   UserRound,
//   UserRoundX,
// } from "lucide-react";
// import useAdminPermsecDashboardStore from "../../../../../../../store/admin/useAdminPermsecDashboardStore";
// import usePermsecTask from "../../../../../../../store/admin/usePermsecTask";
// import { useRouter } from "next/navigation";

// export default function StaffDashboard({ params }) {
//   const router = useRouter();
//   const [activeWeek, setActiveWeek] = useState(1);

//   const [isStatusOpen, setIsStatusOpen] = useState(false);
//   const [isSortOpen, setIsSortOpen] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState("Role");
//   const [selectedSort, setSelectedSort] = useState("Status");
//   const [isMonthOpen, setIsMonthOpen] = useState(false);
//   const {
//     staff,
//     roles,
//     unit,
//     departmentName,
//     user,
//     PostStaff,
//     fetchAdminDashboard,
//   } = useAdminPermsecDashboardStore();

//   const statusDropdownRef = useRef(null);
//   const sortDropdownRef = useRef(null);
//   const monthDropdownRef = useRef(null);

//   const { fetchStaffTasks } = usePermsecTask();

//   const isAnyDropdownOpen = isStatusOpen || isSortOpen || isMonthOpen;

//   const sortOptions = [
//     { label: "Status" },
//     { label: "Pending" },
//     { label: "Approved" },
//   ];

//   const handleSortSelect = (sort) => {
//     setSelectedSort(sort.label);
//     setIsSortOpen(false);
//   };

//   useEffect(() => {
//     fetchAdminDashboard();
//   }, [fetchAdminDashboard]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         monthDropdownRef.current &&
//         !monthDropdownRef.current.contains(event.target)
//       ) {
//         setIsMonthOpen(false);
//       }
//       if (
//         statusDropdownRef.current &&
//         !statusDropdownRef.current.contains(event.target)
//       ) {
//         setIsStatusOpen(false);
//       }
//       if (
//         sortDropdownRef.current &&
//         !sortDropdownRef.current.contains(event.target)
//       ) {
//         setIsSortOpen(false);
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

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">
//             {" "}
//             {roles?.department} Department
//           </h1>
//           <span className="text-gray-600 font-bold text-xl">
//             {roles?.unit} Unit
//           </span>
//         </div>
//         {/* Filter Section */}
//         <div className="bg-white rounded-lg shadow-sm  mb-6">
//           <div className="p-4">
//             <div className="md:flex grid items-center justify-between">
//               <div className="flex items-center space-x-2 text-gray-600">
//                 <Filter size={16} />
//                 <span className="text-sm font-medium">Filter by:</span>
//               </div>
//               <div className="md:flex grid gap-4 items-center space-x-4">
//                 {/* Search */}
//                 <div className="relative">
//                   <Search
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={16}
//                   />
//                   <input
//                     type="text"
//                     placeholder="search staff"
//                     className="pl-10 pr-4 py-2 border w-full border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-flag-green"
//                   />
//                 </div>

//                 {/* Sort by Priority Dropdown */}
//                 <div className="relative ">
//                   <div className="flex items-center space-x-4">
//                     <div className="relative" ref={sortDropdownRef}>
//                       <div className="relative">
//                         <button
//                           onClick={() => {
//                             setIsSortOpen(!isSortOpen);
//                             setIsStatusOpen(false);
//                           }}
//                           className="flex items-center justify-between w-32 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
//                         >
//                           <span className="text-gray-700">{selectedSort}</span>
//                           <ChevronDown size={16} className="text-gray-400" />
//                         </button>

//                         {isSortOpen && (
//                           <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                             {sortOptions.map((option, index) => (
//                               <button
//                                 key={index}
//                                 onClick={() => handleSortSelect(option)}
//                                 className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
//                                   index === 0 ? "rounded-t-lg" : ""
//                                 } ${
//                                   index === sortOptions.length - 1
//                                     ? "rounded-b-lg"
//                                     : "border-b border-gray-100"
//                                 } ${
//                                   selectedSort === option.label
//                                     ? "bg-blue-50 text-flag-green"
//                                     : "text-gray-700"
//                                 }`}
//                               >
//                                 {option.label}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Staff Table */}
//         <div className="bg-white rounded-lg shadow-sm pt-10">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left px-6 py-4 font-medium text-gray-600">
//                     Staff Member
//                   </th>
//                   <th className="text-left px-6 py-4  font-medium text-gray-600">
//                     Role
//                   </th>
//                   <th className="text-left px-6 py-4 font-medium text-gray-600">
//                     Submission
//                   </th>
//                   <th className="text-left px-6 py-4  font-medium text-gray-600">
//                     Status
//                   </th>
//                   <th className="text-left px-6 py-4 font-medium text-gray-600">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {staff.map((staffs, index) => (
//                   <tr
//                     key={index}
//                     className="border-b border-gray-200 hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4 text-gray-900">
//                       {staffs?.employee_id}
//                     </td>
//                     <td className="px-6 py-4 text-gray-600">{staffs?.role}</td>
//                     <td className="px-6 py-4 text-gray-600">
//                       {/* {staffs.plans.length > 0
//                         ? staffs.plans[0].created_at
//                         : "-"} */}
//                       {staffs.plans?.length > 0
//                         ? new Date(
//                             staffs.plans[0].created_at
//                           ).toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric",
//                           })
//                         : "-"}
//                     </td>
//                     <td className="px-6 py-4">
//                       {/* <span
//                         className={`inline-flex px-2 py-1 text-xs my-2 font-medium rounded-full ${staff.statusColor}`}
//                       >
//                         {staffs?.plans?.length > 0
//                           ? staffs?.plans[0].approved
//                           : "-"}
//                       </span> */}
//                       <span
//                         className={`inline-flex px-2 py-1 my-2 font-medium rounded-full ${
//                           staffs.plans?.[0]?.approved
//                             ? " text-flag-green"
//                             : " text-red-600"
//                         }`}
//                       >
//                         {staffs.plans?.[0]?.approved ? "Approved" : "Pending"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={async () => {
//                           const payload = {
//                             staff_id: String(staffs?.id),
//                             unit_id: String(unit?.[0]?.id),
//                             department_id: String(departmentName?.id),
//                             month: String(getCurrentMonth()),
//                             week: String(getCurrentWeekOfMonth()),
//                           };

//                           console.log("Sending payload:", payload);
//                           await fetchStaffTasks(
//                             staffs?.id,
//                             departmentName?.id,
//                             unit?.[0]?.id,
//                             getCurrentMonth(),
//                             getCurrentWeekOfMonth()
//                           );
//                           //  Send to backend
//                           router.push(
//                             `/admin/permsec/dashboard/${staffs?.id}/workplan/${departmentName?.id}/reviews/${unit?.[0]?.id}`
//                           ); //  Navigate
//                         }}
//                         className="text-flag-green   font-medium  transition-colors cursor-pointer duration-150"
//                       >
//                         View
//                       </button>
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

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  CircleUserRound,
  CircleCheck,
  FilePlus2,
  UserRound,
  UserRoundX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useAdminHosDashboardStore from "../../../../../../../store/admin/useAdminHosDashboardStore";
import { useRouter } from "next/navigation";

export default function StaffDashboard() {
  const router = useRouter();
  const [activeWeek, setActiveWeek] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("AUGUST");
  const [selectedRole, setSelectedRole] = useState("Hide");
  const [selectedStatus, setSelectedStatus] = useState("Show");
  const {
    user,
    analytics,
    unit,
    postUnit,
    departmentName,
    departmentunitlist,
    ministry,
    loading,
    error,
    fetchAdminDashboard,
  } = useAdminHosDashboardStore();

  useEffect(() => {
    fetchAdminDashboard();
  }, [fetchAdminDashboard]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto my-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Department of{" "}
          <span className="capitalize">{departmentName?.name}</span>
        </h1>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Staff Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-4 font-bold text-gray-600">
                    Unit{" "}
                  </th>
                  <th className="text-right px-6 py-4  font-bold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {departmentunitlist?.map((department) => (
                  <tr
                    key={department.id}
                    className="border-b border-gray-200 hover:bg-gray-200 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 border-b border-gray-200 text-gray-600">
                      {department.name}
                    </td>
                    <td className="px-6 py-4 text-right border-b border-gray-200">
                      <button
                        onClick={async () => {
                          const payload = {
                            department_id: departmentName?.id,
                            ministry_id: ministry?.id,
                            unit_id: department?.id,
                          };

                          await postUnit(
                            payload.department_id,
                            payload.ministry_id,
                            payload.unit_id
                          );

                          router.push(
                            `/admin/permsec/dashboard/${ministry?.id}/workplan/${departmentName?.id}/reviews/${department?.id}`
                          ); //  Navigate
                        }}
                        className="text-flag-green font-medium  transition-colors cursor-pointer duration-150"
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
