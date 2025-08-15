"use client";

import React, { useState, useRef } from "react";
import { useTaskStore } from "../../../store/taskStore";
import { Calendar, Download, FileText, User, Building } from "lucide-react";

export default function WeeklyReportPage() {
  const [selectedWeek, setSelectedWeek] = useState(2);
  const [reportData, setReportData] = useState({
    name: "",
    department: "",
  });
  const reportRef = useRef();

  const { getTasksForWeek, getWeeksInMonth } = useTaskStore();

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get tasks for selected week
  const weekTasks = getTasksForWeek(currentMonth, currentYear, selectedWeek);
  const weeksInMonth = getWeeksInMonth(currentMonth, currentYear);

  // Calculate statistics
  const totalTasks = weekTasks.length;
  const completedTasks = weekTasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = weekTasks.filter(
    (task) => task.status === "pending" || task.status === "in-progress"
  ).length;

  // Get week date range
  const getWeekDateRange = (weekNumber) => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const firstDayWeekday = firstDayOfMonth.getDay();
    const adjustedFirstDay = firstDayWeekday === 0 ? 7 : firstDayWeekday;

    // Calculate the start date of the selected week
    const weekStartDate = new Date(currentYear, currentMonth, 1);
    weekStartDate.setDate(1 + (weekNumber - 1) * 7 - (adjustedFirstDay - 1));

    // Calculate the end date of the week (6 days later)
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);

    return {
      startDate: weekStartDate.toLocaleDateString("en-GB"),
      endDate: weekEndDate.toLocaleDateString("en-GB"),
    };
  };

  const { startDate, endDate } = getWeekDateRange(selectedWeek);

  const handleInputChange = (field, value) => {
    setReportData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const exportToPDF = () => {
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
              background-color: #8B4513;
              margin: 0 auto 10px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
            }
            .work-plan-title {
              font-size: 14px;
              font-weight: bold;
              margin: 5px 0;
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
              <div><strong>Name:</strong> Chukwu Benedict</div>
              <div><strong>Department:</strong> Finance & Account</div>
              <div><strong>Role:</strong> Internal Auditor</div>
            </div>
            <div class="info-right">
              <div><strong>Monday, 04 - Friday, 08 August 2025</strong></div>
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
              ${data
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

  const data = [
    {
      date: "Monday, 04/08/2025",
      allTasks: [
        "Receive emails and prioritize audit tasks",
        "Follow up on prior audit findings",
        "Conduct risk assessment planning",
      ],
      completed: [
        "Receive emails and prioritize audit tasks",
        "Follow up on prior audit findings",
        "Conduct risk assessment planning",
      ],
      pending: [],
      reasons: "",
    },
    {
      date: "Tuesday, 05/08/2025",
      allTasks: [
        "Receive emails and prioritize audit tasks",
        "Follow up on prior audit findings",
        "Conduct risk assessment planning",
      ],
      completed: [
        "Receive emails and prioritize audit tasks",
        "Conduct risk assessment planning",
      ],
      pending: ["Follow up on prior audit findings"],
      reasons: "Delay in receiving updated beneficiary list.",
    },
    {
      date: "Wednesday, 06/08/2025",
      allTasks: [
        "Receive emails and prioritize audit tasks",
        "Follow up on prior audit findings",
      ],
      completed: [
        "Receive emails and prioritize audit tasks",
        "Conduct risk assessment planning",
      ],
      pending: ["Follow up on prior audit findings"],
      reasons: "Delay in receiving updated beneficiary list.",
    },
    {
      date: "Thursday, 07/08/2025",
      allTasks: [
        "Receive emails and prioritize audit tasks",
        "Follow up on prior audit findings",
        "Conduct risk assessment planning",
      ],
      completed: [
        "Receive emails and prioritize audit tasks",
        "Conduct risk assessment planning",
      ],
      pending: ["Follow up on prior audit findings"],
      reasons: "Delay in receiving updated beneficiary list.",
    },
    {
      date: "Friday, 08/08/2025",
      allTasks: [
        "Receive emails and prioritize audit tasks",
        "Follow up on prior audit findings",
        "Conduct risk assessment planning",
      ],
      completed: [
        "Receive emails and prioritize audit tasks",
        "Conduct risk assessment planning",
      ],
      pending: ["Follow up on prior audit findings"],
      reasons: "Delay in receiving updated beneficiary list.",
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Form Controls */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <div className="md:flex grid justify-between rounded gap-4 mb-6">
          <div className="grid">
            <h1>Weekly Report</h1>
            <p className=" text-lg text-gray-600">
              Monday, 04/08/2025 - Sunday, 10/08/2025
            </p>
            <span>Name: Chuwkwu Benedict</span>
            <span>Role: Auditor</span>
          </div>
          <div className="flex items-end">
            <button
              onClick={exportToPDF}
              className=" px-4 py-2 bg-flag-green text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Work Plan
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div ref={reportRef} className="report-container  rounded-lg ">
        {/* Statistics Section */}
        <div className=" mb-6">
          <div className="md:flex grid gap-6 mb-8">
            <div className=" text-center bg-white p-6 border border-gray-300 rounded-lg">
              <div className="text-gray-600 tracking-wide">
                Total Tasks Planned
              </div>
              <div className="stat-value font-normal text-gray-300 md:mb-2">
                {totalTasks}
              </div>
            </div>

            <div className=" text-center p-6 border bg-white border-gray-300 rounded-lg">
              <div className="text-gray-600  tracking-wide">
                Tasks Completed
              </div>
              <div className=" font-normal text-gray-300 md:mb-2">
                {completedTasks}
              </div>
            </div>

            <div className="stat-card text-center p-6 border bg-white border-gray-300 rounded-lg">
              <div className="  tracking-wide text-gray-600">Pending Task</div>
              <div className=" font-normal text-gray-300 md:mb-2">
                {pendingTasks}
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Details */}
        <div className="border border-gray-300 rounded-lg bg-white">
          <div className="overflow-x-auto">
            <table className="w-full ">
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
                {data.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-900 font-medium align-top">
                      {row.date}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700 align-top">
                      <div className="space-y-2">
                        {row.allTasks.map((task, taskIndex) => (
                          <div key={taskIndex}>{task}</div>
                        ))}
                      </div>
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700 align-top">
                      <div className="space-y-2">
                        {row.completed.map((task, taskIndex) => (
                          <div key={taskIndex}>{task}</div>
                        ))}
                      </div>
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700 align-top">
                      <div className="space-y-2">
                        {row.pending.map((task, taskIndex) => (
                          <div key={taskIndex}>{task}</div>
                        ))}
                      </div>
                    </td>
                    <td className="border-b border-gray-300 px-4 py-3 text-sm text-gray-700 align-top">
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
          {/* Employee Signature */}
          <div className="mb-12 border-b border-gray-900 h-12 ">
            <span className="text-sm text-gray-600 mt-2">Head of unit</span>
          </div>

          {/* Supervisor Signature */}
          <div className="mb-12 border-b border-gray-900 h-12 ">
            <span className=" text-sm text-gray-600 mt-2">
              Head of Department
            </span>
          </div>

          {/* Date */}
          <div className="mb-4 border-b border-gray-900 h-12 ">
            <span className=" text-sm text-gray-600 mt-2">Perm. Secretary</span>
          </div>
        </div>
      </div>
    </div>
  );
}
