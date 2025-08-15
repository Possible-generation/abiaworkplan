"use client";

import React, { useState, useRef } from "react";
import { useTaskStore } from "../../../../../../../../../store/taskStore";
import {
  Calendar,
  Download,
  FileText,
  User,
  Building,
  CircleCheck,
} from "lucide-react";

export default function WeeklyReportPage() {
  const [selectedWeek, setSelectedWeek] = useState(2);
  const [showSubmittedModal, setShowSubmittedModal] = useState(false);
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
      <div className=" rounded-lg p-6 mb-8">
        <div className="md:flex grid justify-between rounded gap-4 mb-6">
          <div className="grid">
            <h1>Weekly Report</h1>
            <p className=" text-lg text-gray-600">
              Monday, 04/08/2025 - Sunday, 10/08/2025
            </p>
            <span>Name: Chuwkwu Benedict</span>
            <span>Role: Auditor</span>
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
      </div>

      {showSubmittedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-opacity-50">
          <div className="bg-white item-center rounded-lg p-6 max-w-sm mx-auto grid place-items-center">
            <CircleCheck size={30} />
            <h2 className=" font-semibold m-4">Report Approved</h2>
          </div>
        </div>
      )}
    </div>
  );
}
