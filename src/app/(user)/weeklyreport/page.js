// "use client";

// import React, { useState, useRef } from "react";
// import { useTaskStore } from "../../../store/taskStore";
// import { Calendar, Download, FileText, User, Building } from "lucide-react";

// export default function WeeklyReportPage() {
//   const [selectedWeek, setSelectedWeek] = useState(2);
//   const [reportData, setReportData] = useState({
//     name: "",
//     department: "",
//   });
//   const reportRef = useRef();

//   const { getTasksForWeek, getWeeksInMonth } = useTaskStore();

//   // Get current month and year
//   const currentDate = new Date();
//   const currentMonth = currentDate.getMonth();
//   const currentYear = currentDate.getFullYear();

//   // Get tasks for selected week
//   const weekTasks = getTasksForWeek(currentMonth, currentYear, selectedWeek);
//   const weeksInMonth = getWeeksInMonth(currentMonth, currentYear);

//   // Calculate statistics
//   const totalTasks = weekTasks.length;
//   const completedTasks = weekTasks.filter(
//     (task) => task.status === "completed"
//   ).length;
//   const pendingTasks = weekTasks.filter(
//     (task) => task.status === "pending" || task.status === "in-progress"
//   ).length;

//   // Get week date range
//   const getWeekDateRange = (weekNumber) => {
//     const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
//     const firstDayWeekday = firstDayOfMonth.getDay();
//     const adjustedFirstDay = firstDayWeekday === 0 ? 7 : firstDayWeekday;

//     // Calculate the start date of the selected week
//     const weekStartDate = new Date(currentYear, currentMonth, 1);
//     weekStartDate.setDate(1 + (weekNumber - 1) * 7 - (adjustedFirstDay - 1));

//     // Calculate the end date of the week (6 days later)
//     const weekEndDate = new Date(weekStartDate);
//     weekEndDate.setDate(weekStartDate.getDate() + 6);

//     return {
//       startDate: weekStartDate.toLocaleDateString("en-GB"),
//       endDate: weekEndDate.toLocaleDateString("en-GB"),
//     };
//   };

//   const { startDate, endDate } = getWeekDateRange(selectedWeek);

//   const handleInputChange = (field, value) => {
//     setReportData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const exportToPDF = () => {
//     // Create a new window for printing
//     const printWindow = window.open("", "_blank");

//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Work Plan - Ministry of Agriculture</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               margin: 0;
//               padding: 20px;
//               font-size: 12px;
//             }
//             .header {
//               text-align: center;
//               margin-bottom: 30px;

//             }
//             .logo-placeholder {
//               width: 60px;
//               height: 60px;
//               background-color: #8B4513;
//               margin: 0 auto 10px;
//               border-radius: 50%;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               color: white;
//               font-weight: bold;
//             }
//             .work-plan-title {
//               font-size: 14px;
//               font-weight: bold;
//               margin: 5px 0;
//             }
//             .ministry-title {
//               font-size: 16px;
//               font-weight: bold;
//               margin-top: 20px;

//             }
//             .performance-report {
//               font-size: 14px;
//               margin: 5px 0;
//             }
//             .info-section {
//               display: flex;
//               justify-content: space-between;
//               margin: 20px 0;
//               padding: 10px 0;
//               border-bottom: 1px solid #ccc;
//             }
//             .info-left {
//               text-align: left;
//             }
//             .info-right {
//               text-align: right;
//             }
//             table {
//               width: 100%;
//               border-collapse: collapse;
//               margin: 20px 0;
//             }
//             th, td {
//               border: 1px solid #333;
//               padding: 8px;
//               text-align: left;
//               vertical-align: top;
//             }
//             th {
//               background-color: #f5f5f5;
//               font-weight: bold;
//             }
//             .task-item {
//               margin: 3px 0;
//             }
//             .signatures {
//               display: flex;
//               justify-content: space-between;
//               margin-top: 40px;
//               padding-top: 20px;
//             }
//             .signature-section {
//               text-align: center;
//               flex: 1;
//             }
//             .signature-line {
//               border-top: 1px dashed #333;
//               margin: 20px 10px 5px 10px;
//             }
//           </style>
//         </head>
//         <body>
// <div class="header">
//   <div class="logo-placeholder">
//     <img src="applogo.png" alt="Logo" />
//   </div>

//             <div class="ministry-title">Ministry of Agriculture</div>
//             <div class="performance-report">Performance Report</div>
//           </div>

//           <div class="info-section">
//             <div class="info-left">
//               <div><strong>Name:</strong> Chukwu Benedict</div>
//               <div><strong>Department:</strong> Finance & Account</div>
//               <div><strong>Role:</strong> Internal Auditor</div>
//             </div>
//             <div class="info-right">
//               <div><strong>Monday, 04 - Friday, 08 August 2025</strong></div>
//             </div>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Day / Date<br/>(Assigned)</th>
//                 <th>All Tasks</th>
//                 <th>Completed</th>
//                 <th>Pending</th>
//                 <th>Reasons<br/>(if not completed)</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${data
//                 .map(
//                   (row) => `
//                 <tr>
//                   <td><strong>${row.date}</strong></td>
//                   <td>${row.allTasks
//                     .map((task) => `<div class="task-item">${task}</div>`)
//                     .join("")}</td>
//                   <td>${row.completed
//                     .map((task) => `<div class="task-item">${task}</div>`)
//                     .join("")}</td>
//                   <td>${row.pending
//                     .map((task) => `<div class="task-item">${task}</div>`)
//                     .join("")}</td>
//                   <td>${row.reasons}</td>
//                 </tr>
//               `
//                 )
//                 .join("")}
//             </tbody>
//           </table>

//           <div class="signatures">
//             <div class="signature-section">
//               <div class="signature-line"></div>
//               <div>Head of Unit</div>
//             </div>
//             <div class="signature-section">
//               <div class="signature-line"></div>
//               <div>Head of Department</div>
//             </div>
//             <div class="signature-section">
//               <div class="signature-line"></div>
//               <div>Perm. Secretary</div>
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     printWindow.document.write(htmlContent);
//     printWindow.document.close();

//     // Wait for content to load then print
//     setTimeout(() => {
//       printWindow.print();
//       printWindow.close();
//     }, 250);
//   };

//   const data = [
//     {
//       date: "Monday, 04/08/2025",
//       allTasks: [
//         "Receive emails and prioritize audit tasks",
//         "Follow up on prior audit findings",
//         "Conduct risk assessment planning",
//       ],
//       completed: [
//         "Receive emails and prioritize audit tasks",
//         "Follow up on prior audit findings",
//         "Conduct risk assessment planning",
//       ],
//       pending: [],
//       reasons: "",
//     },
//     {
//       date: "Tuesday, 05/08/2025",
//       allTasks: [
//         "Receive emails and prioritize audit tasks",
//         "Follow up on prior audit findings",
//         "Conduct risk assessment planning",
//       ],
//       completed: [
//         "Receive emails and prioritize audit tasks",
//         "Conduct risk assessment planning",
//       ],
//       pending: ["Follow up on prior audit findings"],
//       reasons: "Delay in receiving updated beneficiary list.",
//     },
//     {
//       date: "Wednesday, 06/08/2025",
//       allTasks: [
//         "Receive emails and prioritize audit tasks",
//         "Follow up on prior audit findings",
//       ],
//       completed: [
//         "Receive emails and prioritize audit tasks",
//         "Conduct risk assessment planning",
//       ],
//       pending: ["Follow up on prior audit findings"],
//       reasons: "Delay in receiving updated beneficiary list.",
//     },
//     {
//       date: "Thursday, 07/08/2025",
//       allTasks: [
//         "Receive emails and prioritize audit tasks",
//         "Follow up on prior audit findings",
//         "Conduct risk assessment planning",
//       ],
//       completed: [
//         "Receive emails and prioritize audit tasks",
//         "Conduct risk assessment planning",
//       ],
//       pending: ["Follow up on prior audit findings"],
//       reasons: "Delay in receiving updated beneficiary list.",
//     },
//     {
//       date: "Friday, 08/08/2025",
//       allTasks: [
//         "Receive emails and prioritize audit tasks",
//         "Follow up on prior audit findings",
//         "Conduct risk assessment planning",
//       ],
//       completed: [
//         "Receive emails and prioritize audit tasks",
//         "Conduct risk assessment planning",
//       ],
//       pending: ["Follow up on prior audit findings"],
//       reasons: "Delay in receiving updated beneficiary list.",
//     },
//   ];

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-6">
//       {/* Form Controls */}
//       <div className="bg-white rounded-lg p-6 mb-8">
//         <div className="md:flex grid justify-between rounded gap-4 mb-6">
//           <div className="grid">
//             <h1>Weekly Report</h1>
//             <p className=" text-lg text-gray-600">
//               Monday, 04/08/2025 - Sunday, 10/08/2025
//             </p>
//             <span>Name: Chuwkwu Benedict</span>
//             <span>Role: Auditor</span>
//           </div>
//           <div className="flex items-end">
//             <button
//               onClick={exportToPDF}
//               className=" px-4 py-2 bg-flag-green text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
//             >
//               <Download className="h-4 w-4 mr-2" />
//               Export Work Plan
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Report Preview */}
//       <div ref={reportRef} className="report-container  rounded-lg ">
//         {/* Statistics Section */}
//         <div className=" mb-6">
//           <div className="md:flex grid gap-6 mb-8">
//             <div className=" text-center bg-white p-6 border border-gray-300 rounded-lg">
//               <div className="text-gray-600 tracking-wide">
//                 Total Tasks Planned
//               </div>
//               <div className="stat-value font-normal text-gray-300 md:mb-2">
//                 {totalTasks}
//               </div>
//             </div>

//             <div className=" text-center p-6 border bg-white border-gray-300 rounded-lg">
//               <div className="text-gray-600  tracking-wide">
//                 Tasks Completed
//               </div>
//               <div className=" font-normal text-gray-300 md:mb-2">
//                 {completedTasks}
//               </div>
//             </div>

//             <div className="stat-card text-center p-6 border bg-white border-gray-300 rounded-lg">
//               <div className="  tracking-wide text-gray-600">Pending Task</div>
//               <div className=" font-normal text-gray-300 md:mb-2">
//                 {pendingTasks}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tasks Details */}
//         <div className="border border-gray-300 rounded-lg bg-white">
//           <div className="overflow-x-auto">
//             <table className="w-full ">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="border-b border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
//                     Day / Date
//                     <br />
//                     <span className="text-sm font-normal">(Assigned)</span>
//                   </th>
//                   <th className="border-b border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
//                     All Tasks
//                   </th>
//                   <th className="border-b border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
//                     Completed
//                   </th>
//                   <th className="border-b border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
//                     Pending
//                   </th>
//                   <th className="border-b border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
//                     Reasons
//                     <br />
//                     <span className="text-sm font-normal">
//                       (if not completed)
//                     </span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((row, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-900 font-medium align-top">
//                       {row.date}
//                     </td>
//                     <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700 align-top">
//                       <div className="space-y-2">
//                         {row.allTasks.map((task, taskIndex) => (
//                           <div key={taskIndex}>{task}</div>
//                         ))}
//                       </div>
//                     </td>
//                     <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700 align-top">
//                       <div className="space-y-2">
//                         {row.completed.map((task, taskIndex) => (
//                           <div key={taskIndex}>{task}</div>
//                         ))}
//                       </div>
//                     </td>
//                     <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700 align-top">
//                       <div className="space-y-2">
//                         {row.pending.map((task, taskIndex) => (
//                           <div key={taskIndex}>{task}</div>
//                         ))}
//                       </div>
//                     </td>
//                     <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700 align-top">
//                       {row.reasons}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Signature Section */}
//         <div className="mt-16 flex gap-3 justify-between items-center">
//           {/* Employee Signature */}
//           <div className="mb-12 border-b border-gray-900 h-12 ">
//             <span className="text-sm text-gray-600 mt-2">Head of unit</span>
//           </div>

//           {/* Supervisor Signature */}
//           <div className="mb-12 border-b border-gray-900 h-12 ">
//             <span className=" text-sm text-gray-600 mt-2">
//               Head of Department
//             </span>
//           </div>

//           {/* Date */}
//           <div className="mb-4 border-b border-gray-900 h-12 ">
//             <span className=" text-sm text-gray-600 mt-2">Perm. Secretary</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useRef, useEffect } from "react";
import useReportStore from "../../../store/reportStore"; // Update with your actual path
import { Calendar, Download, FileText, User, Building } from "lucide-react";
import useUserStore from "../../../store/useUserStore";

export default function WeeklyReportPage() {
  const reportRef = useRef();

  const {
    reports,
    currentReport,
    loading,
    error,
    fetchReport,
    setCurrentReport,
    getTasksByDay,
    getReportStats,
    clearError,
  } = useReportStore();

  const { user } = useUserStore();

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

  // Fetch report data on component mount
  useEffect(() => {
    if (!currentReport) {
      const month = getCurrentMonth();
      const week = getCurrentWeekOfMonth();
      fetchReport(month, week);
    }
  }, [currentReport, fetchReport]);

  // Get tasks organized by day
  const dayTasksData = currentReport ? getTasksByDay(currentReport) : [];

  // Get statistics
  const stats = currentReport
    ? getReportStats(currentReport)
    : {
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
      };

  // Helper to get week range from Monday & Friday tasks
  const getWeekRangeFromReport = (report) => {
    if (!report || !report.task) return "";

    const mondayTask = report.plans.find((t) => t.day === "MONDAY");
    const fridayTask = report.plans.find((t) => t.day === "FRIDAY");

    if (!mondayTask || !fridayTask) return "";

    return `${mondayTask.date} ${mondayTask.day.toLowerCase()} - ${
      fridayTask.date
    } ${fridayTask.day.toLowerCase()}`;
  };

  useEffect(() => {
    if (currentReport) {
      console.log("Sample task:", currentReport.plans?.[0]);
    }
  }, [currentReport]);

  const exportToPDF = () => {
    if (!currentReport || dayTasksData.length === 0) {
      alert("No report data available for export");
      return;
    }

    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Work Plan - Ministry of ${currentReport.ministry}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              font-size: 12px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo-placeholder {
              width: 60px;
              height: 60px;

              margin: 0 auto 10px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
            }
            .ministry-title {
              font-size: 16px;
              font-weight: bold;
              margin-top: 20px;
            }
            .performance-report {
              font-size: 14px;
              margin: 5px 0;
            }
            .info-section {
              display: flex;
              justify-content: space-between;
              margin: 20px 0;
              padding: 10px 0;
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
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #333;
              padding: 8px;
              text-align: left;
              vertical-align: top;
            }
            th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            .task-item {
              margin: 3px 0;
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
            <div class="logo-placeholder">
              <img src="applogo.png" alt="Logo" />
            </div>
            <div class="ministry-title">Ministry of ${
              currentReport.ministry
            }  </div>
            <div class="performance-report">Performance Report</div>
          </div>

          <div class="info-section">
            <div class="info-left">
              <div><strong>Name:</strong> ${currentReport.employee_id}</div>
              <div><strong>Department:</strong> ${
                currentReport.department
              }</div>
              <div><strong>Role:</strong> ${currentReport.role}</div>
            </div>
            <div class="info-right">
              <div><strong>Week:</strong> MONDAY, ${
                currentReport.startDate
              } - FRIDAY, ${currentReport.endDate}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Day / Date<br/>(Assigned)</th>
                <th>All Tasks</th>
                <th>Completed</th>
                <th>Pending</th>
                <th>Reasons<br/>(if not completed)</th>
              </tr>
            </thead>
            <tbody>
              ${dayTasksData
                .map(
                  (row) => `
                <tr>
                  <td><strong>${row.date}</strong></td>
                  <td>${row.allTasks
                    .map((task) => `<div class="task-item">${task}</div>`)
                    .join("")}</td>
                  <td>${row.completed
                    .map((task) => `<div class="task-item">${task}</div>`)
                    .join("")}</td>
                  <td>${row.pending
                    .map((task) => `<div class="task-item">${task}</div>`)
                    .join("")}</td>
                  <td>${row.reasons}</td>
                </tr>
              `
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

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading report
              </h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <button
                onClick={() => {
                  clearError();
                  fetchReport();
                }}
                className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentReport) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-gray-500">
          <p>No report data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Form Controls */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <div className="md:flex grid justify-between rounded gap-4 mb-6">
          <div className="grid">
            <h1>Weekly Report</h1>
            <p className="text-sm text-gray-900">
              MONDAY, {currentReport.startDate} - FRIDAY,{" "}
              {currentReport.endDate}
            </p>

            <span>Employee ID: {currentReport.employee_id}</span>
            <span>Department: {currentReport.department}</span>
            <span>Role: {currentReport.role}</span>
          </div>
          <div className="flex items-end">
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-flag-green text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-flag-green flex items-center justify-center"
              disabled={dayTasksData.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Work Plan
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div ref={reportRef} className="report-container rounded-lg">
        {/* Statistics Section */}
        <div className="mb-6">
          <div className="md:flex grid gap-6 mb-8">
            <div className="text-center bg-white p-6 border border-gray-300 rounded-lg">
              <div className=" tracking-wide">Total Tasks Planned</div>
              <div className="stat-value font-normal md:mb-2">
                {stats.totalTasks}
              </div>
            </div>

            <div className="text-center p-6 border bg-white border-gray-300 rounded-lg">
              <div className=" tracking-wide">Tasks Completed</div>
              <div className="font-normal  md:mb-2">{stats.completedTasks}</div>
            </div>

            <div className="stat-card text-center p-6 border bg-white border-gray-300 rounded-lg">
              <div className="tracking-wide">Pending Tasks</div>
              <div className="font-normal  md:mb-2">{stats.pendingTasks}</div>
            </div>
          </div>
        </div>

        {/* Tasks Details */}
        <div className="border border-gray-300 rounded-lg bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
                    Day / Date
                    <br />
                    <span className="text-sm font-normal">(Assigned)</span>
                  </th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
                    All Tasks
                  </th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
                    Completed
                  </th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
                    Pending
                  </th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
                    Reasons
                    <br />
                    <span className="text-sm font-normal">
                      (if not completed)
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dayTasksData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-900 font-medium align-top">
                      <div>{row.date}</div>
                      <div>{row.day}</div>
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-900 align-top">
                      <div className="space-y-2">
                        {row.allTasks.map((task, taskIndex) => (
                          <div key={taskIndex}>{task}</div>
                        ))}
                      </div>
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3  text-gray-900 align-top">
                      <div className="space-y-2">
                        {row.completed.map((task, taskIndex) => (
                          <div key={taskIndex}>{task}</div>
                        ))}
                      </div>
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3  text-gray-900 align-top">
                      <div className="space-y-2">
                        {row.pending.map((task, taskIndex) => (
                          <div key={taskIndex}>{task}</div>
                        ))}
                      </div>
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3  text-gray-900 align-top">
                      {row.reasons}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signature Section */}
        <div className="mt-16 flex gap-3 justify-between items-center">
          <div className="mb-12 border-b border-gray-900 h-12">
            <span className="text-sm text-gray-600 mt-2">Head of unit</span>
          </div>

          <div className="mb-12 border-b border-gray-900 h-12">
            <span className="text-sm text-gray-600 mt-2">
              Head of Department
            </span>
          </div>

          <div className="mb-4 border-b border-gray-900 h-12">
            <span className="text-sm text-gray-600 mt-2">Perm. Secretary</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import useReportStore from "../../../store/reportStore"; // Update with your actual path
// import { Calendar, Download, FileText, User, Building } from "lucide-react";
// import useUserStore from "../../../store/useUserStore";

// export default function WeeklyReportPage() {
//   const reportRef = useRef();

//   const {
//     reports,
//     currentReport,
//     loading,
//     error,
//     fetchReport,
//     setCurrentReport,
//     getTasksByDay,
//     getReportStats,
//     clearError,
//   } = useReportStore();

//   const { user } = useUserStore();

//   // Fetch report data on mount
//   useEffect(() => {
//     fetchReport();
//   }, [fetchReport]);

//   // Get tasks organized by day
//   const dayTasksData = currentReport ? getTasksByDay(currentReport) : [];

//   // Get statistics
//   const stats = currentReport
//     ? getReportStats(currentReport)
//     : { totalTasks: 0, completedTasks: 0, pendingTasks: 0 };

//   // ✅ Helper: format date nicely
//   const formatDate = (date) => {
//     if (!(date instanceof Date) || isNaN(date)) return "";
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     const weekdays = [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ];
//     return `${day}/${month}/${year} ${weekdays[date.getDay()]}`;
//   };

//   // ✅ Get week range (from backend startDate/endDate or tasks)
//   const getWeekRange = (report) => {
//     if (!report || !report.task || report.task.length === 0) return "";

//     // collect valid dates
//     const validDates = report.task
//       .map((task) => (task.date ? new Date(task.date) : null))
//       .filter((d) => d && !isNaN(d));

//     if (validDates.length === 0) return "";

//     // sort to find start and end of the week
//     validDates.sort((a, b) => a - b);
//     const start = validDates[0];
//     const end = validDates[validDates.length - 1];

//     const formatDate = (date) => {
//       const day = String(date.getDate()).padStart(2, "0");
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     };

//     const weekdayNames = [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ];

//     return `${formatDate(start)} ${weekdayNames[start.getDay()]} - ${formatDate(
//       end
//     )} ${weekdayNames[end.getDay()]}`;
//   };

//   // Debug log (optional, remove in production)
//   useEffect(() => {
//     if (currentReport) {
//       console.log("Sample task:", currentReport.task?.[0]);
//     }
//   }, [currentReport]);

//   // ✅ Export to PDF
//   const exportToPDF = () => {
//     if (!currentReport || dayTasksData.length === 0) {
//       alert("No report data available for export");
//       return;
//     }

//     const printWindow = window.open("", "_blank");

//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Work Plan - Ministry of Agriculture</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               margin: 0;
//               padding: 20px;
//               font-size: 12px;
//             }
//             .header { text-align: center; margin-bottom: 30px; }
//             .logo-placeholder { width: 60px; height: 60px; margin: 0 auto 10px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
//             .ministry-title { font-size: 16px; font-weight: bold; margin-top: 20px; }
//             .performance-report { font-size: 14px; margin: 5px 0; }
//             .info-section { display: flex; justify-content: space-between; margin: 20px 0; padding: 10px 0; border-bottom: 1px solid #ccc; }
//             .info-left { text-align: left; }
//             .info-right { text-align: right; }
//             table { width: 100%; border-collapse: collapse; margin: 20px 0; }
//             th, td { border: 1px solid #333; padding: 8px; text-align: left; vertical-align: top; }
//             th { background-color: #f5f5f5; font-weight: bold; }
//             .task-item { margin: 3px 0; }
//             .signatures { display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; }
//             .signature-section { text-align: center; flex: 1; }
//             .signature-line { border-top: 1px dashed #333; margin: 20px 10px 5px 10px; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <div class="logo-placeholder">
//               <img src="applogo.png" alt="Logo" />
//             </div>
//             <div class="ministry-title">Ministry of Agriculture</div>
//             <div class="performance-report">Performance Report</div>
//           </div>

//           <div class="info-section">
//             <div class="info-left">
//               <div><strong>Name:</strong> ${user?.employee_id}</div>
//               <div><strong>Department:</strong> ${user?.department?.name}</div>
//               <div><strong>Role:</strong> Internal Auditor</div>
//             </div>
//             <div class="info-right">
//               <div><strong>${getWeekDateRange()}</strong></div>
//             </div>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Day / Date<br/>(Assigned)</th>
//                 <th>All Tasks</th>
//                 <th>Completed</th>
//                 <th>Pending</th>
//                 <th>Reasons<br/>(if not completed)</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${dayTasksData
//                 .map(
//                   (row) => `
//                 <tr>
//                   <td><strong>${row.date}</strong><br/>${row.day}</td>
//                   <td>${row.allTasks
//                     .map((task) => `<div class="task-item">${task}</div>`)
//                     .join("")}</td>
//                   <td>${row.completed
//                     .map((task) => `<div class="task-item">${task}</div>`)
//                     .join("")}</td>
//                   <td>${row.pending
//                     .map((task) => `<div class="task-item">${task}</div>`)
//                     .join("")}</td>
//                   <td>${row.reasons}</td>
//                 </tr>
//               `
//                 )
//                 .join("")}
//             </tbody>
//           </table>

//           <div class="signatures">
//             <div class="signature-section">
//               <div class="signature-line"></div>
//               <div>Head of Unit</div>
//             </div>
//             <div class="signature-section">
//               <div class="signature-line"></div>
//               <div>Head of Department</div>
//             </div>
//             <div class="signature-section">
//               <div class="signature-line"></div>
//               <div>Perm. Secretary</div>
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     printWindow.document.write(htmlContent);
//     printWindow.document.close();

//     setTimeout(() => {
//       printWindow.print();
//       printWindow.close();
//     }, 250);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
//           <p className="mt-2 text-gray-600">Loading report...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="px-4 sm:px-6 lg:px-8 py-6">
//         <div className="bg-red-50 border border-red-200 rounded-md p-4">
//           <div className="flex">
//             <div className="ml-3">
//               <h3 className="text-sm font-medium text-red-800">
//                 Error loading report
//               </h3>
//               <p className="mt-1 text-sm text-red-700">{error}</p>
//               <button
//                 onClick={() => {
//                   clearError();
//                   fetchReport();
//                 }}
//                 className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // No report
//   if (!currentReport) {
//     return (
//       <div className="px-4 sm:px-6 lg:px-8 py-6">
//         <div className="text-center text-gray-500">
//           <p>No report data available</p>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Render Report Page
//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-6">
//       {/* Form Controls */}
//       <div className="bg-white rounded-lg p-6 mb-8">
//         <div className="md:flex grid justify-between rounded gap-4 mb-6">
//           <div className="grid">
//             <h1>Weekly Report</h1>
//             <p className="text-lg text-gray-600">
//               {getWeekRange(currentReport)}
//             </p>
//             <span>Employee ID: {user?.employee_id}</span>
//             <span>Department: {user?.department?.name}</span>
//           </div>
//           <div className="flex items-end">
//             <button
//               onClick={exportToPDF}
//               className="px-4 py-2 bg-flag-green text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-flag-green flex items-center justify-center"
//               disabled={dayTasksData.length === 0}
//             >
//               <Download className="h-4 w-4 mr-2" />
//               Export Work Plan
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Report Preview */}
//       <div ref={reportRef} className="report-container rounded-lg">
//         {/* Stats */}
//         <div className="mb-6">
//           <div className="md:flex grid gap-6 mb-8">
//             <div className="text-center bg-white p-6 border border-gray-300 rounded-lg">
//               <div>Total Tasks Planned</div>
//               <div className="font-normal md:mb-2">{stats.totalTasks}</div>
//             </div>
//             <div className="text-center p-6 border bg-white border-gray-300 rounded-lg">
//               <div>Tasks Completed</div>
//               <div className="font-normal md:mb-2">{stats.completedTasks}</div>
//             </div>
//             <div className="text-center p-6 border bg-white border-gray-300 rounded-lg">
//               <div>Pending Tasks</div>
//               <div className="font-normal md:mb-2">{stats.pendingTasks}</div>
//             </div>
//           </div>
//         </div>

//         {/* Tasks Table */}
//         <div className="border border-gray-300 rounded-lg bg-white">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="px-4 py-3 border-b text-left">
//                     Day / Date
//                     <br />
//                     <span className="text-sm font-normal">(Assigned)</span>
//                   </th>
//                   <th className="px-4 py-3 border-b text-left">All Tasks</th>
//                   <th className="px-4 py-3 border-b text-left">Completed</th>
//                   <th className="px-4 py-3 border-b text-left">Pending</th>
//                   <th className="px-4 py-3 border-b text-left">
//                     Reasons
//                     <br />
//                     <span className="text-sm font-normal">
//                       (if not completed)
//                     </span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {dayTasksData.map((row, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-4 py-3 border-b text-sm font-medium">
//                       <div>{row.date}</div>
//                       <div>{row.day}</div>
//                     </td>
//                     <td className="px-4 py-3 border-b text-sm">
//                       {row.allTasks.join(", ")}
//                     </td>
//                     <td className="px-4 py-3 border-b text-sm">
//                       {row.completed.join(", ")}
//                     </td>
//                     <td className="px-4 py-3 border-b text-sm">
//                       {row.pending.join(", ")}
//                     </td>
//                     <td className="px-4 py-3 border-b text-sm">
//                       {row.reasons}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Signature Section */}
//         <div className="mt-16 flex gap-3 justify-between items-center">
//           <div className="mb-12 border-b border-gray-900 h-12">
//             <span className="text-sm text-gray-600 mt-2">Head of Unit</span>
//           </div>
//           <div className="mb-12 border-b border-gray-900 h-12">
//             <span className="text-sm text-gray-600 mt-2">
//               Head of Department
//             </span>
//           </div>
//           <div className="mb-4 border-b border-gray-900 h-12">
//             <span className="text-sm text-gray-600 mt-2">Perm. Secretary</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
