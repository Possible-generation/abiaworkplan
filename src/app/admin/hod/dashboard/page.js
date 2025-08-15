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

// export default function StaffDashboard() {
//   const [activeWeek, setActiveWeek] = useState(1);
//   // const [selectedMonth, setSelectedMonth] = useState("AUGUST");
//   // const [selectedRole, setSelectedRole] = useState("Hide");

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
//     {
//       title: "Total plan submitted",
//       value: "12",
//       bgColor: "bg-gray-300",
//       textColor: "text-gray-800",
//       icon: <SlidersHorizontal className="w-6 h-6" />,
//     },
//     {
//       title: "late Suubmission",
//       value: "12",
//       bgColor: "bg-gray-300",
//       textColor: "text-gray-800",
//       icon: <SlidersHorizontal className="w-6 h-6" />,
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
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-5 space-x-2 gap-2 mb-8">
//           {statsData.map((stat, index) => (
//             <div
//               key={index}
//               className={`${stat.bgColor} ${stat.textColor} grid place-items-center px-6 py-4 rounded-lg`}
//             >
//               <div className="flex items-center space-x-2">{stat.icon}</div>
//               <div className="text-sm opacity-90 text-center">{stat.title}</div>
//               <div className="text-2xl font-bold">{stat.value}</div>
//             </div>
//           ))}
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

//           {/* Month and Week Selection */}
//           <div className="p-4">
//             <div className="md:flex grid items-center space-x-6">
//               <div className=" items-center space-x-2">
//                 <span className="text-sm font-medium text-gray-700 pl-5">
//                   Month
//                 </span>

//                 {/* Sort by Month Dropdown */}
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

export default function StaffDashboard() {
  const [activeWeek, setActiveWeek] = useState(1);

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Role");
  const [selectedSort, setSelectedSort] = useState("Status");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("August");

  const statusDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const monthDropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const statsData = [
    {
      title: "Number of Staff",
      value: "09",
      bgColor: "bg-blue-900",
      textColor: "text-white",
      icon: <CircleUserRound className="w-6 h-6" />,
    },
    {
      title: "Approved Work Plans",
      value: "06",
      bgColor: "bg-flag-green",
      textColor: "text-white",
      icon: <CircleCheck className="w-6 h-6" />,
    },
    {
      title: "Pending Work Plans",
      value: "03",
      bgColor: "bg-orange-400",
      textColor: "text-white",
      icon: <FilePlus2 className="w-6 h-6" />,
    },
    {
      title: "Active Staff",
      value: "06",
      bgColor: "bg-blue-500",
      textColor: "text-white",
      icon: <UserRound className="w-6 h-6" />,
    },
    {
      title: "Inactive Staff",
      value: "03",
      bgColor: "bg-red-500",
      textColor: "text-white",
      icon: <UserRoundX className="w-6 h-6" />,
    },
    {
      title: "Total Plan Submitted",
      value: "12",
      bgColor: "bg-gray-600",
      textColor: "text-white",
      icon: <FilePlus2 className="w-6 h-6" />,
    },
    {
      title: "Late Submission",
      value: "12",
      bgColor: "bg-purple-500",
      textColor: "text-white",
      icon: <FilePlus2 className="w-6 h-6" />,
    },
  ];

  const staffData = [
    {
      name: "Chucker Benedict",
      role: "Internal Auditor",
      submission: "Aug 5, 2025",
      status: "Approved",
    },
    {
      name: "Chiamanm Gloria",
      role: "Revenue Officer",
      submission: "",
      status: "Pending",
    },
    {
      name: "Joshua Jacob",
      role: "Accountant 1",
      submission: "",
      status: "Pending",
    },
    {
      name: "Aku Destiny",
      role: "Accountant 2",
      submission: "Aug 5, 2025",
      status: "Approved",
    },
    {
      name: "Chelboere Joy",
      role: "Payroll Officer",
      submission: "Aug 5, 2025",
      status: "Approved",
    },
    {
      name: "Odinachi Amaka",
      role: "Budget Officer",
      submission: "",
      status: "Pending",
    },
    {
      name: "Chelboere Gloria",
      role: "Treasury Officer",
      submission: "Aug 5, 2025",
      status: "Approved",
    },
  ];

  const statusOptions = [
    { label: "Role" },
    { label: "Pending" },
    { label: "In progress" },
    { label: "Completed" },
  ];

  const sortOptions = [
    { label: "Status" },
    { label: "Pending" },
    { label: "Approved" },
  ];

  const monthOptions = [
    { label: "January" },
    { label: "February" },
    { label: "March" },
    { label: "April" },
    { label: "May" },
    { label: "June" },
    { label: "July" },
    { label: "August" },
    { label: "September" },
    { label: "October" },
    { label: "November" },
    { label: "December" },
  ];

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status.label);
    setIsStatusOpen(false);
  };

  const handleSortSelect = (sort) => {
    setSelectedSort(sort.label);
    setIsSortOpen(false);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month.label);
    setIsMonthOpen(false);
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

  // Initialize scroll position check
  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards with Scroll */}
        <div className="relative mb-8">
          {/* Left scroll button */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 hidden transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg border ${
              canScrollLeft
                ? "text-gray-700 hover:bg-gray-50"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right scroll button */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 hidden transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg border ${
              canScrollRight
                ? "text-gray-700 hover:bg-gray-50"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <ChevronRight size={20} />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4  py-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitScrollbar: { display: "none" },
            }}
          >
            {statsData.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} ${stat.textColor} flex-shrink-0 w-48 grid place-items-center px-2 py-4 rounded-lg`}
              >
                <div className="flex items-center space-x-2">{stat.icon}</div>
                <div className="text-sm opacity-90 text-center">
                  {stat.title}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
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

                {/* Dropdowns */}
                <div className="">
                  <div className="flex items-center space-x-4">
                    {/* Filter by Status Dropdown */}
                    <div className="relative" ref={statusDropdownRef}>
                      <div className="relative">
                        <button
                          onClick={() => {
                            setIsStatusOpen(!isStatusOpen);
                            setIsSortOpen(false);
                            setIsMonthOpen(false);
                          }}
                          className="flex items-center justify-between w-40 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
                        >
                          <span className="text-gray-700">
                            {selectedStatus}
                          </span>
                          <ChevronDown size={16} className="text-gray-400" />
                        </button>

                        {isStatusOpen && (
                          <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            {statusOptions.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleStatusSelect(option)}
                                className={`w-full flex items-center px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                                  index === 0 ? "rounded-t-lg" : ""
                                } ${
                                  index === statusOptions.length - 1
                                    ? "rounded-b-lg"
                                    : "border-b border-gray-100"
                                } ${
                                  selectedStatus === option.label
                                    ? " bg-green-50 text-flag-green"
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

                    {/* Sort Dropdown */}
                    <div className="relative" ref={sortDropdownRef}>
                      <div className="relative">
                        <button
                          onClick={() => {
                            setIsSortOpen(!isSortOpen);
                            setIsStatusOpen(false);
                            setIsMonthOpen(false);
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
                                    ? "bg-green-50 text-flag-green"
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

          {/* Month and Week Selection */}
          <div className="p-4">
            <div className="md:flex grid items-center space-x-6">
              <div className="items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 pl-5">
                  Month
                </span>

                {/* Month Dropdown */}
                <div className="relative" ref={monthDropdownRef}>
                  <div className="relative">
                    <button
                      onClick={() => {
                        setIsMonthOpen(!isMonthOpen);
                        setIsStatusOpen(false);
                        setIsSortOpen(false);
                      }}
                      className="flex items-center justify-between w-32 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
                    >
                      <span className="text-gray-700">{selectedMonth}</span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>

                    {isMonthOpen && (
                      <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {monthOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleMonthSelect(option)}
                            className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                              index === 0 ? "rounded-t-lg" : ""
                            } ${
                              index === monthOptions.length - 1
                                ? "rounded-b-lg"
                                : "border-b border-gray-100"
                            } ${
                              selectedMonth === option.label
                                ? "bg-green-50 text-flag-green"
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

              {/* Week Tabs */}
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((week) => (
                  <button
                    key={week}
                    onClick={() => setActiveWeek(week)}
                    className={`px-4 py-2 text-sm font-medium rounded ${
                      activeWeek === week
                        ? "text-flag-green"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Week {week}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Staff Table */}

        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                    Staff Member
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                    Submission
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {staffData.map((staff, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {staff.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {staff.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {staff.submission}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs my-2 font-medium rounded-full ${staff.statusColor}`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-flag-green hover:text-blue-800 text-sm font-medium">
                        View Plan
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
