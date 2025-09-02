// "use client";

// import React, { useState, useRef } from "react";
// import { useTaskStore } from "../../../../../../../../../store/taskStore";
// import {
//   Calendar,
//   Download,
//   FileText,
//   User,
//   Building,
//   CircleCheck,
// } from "lucide-react";

// export default function WeeklyReportPage() {
//   const [selectedWeek, setSelectedWeek] = useState(2);
//   const [showSubmittedModal, setShowSubmittedModal] = useState(false);
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
//       <div className=" rounded-lg p-6 mb-8">
//         <div className="md:flex grid justify-between rounded gap-4 mb-6">
//           <div className="grid">
//             <h1>Weekly Report</h1>
//             <p className=" text-lg text-gray-600">
//               Monday, 04/08/2025 - Sunday, 10/08/2025
//             </p>
//             <span>Name: Chuwkwu Benedict</span>
//             <span>Role: Auditor</span>
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
//       </div>

//       {showSubmittedModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-opacity-50">
//           <div className="bg-white item-center rounded-lg p-6 max-w-sm mx-auto grid place-items-center">
//             <CircleCheck size={30} />
//             <h2 className=" font-semibold m-4">Report Approved</h2>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useReportStore from "../../../../../../../../../store/admin/usehodReport";
import { Calendar, Download, FileText, User, Building } from "lucide-react";

export default function WeeklyReportPage() {
  const reportRef = useRef();
  const searchParams = useSearchParams();

  const {
    reportData,
    ApproveReport,
    user,
    plan,
    tasks,
    stats,
    loading,
    error,
    fetchReport,
    getTasksByDay,
    getReportStats,
    getUserInfo,
    getPlanInfo,
    clearError,
    reset, // Add reset to clear data
  } = useReportStore();

  // Get URL parameters - extract staffId from the URL path as well
  const pathStaffId = window.location.pathname.split("/")[4]; // Get last segment of URL
  const pathUnitId = window.location.pathname.split("/").at(-3); // Get second last segment of URL
  const staffId = searchParams.get("staffId") || pathStaffId || "1";
  const unitId = searchParams.get("unitId") || pathUnitId || "1"; // Default to 1 if not provided
  const month = searchParams.get("month") || "AUGUST";
  const week = searchParams.get("week") || "WEEK_4";

  useEffect(() => {
    console.log("Fetching report for:", { staffId, unitId, month, week });
    reset();
    fetchReport(staffId, unitId, month, week);
  }, [staffId, unitId, month, week]);

  // Get tasks organized by day using the store method
  const dayTasksData = getTasksByDay();

  // Get statistics from store
  const reportStats = getReportStats();

  // Helper to get week range from plan data
  const getWeekRangeFromReport = () => {
    if (!reportData) return "";

    return `${reportData.startDate}/${month.slice(
      0,
      3
    )}/${new Date().getFullYear()} ${reportData.startDay} - ${
      reportData.endDate
    }/${month.slice(0, 3)}/${new Date().getFullYear()} ${reportData.endDay}`;
  };

  // };

  const handleApprove = async () => {
    if (!user || !plan) {
      alert("User or plan information is missing");
      return;
    }

    const confirmed = confirm("Are you sure you want to approve this report?");
    if (!confirmed) return;

    const unitId = user.unit_id;
    const userId = user.id;
    const planId = plan.plan_id;

    try {
      const result = await ApproveReport(unitId, userId, planId);
      if (result) {
        alert("Report approved successfully");
        // Optionally, you can refresh the report data here
      }
    } catch (error) {
      console.error("Error approving report:", error);
    }
  };

  const exportToPDF = () => {
    if (!reportData || dayTasksData.length === 0) {
      alert("No report data available for export");
      return;
    }

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
            <div class="ministry-title">Ministry of Agriculture</div>
            <div class="performance-report">Performance Report</div>
          </div>

          <div class="info-section">
            <div class="info-left">
              <div><strong>Name:</strong> ${user?.employee_id || "N/A"}</div>
              <div><strong>Department:</strong> ${
                user?.department?.name || "N/A"
              }</div>
              <div><strong>Role:</strong> ${user?.role || "N/A"}</div>
            </div>
            <div class="info-right">
              <div><strong>${getWeekRangeFromReport()}</strong></div>
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
                  <td><strong>${row.day}</strong><br/>${row.date}</td>
                  <td>${row.allTasks
                    .map((task) => `<div class="task-item">${task}</div>`)
                    .join("")}</td>
                  <td>${row.completed
                    .map((task) => `<div class="task-item">${task}</div>`)
                    .join("")}</td>
                  <td>${row.pending
                    .map((task) => `<div class="task-item">${task}</div>`)
                    .join("")}</td>
                  <td>${row.reasons || "N/A"}</td>
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
                  fetchReport(staffId, month, week);
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

  if (!reportData) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-gray-500">
          <p>No report data available</p>
          <button
            onClick={() => fetchReport(staffId, month, week)}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            Load Report
          </button>
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
            <h1 className="text-xl font-semibold">Weekly Report</h1>
            <p className=" text-gray-900 font-semibold">
              {getWeekRangeFromReport()}
            </p>
            <div className="mt-2 font-semibold text-gray-600">
              <span>Employee ID: {user?.employee_id}</span>
              <br />
              <span>Role: {user?.role}</span>
              <span>{plan?.plan_id}</span>
            </div>
          </div>
          <div className="flex items-end gap-2">
            {/* <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-flag-green text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-flag-green flex items-center justify-center"
              disabled={dayTasksData.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Work Plan
            </button> */}
            <button
              onClick={handleApprove}
              className="ml-3 px-4 py-2 bg-flag-green text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-flag-green flex items-center justify-center"
            >
              Approve Report
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
              <div className="tracking-wide font-normal text-2xl   text-gray-600">
                Total Tasks Planned
              </div>
              <div className="stat-value font-normal text-2xl md:mb-2">
                {reportStats.totalTasks}
              </div>
            </div>

            <div className="text-center p-6 border bg-white border-gray-300  font-normal text-2xl rounded-lg">
              <div className="tracking-wide text-gray-600">Tasks Completed</div>
              <div className="font-normal text-2xl  md:mb-2">
                {reportStats.completedTasks}
              </div>
            </div>

            <div className="stat-card text-center p-6 border bg-white border-gray-300 font-normal text-2xl rounded-lg">
              <div className="tracking-wide  text-gray-600">Pending Tasks</div>
              <div className="font-normal text-2xl  md:mb-2">
                {reportStats.pendingTasks}
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Details */}
        <div className="border border-gray-300 rounded-lg bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-300 px-4 py-3 text-left text-gray-900">
                    Day / Date
                    <br />
                    <span className=" font-normal">(Assigned)</span>
                  </th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left  text-gray-900">
                    All Tasks
                  </th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left  text-gray-900">
                    Completed
                  </th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left text-gray-900">
                    Pending
                  </th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left  text-gray-900">
                    Reasons
                    <br />
                    <span className=" font-normal">(if not completed)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dayTasksData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      No tasks found for this period
                    </td>
                  </tr>
                ) : (
                  dayTasksData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border-b border-gray-300 px-4 py-3  font-medium align-top">
                        <div className="font-semibold">{row.day}</div>
                        <div className="text-gray-600">{row.date}</div>
                      </td>
                      <td className="border-b border-gray-300 px-4 py-3   align-top">
                        <div className="space-y-2">
                          {row.allTasks.length === 0 ? (
                            <div className="text-gray-400">No tasks</div>
                          ) : (
                            row.allTasks.map((task, taskIndex) => (
                              <div key={taskIndex} className=" pl-2">
                                {task}
                              </div>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="border-b border-gray-300 px-4 py-3  align-top">
                        <div className="space-y-2">
                          {row.completed.length === 0 ? (
                            <div className="text-gray-400">None</div>
                          ) : (
                            row.completed.map((task, taskIndex) => (
                              <div key={taskIndex} className=" pl-2">
                                {task}
                              </div>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="border-b border-gray-300 px-4 py-3  align-top">
                        <div className="space-y-2">
                          {row.pending.length === 0 ? (
                            <div className="text-gray-400">None</div>
                          ) : (
                            row.pending.map((task, taskIndex) => (
                              <div key={taskIndex} className=" pl-2">
                                {task}
                              </div>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="border-b border-gray-300 px-4 py-3 text-gray-900 align-top">
                        <div className="text-sm">{row.reasons || "N/A"}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
