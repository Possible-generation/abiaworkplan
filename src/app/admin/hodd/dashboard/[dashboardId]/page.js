// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Search,
//   Filter,
//   ChevronDown,
//   CircleUserRound,
//   CircleCheck,
//   FilePlus2,
//   UserRound,
//   UserRoundX,
// } from "lucide-react";

// export default function StaffDashboard({ params }) {
//   const [activeWeek, setActiveWeek] = useState(1);
//   const [selectedMonth, setSelectedMonth] = useState("AUGUST");
//   const [isStatusOpen, setIsStatusOpen] = useState(false);
//   const [isSortOpen, setIsSortOpen] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState("Role");
//   const [selectedSort, setSelectedSort] = useState("Status");

//   const statusDropdownRef = useRef(null);
//   const sortDropdownRef = useRef(null);

//   const isAnyDropdownOpen = isStatusOpen || isSortOpen;
//   const statsData = [
//     {
//       title: "Number of Staff",
//       value: "09",
//       bgColor: "bg-blue-900",
//       textColor: "text-white",
//       icon: <CircleUserRound className="w-6 h-6" />,
//     },
//     {
//       title: "Approved Work Plans",
//       value: "06",
//       bgColor: "bg-flag-green",
//       textColor: "text-white",
//       icon: <CircleCheck className="w-6 h-6" />,
//     },
//     {
//       title: "Pending Work Plans",
//       value: "03",
//       bgColor: "bg-orange-400",
//       textColor: "text-white",
//       icon: <FilePlus2 className="w-6 h-6" />,
//     },
//     {
//       title: "Active Staff",
//       value: "06",
//       bgColor: "bg-blue-500",
//       textColor: "text-white",
//       icon: <UserRound className="w-6 h-6" />,
//     },
//     {
//       title: "Inactive Staff",
//       value: "03",
//       bgColor: "bg-red-500",
//       textColor: "text-white",
//       icon: <UserRoundX className="w-6 h-6" />,
//     },
//   ];

//   const staffData = [
//     {
//       name: "Chucker Benedict",
//       role: "Internal Auditor",
//       submission: "Aug 5, 2025",
//       status: "Approved",
//     },
//     {
//       name: "Chiamanm Gloria",
//       role: "Revenue Officer",
//       submission: "",
//       status: "Pending",
//     },
//     {
//       name: "Joshua Jacob",
//       role: "Accountant 1",
//       submission: "",
//       status: "Pending",
//     },
//     {
//       name: "Aku Destiny",
//       role: "Accountant 2",
//       submission: "Aug 5, 2025",
//       status: "Approved",
//     },
//     {
//       name: "Chelboere Joy",
//       role: "Payroll Officer",
//       submission: "Aug 5, 2025",
//       status: "Approved",
//     },
//     {
//       name: "Odinachi Amaka",
//       role: "Budget Officer",
//       submission: "",
//       status: "Pending",
//     },
//     {
//       name: "Chelboere Gloria",
//       role: "Treasury Officer",
//       submission: "Aug 5, 2025",
//       status: "Approved",
//     },
//   ];

//   // Status options for filtering tasks
//   const statusOptions = [
//     { label: "Role" },
//     { label: "Pending" },
//     { label: "In progress" },
//     { label: "Completed" },
//   ];

//   const sortOptions = [
//     { label: "Status" },
//     { label: "Pending" },
//     { label: "Approved" },
//   ];

//   const handleStatusSelect = (status) => {
//     setSelectedStatus(status.label);
//     setIsStatusOpen(false);
//   };

//   const handleSortSelect = (sort) => {
//     setSelectedSort(sort.label);
//     setIsSortOpen(false);
//   };

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         statusDropdownRef.current &&
//         !statusDropdownRef.current.contains(event.target) &&
//         sortDropdownRef.current &&
//         !sortDropdownRef.current.contains(event.target)
//       ) {
//         setIsStatusOpen(false);
//         setIsSortOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Close dropdowns on escape key
//   useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key === "Escape") {
//         setIsStatusOpen(false);
//         setIsSortOpen(false);
//       }
//     };

//     document.addEventListener("keydown", handleEscape);
//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800">
//           Ministry of Agriculture
//         </h1>
//         <span className="text-gray-600">
//           Finance & Accounts {params.dashboardId}
//         </span>
//       </div>
//       <div className="max-w-7xl mx-auto md:mt-20">
//         {/* Filter Section */}
//         <div className="bg-white rounded-lg shadow-sm  mb-6">
//           <div className="p-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2 text-gray-600">
//                 <Filter size={16} />
//                 <span className="text-sm font-medium">Filter by:</span>
//               </div>
//               <div className="flex items-center space-x-4 ">
//                 {/* Search */}
//                 <div className="relative">
//                   <Search
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={16}
//                   />
//                   <input
//                     type="text"
//                     placeholder="search staff"
//                     className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-flag-green"
//                   />
//                 </div>

//                 {/* Sort by Priority Dropdown */}
//                 <div className="relative z-20">
//                   <div className="flex items-center space-x-4">
//                     {/* Filter by Status Dropdown */}
//                     <div className="relative" ref={statusDropdownRef}>
//                       <div className="relative">
//                         <button
//                           onClick={() => {
//                             setIsStatusOpen(!isStatusOpen);
//                             setIsSortOpen(false);
//                           }}
//                           className="flex items-center justify-between w-40 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
//                         >
//                           <span className="text-gray-700">
//                             {selectedStatus}
//                           </span>
//                           <ChevronDown size={16} className="text-gray-400" />
//                         </button>

//                         {isStatusOpen && (
//                           <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                             {statusOptions.map((option, index) => (
//                               <button
//                                 key={index}
//                                 onClick={() => handleStatusSelect(option)}
//                                 className={`w-full flex items-center px-3 py-2 text-sm text-left hover:bg-gray-50 ${
//                                   index === 0 ? "rounded-t-lg" : ""
//                                 } ${
//                                   index === statusOptions.length - 1
//                                     ? "rounded-b-lg"
//                                     : "border-b border-gray-100"
//                                 } ${
//                                   selectedStatus === option.label
//                                     ? "bg-blue-50 text-flag-green"
//                                     : "text-gray-700"
//                                 }`}
//                               >
//                                 <span className="mr-2">{option.icon}</span>
//                                 {option.label}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Sort by Priority Dropdown */}
//                     <div className="relative">
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

//           {/* Month and Week Selection */}
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
//                         : " text-gray-600 hover:bg-gray-200"
//                     }`}
//                   >
//                     Week {week}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Staff Table */}
//         <div className="bg-white rounded-lg shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
//                     Staff Member
//                   </th>
//                   <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
//                     Role
//                   </th>
//                   <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
//                     Submission
//                   </th>
//                   <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
//                     Status
//                   </th>
//                   <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {staffData.map((staff, index) => (
//                   <tr
//                     key={index}
//                     className="border-b border-gray-200 hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {staff.name}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {staff.role}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {staff.submission}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${staff.statusColor}`}
//                       >
//                         {staff.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button className="text-flag-green hover:text-blue-800 text-sm font-medium">
//                         View Plan
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
// import { data } from "../../data/data";

// export default function StaffDashboard({ params }) {
//   const [activeWeek, setActiveWeek] = useState(1);

//   const [isStatusOpen, setIsStatusOpen] = useState(false);
//   const [isSortOpen, setIsSortOpen] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState("Role");
//   const [selectedSort, setSelectedSort] = useState("Status");
//   const [isMonthOpen, setIsMonthOpen] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState("August");

//   const statusDropdownRef = useRef(null);
//   const sortDropdownRef = useRef(null);
//   const monthDropdownRef = useRef(null);

//   const isAnyDropdownOpen = isStatusOpen || isSortOpen || isMonthOpen;

//   const staffData = [
//     {
//       name: "Chucker Benedict",
//       role: "Internal Auditor",
//       submission: "Aug 5, 2025",
//       status: "Approved",
//     },
//     {
//       name: "Chiamanm Gloria",
//       role: "Revenue Officer",
//       submission: "",
//       status: "Pending",
//     },
//     {
//       name: "Joshua Jacob",
//       role: "Accountant 1",
//       submission: "",
//       status: "Pending",
//     },
//     {
//       name: "Aku Destiny",
//       role: "Accountant 2",
//       submission: "Aug 5, 2025",
//       status: "Approved",
//     },
//     {
//       name: "Chelboere Joy",
//       role: "Payroll Officer",
//       submission: "Aug 5, 2025",
//       status: "Approved",
//     },
//     {
//       name: "Odinachi Amaka",
//       role: "Budget Officer",
//       submission: "",
//       status: "Pending",
//     },
//     {
//       name: "Chelboere Gloria",
//       role: "Treasury Officer",
//       submission: "Aug 5, 2025",
//       status: "Approved",
//     },
//   ];

//   // Status options for filtering tasks
//   const statusOptions = [
//     { label: "Role" },
//     { label: "Pending" },
//     { label: "In progress" },
//     { label: "Completed" },
//   ];

//   const sortOptions = [
//     { label: "Status" },
//     { label: "Pending" },
//     { label: "Approved" },
//   ];
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

//   const handleStatusSelect = (status) => {
//     setSelectedStatus(status.label);
//     setIsStatusOpen(false);
//   };

//   const handleSortSelect = (sort) => {
//     setSelectedSort(sort.label);
//     setIsSortOpen(false);
//   };
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

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">
//             {" "}
//             Finance & Account Department
//           </h1>
//           <span className="text-gray-600">
//             Audit Liaison Unit {params.dashboardId}
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
//                     {/* <div className="relative" ref={statusDropdownRef}>
//                       <div className="relative">
//                         <button
//                           onClick={() => {
//                             setIsStatusOpen(!isStatusOpen);
//                             setIsSortOpen(false);
//                           }}
//                           className="flex items-center justify-between w-40 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
//                         >
//                           <span className="text-gray-700">
//                             {selectedStatus}
//                           </span>
//                           <ChevronDown size={16} className="text-gray-400" />
//                         </button>

//                         {isStatusOpen && (
//                           <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                             {statusOptions.map((option, index) => (
//                               <button
//                                 key={index}
//                                 onClick={() => handleStatusSelect(option)}
//                                 className={`w-full flex items-center px-3 py-2 text-sm text-left hover:bg-gray-50 ${
//                                   index === 0 ? "rounded-t-lg" : ""
//                                 } ${
//                                   index === statusOptions.length - 1
//                                     ? "rounded-b-lg"
//                                     : "border-b border-gray-100"
//                                 } ${
//                                   selectedStatus === option.label
//                                     ? "bg-blue-50 text-flag-green"
//                                     : "text-gray-700"
//                                 }`}
//                               >
//                                 <span className="mr-2">{option.icon}</span>
//                                 {option.label}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div> */}

//                     {/* Sort by Priority Dropdown */}
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

//           {/* <div className="p-4">
//             <div className="md:flex grid items-center space-x-6">
//               <div className=" items-center space-x-2">
//                 <span className="text-sm font-medium text-gray-700 pl-5">
//                   Month
//                 </span>

//                 <div className="relative " ref={monthDropdownRef}>
//                   <div className="relative" ref={monthDropdownRef}>
//                     <button
//                       onClick={() => {
//                         setIsMonthOpen(!isMonthOpen);
//                         setIsStatusOpen(false);
//                         setIsSortOpen(false);
//                       }}
//                       className="flex items-center justify-between w-32 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
//                     >
//                       <span className="text-gray-700">{selectedMonth}</span>
//                       <ChevronDown size={16} className="text-gray-400" />
//                     </button>

//                     {isMonthOpen && (
//                       <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                         {monthOptions.map((option, index) => (
//                           <button
//                             key={index}
//                             onClick={() => handleMonthSelect(option)}
//                             className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
//                               index === 0 ? "rounded-t-lg" : ""
//                             } ${
//                               index === monthOptions.length - 1
//                                 ? "rounded-b-lg"
//                                 : "border-b border-gray-100"
//                             } ${
//                               selectedMonth === option.label
//                                 ? "bg-blue-50 text-flag-green"
//                                 : "text-gray-700"
//                             }`}
//                           >
//                             {option.label}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex space-x-1">
//                 {[1, 2, 3, 4].map((week) => (
//                   <button
//                     key={week}
//                     onClick={() => setActiveWeek(week)}
//                     className={`px-4 py-2 text-sm font-medium rounded ${
//                       activeWeek === week
//                         ? " text-flag-green"
//                         : " text-gray-600 hover:bg-gray-200"
//                     }`}
//                   >
//                     Week {week}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div> */}
//         </div>

//         {/* Staff Table */}
//         <div className="bg-white rounded-lg shadow-sm pt-10">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
//                     Staff Member
//                   </th>
//                   <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
//                     Role
//                   </th>
//                   <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
//                     Submission
//                   </th>
//                   <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
//                     Status
//                   </th>
//                   <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {staffData.map((staff, index) => (
//                   <tr
//                     key={index}
//                     className="border-b border-gray-200 hover:bg-gray-50"
//                   >
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {staff.name}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {staff.role}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {staff.submission}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`inline-flex px-2 py-1 text-xs my-2 font-medium rounded-full ${staff.statusColor}`}
//                       >
//                         {staff.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button className="text-flag-green hover:text-blue-800 text-sm font-medium">
//                         View Plan
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
import useAdminDashboardStore from "../../../../../store/admin/useAdminDashboardStore";
import usehodTask from "../../../../../store/admin/usehodTask";
import { useRouter } from "next/navigation";

export default function StaffDashboard({ params }) {
  const router = useRouter();
  const [activeWeek, setActiveWeek] = useState(1);

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Role");
  const [selectedSort, setSelectedSort] = useState("Status");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const { staff, roles, user, PostStaff, fetchAdminDashboard } =
    useAdminDashboardStore();

  const statusDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const monthDropdownRef = useRef(null);

  const { fetchStaffTasks } = usehodTask();

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
            {user?.department?.name} Department
          </h1>
          <span className="text-gray-600 font-bold text-xl">
            {staff?.[0]?.unit?.name} Unit
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
                            staff_id: staffs?.id,
                            unit_id: staffs?.unit_id,
                            month: getCurrentMonth(),
                            week: getCurrentWeekOfMonth(),
                          };

                          console.log("Sending payload:", payload);
                          await fetchStaffTasks(
                            payload.staff_id,
                            payload.unit_id,
                            payload.month,
                            payload.week
                          );
                          //  Send to backend
                          router.push(
                            `/admin/hodd/dashboard/${staffs?.unit_id}/workplan/${staffs.id}`
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
