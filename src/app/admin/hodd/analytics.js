// "use client";

// import React, { useState, useEffect } from "react";

// // Staff data for the new heatmap
// const staffData = [
//   {
//     name: "Chukwu Benedict",
//     role: "Internal Auditor",
//     weeklyPerformance: [91, 95, 88, 92, 89, 94, 90, 93, 96, 88, 91, 94],
//     overall: 91,
//     efficiency: 89,
//   },
//   {
//     name: "Chinonso Gloria",
//     role: "Revenue Officer",
//     weeklyPerformance: [83, 72, 85, 78, 81, 79, 77, 82, 75, 80, 84, 76],
//     overall: 83,
//     efficiency: 81,
//   },
//   {
//     name: "Joshua Jacob",
//     role: "Accountant 1",
//     weeklyPerformance: [95, 92, 94, 96, 93, 91, 97, 94, 92, 95, 93, 96],
//     overall: 95,
//     efficiency: 94,
//   },
//   {
//     name: "Abu Destiny",
//     role: "Accountant 2",
//     weeklyPerformance: [68, 65, 71, 69, 67, 70, 66, 72, 69, 68, 71, 67],
//     overall: 68,
//     efficiency: 71,
//   },
//   {
//     name: "Chidiebere Joy",
//     role: "Payroll Officer",
//     weeklyPerformance: [92, 89, 94, 91, 93, 90, 95, 92, 88, 94, 91, 93],
//     overall: 92,
//     efficiency: 90,
//   },
//   {
//     name: "Osinachi Amaka",
//     role: "",
//     weeklyPerformance: [51, 65, 68, 64, 59, 62, 56, 61, 67, 63, 58, 66],
//     overall: 61,
//     efficiency: 60,
//   },
// ];

// // Color mapping functions
// const getPerformanceColor = (value) => {
//   if (value < 60) return "bg-red-500"; // Red for less than 60
//   if (value >= 60 && value < 70) return "bg-blue-500"; // Blue for 60-69
//   if (value >= 70 && value < 80) return "bg-yellow-500"; // Yellow for 70-79
//   if (value >= 80 && value < 90) return "bg-green-300"; // Green for 80-89
//   return "bg-green-500"; // Green for 90+
// };

// const getOverallBadgeColor = (value) => {
//   if (value < 60) return "bg-red-100 text-red-800";
//   if (value >= 60 && value < 70) return "bg-blue-100 text-blue-800";
//   if (value >= 70 && value < 80) return "bg-yellow-100 text-yellow-800";
//   if (value >= 80 && value < 90) return "bg-orange-100 text-orange-800";
//   return "bg-green-100 text-green-800";
// };

// const getEfficiencyBadgeColor = (value) => {
//   if (value < 60) return "bg-red-100 text-red-800";
//   if (value >= 60 && value < 70) return "bg-blue-100 text-blue-800";
//   if (value >= 70 && value < 80) return "bg-yellow-100 text-yellow-800";
//   if (value >= 80 && value < 90) return "bg-orange-100 text-orange-800";
//   return "bg-green-100 text-green-800";
// };

// // Mock data for other components
// const mockData = {
//   performanceMetrics: [
//     { name: "Jan", current: 85, previous: 0, color: "orange" },
//     { name: "Feb", current: 90, previous: 0, color: "green" },
//     { name: "Mar", current: 88, previous: 0, color: "green" },
//     { name: "Apr", current: 92, previous: 0, color: "green" },
//     { name: "May", current: 65, previous: 0, color: "orange" },
//     { name: "Jun", current: 85, previous: 0, color: "green" },
//     { name: "Jul", current: 94, previous: 0, color: "green" },
//     { name: "Aug", current: 89, previous: 0, color: "green" },
//   ],

//   teamPerformance: [
//     { name: "Team A", current: 75, previous: 0, color: "dark-green" },
//     { name: "Team B", current: 85, previous: 0, color: "dark-green" },
//     { name: "Team C", current: 92, previous: 0, color: "dark-green" },
//     { name: "Team D", current: 78, previous: 0, color: "dark-green" },
//     { name: "Team E", current: 68, previous: 0, color: "dark-green" },
//     { name: "Team F", current: 82, previous: 0, color: "dark-green" },
//     { name: "Team G", current: 88, previous: 0, color: "dark-green" },
//     { name: "Team H", current: 75, previous: 0, color: "dark-green" },
//   ],
// };

// // Staff Performance Heatmap Component (New Design)
// const StaffPerformanceHeatmap = () => {
//   return (
//     <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//       {/* Header */}
//       <div className="p-6 border-b border-gray-200">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Performance Heatmap
//         </h2>
//         <p className="text-gray-600">
//           Weekly performance visualization across all staff members
//         </p>
//       </div>

//       {/* Legend */}
//       <div className="p-4 bg-gray-50 border-b border-gray-200">
//         <div className="flex items-center space-x-6">
//           <span className="text-sm font-medium text-gray-700">
//             Performance Scale:
//           </span>
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 bg-red-500 rounded"></div>
//               <span className="text-sm text-gray-600">&lt; 60%</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 bg-blue-500 rounded"></div>
//               <span className="text-sm text-gray-600">60-69%</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 bg-yellow-500 rounded"></div>
//               <span className="text-sm text-gray-600">70-79%</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 bg-green-300 rounded"></div>
//               <span className="text-sm text-gray-600">80-89%</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 bg-green-500 rounded"></div>
//               <span className="text-sm text-gray-600">90%+</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table Header */}
//       <div className="border-b border-gray-200 p-4 bg-gray-50">
//         <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-700">
//           <div className="col-span-3">Staff Member</div>
//           <div className="col-span-6 text-center">
//             Weekly Performance (Last 12 weeks)
//           </div>
//           <div className="col-span-1 text-center">Overall</div>
//           <div className="col-span-1 text-center">Efficiency</div>
//           <div className="col-span-1"></div>
//         </div>
//       </div>

//       {/* Heatmap Rows */}
//       <div className="divide-y divide-gray-100">
//         {staffData.map((staff, index) => (
//           <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
//             <div className="grid grid-cols-12 gap-4 items-center">
//               {/* Staff Info */}
//               <div className="col-span-3">
//                 <div className="font-medium text-gray-900">{staff.name}</div>
//                 <div className="text-sm text-gray-500">{staff.role}</div>
//               </div>

//               {/* Weekly Performance Dots */}
//               <div className="col-span-6">
//                 <div className="flex justify-center space-x-1">
//                   {staff.weeklyPerformance.map((performance, weekIndex) => (
//                     <div
//                       key={weekIndex}
//                       className={`w-6 h-6 rounded ${getPerformanceColor(
//                         performance
//                       )} cursor-pointer transition-transform hover:scale-110`}
//                       title={`Week ${weekIndex + 1}: ${performance}%`}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Overall Performance */}
//               <div className="col-span-1 flex justify-center">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-medium ${getOverallBadgeColor(
//                     staff.overall
//                   )}`}
//                 >
//                   {staff.overall}%
//                 </span>
//               </div>

//               {/* Efficiency */}
//               <div className="col-span-1 flex justify-center">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-medium ${getEfficiencyBadgeColor(
//                     staff.efficiency
//                   )}`}
//                 >
//                   {staff.efficiency}%
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Bar Chart Component
// const BarChart = ({ data, title, subtitle, showLegend = false }) => {
//   const maxValue = Math.max(...data.map((d) => d.current));

//   const getBarColor = (color) => {
//     switch (color) {
//       case "orange":
//         return "bg-orange-400";
//       case "green":
//         return "bg-green-500";
//       case "dark-green":
//         return "bg-green-700";
//       default:
//         return "bg-green-500";
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-sm">
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
//         <p className="text-sm text-gray-500">{subtitle}</p>
//       </div>

//       {showLegend && (
//         <div className="flex items-center space-x-6 mb-6 text-sm">
//           <div className="flex items-center space-x-2">
//             <div className="w-3 h-3 bg-green-500 rounded"></div>
//             <span className="text-gray-700">Current Period</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-3 h-3 bg-orange-400 rounded"></div>
//             <span className="text-gray-700">Previous Period</span>
//           </div>
//         </div>
//       )}

//       <div className="h-64 flex items-end justify-between space-x-2">
//         {data.map((item, index) => (
//           <div key={index} className="flex flex-col items-center flex-1">
//             <div className="w-full flex justify-center items-end h-48 mb-3">
//               <div
//                 className={`w-8 ${getBarColor(
//                   item.color
//                 )} rounded-t transition-all duration-300 hover:opacity-80`}
//                 style={{
//                   height: `${(item.current / maxValue) * 100}%`,
//                   minHeight: "4px",
//                 }}
//                 title={`${item.name}: ${item.current}%`}
//               />
//             </div>
//             <span className="text-xs text-gray-600 text-center font-medium">
//               {item.name}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Contribution Graph Component
// const ContributionGraph = () => {
//   return (
//     <div className="space-y-8">
//       {/* Individual Performance Analysis */}
//       <BarChart
//         data={mockData.performanceMetrics}
//         title="Individual Performance Analysis"
//         subtitle="Monthly performance tracking with comparative analysis"
//         showLegend={true}
//       />

//       {/* Team Performance */}
//       <BarChart
//         data={mockData.teamPerformance}
//         title="Team Performance"
//         subtitle="Comparative team analysis across departments"
//       />
//     </div>
//   );
// };

// // Main Analytics Component
// const Analytics = () => {
//   const [data] = useState(mockData);
//   const [loading, setLoading] = useState(false);
//   const [activeView, setActiveView] = useState("staff-heatmap"); // Only staff heatmap and graphs

//   useEffect(() => {
//     // Simulate data fetching
//     const fetchData = async () => {
//       setLoading(true);
//       setTimeout(() => {
//         setLoading(false);
//       }, 1000);
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <div className="text-lg text-gray-600">Loading analytics...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="p-6 bg-gray-50 border-t border-gray-200">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="bg-white rounded-lg text-center p-4 shadow-sm">
//             <div className="text-2xl ">6</div>
//             <div className="text-sm text-gray-600">Total Staff Members</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 text-center shadow-sm">
//             <div className="text-2xl ">85%</div>
//             <div className="text-sm text-gray-600">Average Performance</div>
//           </div>

//           <div className="bg-white rounded-lg p-4 text-center shadow-sm">
//             <div className="text-2xl">83%</div>
//             <div className="text-sm text-gray-600">Efficiency Rate</div>
//           </div>
//         </div>
//       </div>
//       {/* Toggle Buttons */}
//       <div className="flex space-x-2 mb-8">
//         <button
//           onClick={() => setActiveView("staff-heatmap")}
//           className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//             activeView === "staff-heatmap"
//               ? " text-flag-green"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           Staff Performance Heatmap
//         </button>
//         <button
//           onClick={() => setActiveView("graph")}
//           className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//             activeView === "graph"
//               ? " text-flag-green"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           Contribution Graph
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="space-y-8">
//         {/* Conditional Rendering */}
//         {activeView === "staff-heatmap" && <StaffPerformanceHeatmap />}
//         {activeView === "graph" && <ContributionGraph />}
//       </div>
//     </div>
//   );
// };

// export default Analytics;

"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useAnalyticsStore } from "../../../../store/admin/hod/hodanalytics";
import { useIndividualAnalytics } from "../../../../store/admin/hod/hodanalyticsset";
// Staff data for the new heatmap
const staffData = [
  {
    name: "Chukwu Benedict",
    role: "Internal Auditor",
    weeklyPerformance: [91, 95, 88, 92, 89, 94, 90, 93, 96, 88, 91, 94],
    overall: 91,
    efficiency: 89,
  },
  {
    name: "Chinonso Gloria",
    role: "Revenue Officer",
    weeklyPerformance: [83, 72, 85, 78, 81, 79, 77, 82, 75, 80, 84, 76],
    overall: 83,
    efficiency: 81,
  },
  {
    name: "Joshua Jacob",
    role: "Accountant 1",
    weeklyPerformance: [95, 92, 94, 96, 93, 91, 97, 94, 92, 95, 93, 96],
    overall: 95,
    efficiency: 94,
  },
  {
    name: "Abu Destiny",
    role: "Accountant 2",
    weeklyPerformance: [68, 65, 71, 69, 67, 70, 66, 72, 69, 68, 71, 67],
    overall: 68,
    efficiency: 71,
  },
  {
    name: "Chidiebere Joy",
    role: "Payroll Officer",
    weeklyPerformance: [92, 89, 94, 91, 93, 90, 95, 92, 88, 94, 91, 93],
    overall: 92,
    efficiency: 90,
  },
  {
    name: "Osinachi Amaka",
    role: "",
    weeklyPerformance: [51, 65, 68, 64, 59, 62, 56, 61, 67, 63, 58, 66],
    overall: 61,
    efficiency: 60,
  },
];

// Color mapping functions
const getPerformanceColor = (value) => {
  if (value < 60) return "bg-red-500"; // Red for less than 60
  if (value >= 60 && value < 70) return "bg-blue-500"; // Blue for 60-69
  if (value >= 70 && value < 80) return "bg-yellow-500"; // Yellow for 70-79
  if (value >= 80 && value < 90) return "bg-green-300"; // Green for 80-89
  return "bg-green-500"; // Green for 90+
};

const getOverallBadgeColor = (value) => {
  if (value < 60) return "bg-red-100 text-red-800";
  if (value >= 60 && value < 70) return "bg-blue-100 text-blue-800";
  if (value >= 70 && value < 80) return "bg-yellow-100 text-yellow-800";
  if (value >= 80 && value < 90) return "bg-orange-100 text-orange-800";
  return "bg-green-100 text-green-800";
};

const getEfficiencyBadgeColor = (value) => {
  if (value < 60) return "bg-red-100 text-red-800";
  if (value >= 60 && value < 70) return "bg-blue-100 text-blue-800";
  if (value >= 70 && value < 80) return "bg-yellow-100 text-yellow-800";
  if (value >= 80 && value < 90) return "bg-orange-100 text-orange-800";
  return "bg-green-100 text-green-800";
};

// Individual Performance Analysis Component
const IndividualPerformanceAnalysis = () => {
  const [selectedName, setSelectedName] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const { staff, fetchAnalytics } = useAnalyticsStore();

  const {
    loading,
    completedWeekTasksPercents,
    completedMonthTasksPercents,
    fetchHouAnalytics,
  } = useIndividualAnalytics();

  useEffect(() => {
    fetchAnalytics(); // load staff on mount
  }, [fetchAnalytics]);

  useEffect(() => {
    if (selectedName) {
      fetchHouAnalytics({
        staff_id: selectedName,
        month: selectedMonth, // can be null
      });
    }
  }, [selectedName, selectedMonth, fetchHouAnalytics]);

  // const handleSelect = (value) => {
  //   setSelectedName(value);
  //   console.log("Selected staff ID:", value);
  // };
  const handleSelect = (staff_id) => {
    setSelectedName(staff_id);
    console.log("Selected staff ID:", staff_id);

    // fetch analytics for this staff
    fetchHouAnalytics({ staff_id });
  };
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

  // ✅ Transform API data for charts
  const performanceData = completedMonthTasksPercents.map((m) => ({
    month: m.month.slice(0, 3), // "JANUARY" → "JAN"
    value: m.completedTaskPercent,
  }));

  const tasksData = completedWeekTasksPercents.map((w) => ({
    week: w.week.replace("_", " "), // "WEEK_1" → "WEEK 1"
    value: w.completedTaskPercent,
  }));

  const CustomDropdown = ({ value, options, onChange, placeholder }) => {
    const [open, setOpen] = useState(false);

    const selectedLabel =
      options.find((opt) => opt.value === value)?.label || placeholder;

    return (
      <div className="relative w-full">
        {/* Dropdown button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 focus:outline-none"
        >
          <span className="text-gray-700">{selectedLabel}</span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>

        {/* Dropdown options */}
        {open && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow">
            {options.length > 0 ? (
              options.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  {opt.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                No staff available
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const PerformanceChart = ({ data, title, subtitle }) => {
    const max = 100;
    const chartHeight = 240;

    return (
      <div className="bg-white rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        <div className="relative">
          {/* Y-axis labels */}
          <div
            className="absolute -left-8 flex flex-col justify-between text-xs text-gray-400"
            style={{ height: chartHeight }}
          >
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          {/* Chart container */}
          <div className="ml-4">
            <div
              className="flex items-end justify-start gap-6"
              style={{ height: chartHeight }}
            >
              {data.map((item, index) => {
                const height = (item.value / max) * chartHeight;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`${getPerformanceColor(
                        item.value
                      )} rounded-sm w-8 transition-all duration-300 hover:opacity-80`}
                      style={{ height: `${height}px`, minHeight: "2px" }}
                      title={`${item.month}: ${item.value}%`}
                    />
                  </div>
                );
              })}
            </div>
            {/* X-axis labels */}
            <div className="flex items-start justify-start gap-6 mt-2">
              {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-8">
                  <span className="text-xs text-gray-600 text-center">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BarChart = ({ data, title, subtitle, maxValue = null }) => {
    const max = maxValue || Math.max(...data.map((item) => item.value));
    const chartHeight = 160;

    return (
      <div className="bg-white rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        <div className="relative">
          {/* Y-axis labels */}
          <div
            className="absolute -left-8 flex flex-col justify-between text-xs text-gray-400"
            style={{ height: chartHeight }}
          >
            <span>{max}</span>
            <span>{Math.round(max * 0.75)}</span>
            <span>{Math.round(max * 0.5)}</span>
            <span>{Math.round(max * 0.25)}</span>
            <span>0</span>
          </div>

          {/* Chart container */}
          <div className="ml-4">
            <div
              className="flex items-end justify-start gap-6"
              style={{ height: chartHeight }}
            >
              {data.map((item, index) => {
                const height = (item.value / max) * chartHeight;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="bg-green-500 rounded-sm w-8 transition-all duration-300 hover:opacity-80"
                      style={{ height: `${height}px`, minHeight: "2px" }}
                      title={`${item.week}: ${item.value}`}
                    />
                  </div>
                );
              })}
            </div>
            {/* X-axis labels */}
            <div className="flex items-start justify-start gap-6 mt-2">
              {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-8">
                  <span className="text-xs text-gray-600 text-center">
                    {item.week}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Individual Performance Analysis
        </h1>
        <p className="text-gray-600">
          Select a staff member to view detailed performance comparison
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-100">
            <CustomDropdown
              value={selectedName}
              placeholder="Select Name"
              options={staff.map((s) => ({
                label: s.employee_id, // shown in dropdown
                value: s.user_id, // stored value
              }))}
              onChange={handleSelect}
            />
          </div>
          <div className="w-1/2">
            <CustomDropdown
              value={selectedMonth}
              placeholder="Select Month"
              options={monthOptions}
              onChange={setSelectedMonth}
            />
          </div>
        </div>
      </div>

      {loading && <p>Loading analytics...</p>}

      {!loading && selectedName && (
        <>
          {/* Performance Comparison Chart */}
          <PerformanceChart
            data={performanceData}
            title="Monthly Performance"
            subtitle="Completed task percentage per month"
          />

          {/* Weekly Bar Chart */}
          <BarChart
            data={tasksData}
            title="Weekly Performance"
            subtitle="Completed task percentage per week"
          />
        </>
      )}

      {/* Performance Comparison Chart */}
      {/* <div className="mb-6">
        <PerformanceChart
          data={performanceData}
          title="Performance Comparison"
          subtitle=""
        />
      </div> */}

      {/* Bottom Charts */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
        <BarChart
          data={tasksData}
          title="Tasks Completed"
          subtitle="Weekly task completion trend"
          maxValue={20}
        />

     
        <BarChart
          data={hoursData}
          title="Hours Worked"
          subtitle="Weekly hours allocation"
          maxValue={40}
        />
      </div> */}
    </div>
  );
};

// Staff Performance Heatmap Component
const StaffPerformanceHeatmap = () => {
  const { staff, fetchAnalytics, loading } = useAnalyticsStore();
  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);
  if (loading) return <p>Loading staff data...</p>;
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Performance Heatmap
        </h2>
        <p className="text-gray-600">
          Weekly performance visualization across all staff members
        </p>
      </div>

      {/* Legend */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium text-gray-700">
            Performance Scale:
          </span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">&lt; 60%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">60-69%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm text-gray-600">70-79%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-300 rounded"></div>
              <span className="text-sm text-gray-600">80-89%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">90%+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-700">
          <div className="col-span-3">Staff Member</div>
          <div className="col-span-6 text-center">
            Weekly Performance (Last 12 weeks)
          </div>
          <div className="col-span-1 text-center">Overall</div>
          <div className="col-span-1 text-center">Efficiency</div>
          <div className="col-span-1"></div>
        </div>
      </div>

      {/* Heatmap Rows */}
      {/* <div className="divide-y divide-gray-100">
        {staffData.map((staff, index) => (
          <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="grid grid-cols-12 gap-4 items-center">
          
              <div className="col-span-3">
                <div className="font-medium text-gray-900">{staff.name}</div>
                <div className="text-sm text-gray-500">{staff.role}</div>
              </div>

              
              <div className="col-span-6">
                <div className="flex justify-center space-x-1">
                  {staff.weeklyPerformance.map((performance, weekIndex) => (
                    <div
                      key={weekIndex}
                      className={`w-6 h-6 rounded ${getPerformanceColor(
                        performance
                      )} cursor-pointer transition-transform hover:scale-110`}
                      title={`Week ${weekIndex + 1}: ${performance}%`}
                    />
                  ))}
                </div>
              </div>

           
              <div className="col-span-1 flex justify-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getOverallBadgeColor(
                    staff.overall
                  )}`}
                >
                  {staff.overall}%
                </span>
              </div>

            
              <div className="col-span-1 flex justify-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getEfficiencyBadgeColor(
                    staff.efficiency
                  )}`}
                >
                  {staff.efficiency}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      {/* Heatmap Rows */}
      <div className="divide-y divide-gray-100">
        {staff.map((member, index) => (
          <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Staff Info */}
              <div className="col-span-3">
                <div className="font-medium text-gray-900">
                  {member.employee_id}
                </div>
                <div className="text-sm text-gray-500">{member.role}</div>
              </div>

              {/* Weekly Performance Dots */}
              <div className="col-span-6">
                <div className="flex justify-center space-x-1">
                  {member.heatmap?.map((performance, weekIndex) => (
                    <div
                      key={weekIndex}
                      className={`w-6 h-6 rounded ${getPerformanceColor(
                        performance
                      )} cursor-pointer transition-transform hover:scale-110`}
                      title={`Week ${weekIndex + 1}: ${performance}%`}
                    />
                  ))}
                </div>
              </div>

              {/* Overall Performance */}
              <div className="col-span-1 flex justify-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getOverallBadgeColor(
                    member.overall
                  )}`}
                >
                  {member.overall}%
                </span>
              </div>

              {/* Efficiency */}
              <div className="col-span-1 flex justify-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getEfficiencyBadgeColor(
                    member.efficiency
                  )}`}
                >
                  {member.efficiency}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contribution Graph Component (Updated)
const ContributionGraph = () => {
  return (
    <div className="space-y-8">
      <IndividualPerformanceAnalysis />
    </div>
  );
};

// Main Analytics Component
const Analytics = () => {
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState("staff-heatmap");

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const { fetchAnalytics, analytics } = useAnalyticsStore();
  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading analytics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg text-center p-4 shadow-sm">
            <div className="text-2xl ">{analytics?.staffNo}</div>
            <div className=" text-gray-600">Number of Staff</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl ">{analytics?.completionRate}</div>
            <div className=" text-gray-600">Average Performance</div>
          </div>

          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl">{analytics?.highPerformanceStaff}</div>
            <div className="text-gray-600">High Performance</div>
          </div>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex space-x-2 mb-8">
        <button
          onClick={() => setActiveView("staff-heatmap")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeView === "staff-heatmap"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Staff Performance Heatmap
        </button>
        <button
          onClick={() => setActiveView("graph")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeView === "graph"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Individual Performance Analysis
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Conditional Rendering */}
        {activeView === "staff-heatmap" && <StaffPerformanceHeatmap />}
        {activeView === "graph" && <ContributionGraph />}
      </div>
    </div>
  );
};

export default Analytics;
