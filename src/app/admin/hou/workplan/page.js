"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function WeeklyPerformanceReview() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("August");

  const monthDropdownRef = useRef(null);
  const isAnyDropdownOpen = isMonthOpen;
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

  const getStatusDot = (status) => {
    switch (status) {
      case "Completed":
        return "bg-flag-green";
      case "In progress":
        return "bg-blue-800";
      case "Pending":
        return "bg-orange-500";
      default:
        return "bg-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return " text-flag-green ";
      case "In progress":
        return "text-blue-800";
      case "Pending":
        return " text-orange-800";
      default:
        return " text-gray-800";
    }
  };

  const weeklyTasks = [
    {
      day: "Monday",
      date: "04/08/2024",
      tasks: "Review goals and priorities work tasks",
      notes: "Check to-own response or update",
      tool: "Outlook, Norton",
      priority: "Medium",
      time: "8:00am - 10:00am",
      status: "Completed",
      constraints: "",
    },
    {
      day: "",
      date: "",
      tasks: "Follow up on daily work findings",
      notes: "General finance and Procurement Admin",
      tool: "Excel, Email",
      priority: "High",
      time: "11:00am - 12:00pm",
      status: "Completed",

      constraints: "",
    },
    {
      day: "",
      date: "",
      tasks: "Conduct trial balancing audit recurring",
      notes: "Monthly trial audit results for tax and preparation",
      tool: "audit metrics and features",
      priority: "High",
      time: "2:00pm - 4:00pm",
      status: "Pending",

      constraints: "",
    },
    {
      day: "Tuesday",
      date: "05/08/2024",
      tasks: "Field audit assignment",
      notes: "Double review on HIS Excel reports",
      tool: "pdf systems, HIS office",
      priority: "High",
      time: "8:00am - 10:00am",
      status: "Pending",

      constraints: "",
    },
    {
      day: "",
      date: "",
      tasks: "Internal risk identification",
      notes: "ZTI and information audit and fraud Measures",
      tool: "Chargib solution",
      priority: "High",
      time: "11:00am - 1:00pm",
      status: "Pending",

      constraints: "",
    },
    {
      day: "",
      date: "",
      tasks: "Analyse evidence and record transactions",
      notes: "March and summary statistics",
      tool: "Excel, Audit software",
      priority: "High",
      time: "2:00pm - 4:00pm",
      status: "In progress",

      constraints: "",
    },
    {
      day: "Wednesday",
      date: "07/08/2024",
      tasks: "Team alignment meeting",
      notes: "Discuss deadlines, conduct weekly audit schedule",
      tool: "Teams, M-s office",
      priority: "High",
      time: "9:00am - 11:00am",
      status: "Completed",

      constraints: "",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-1 mb-6">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Chucker Benedict
            </h1>
            <span>Internal Auditor</span>
          </div>
          <button className="bg-flag-green  hover:bg-flag-green-dark text-white px-2 py-4 rounded text-sm md:font-medium">
            Performance Review
          </button>
        </div>

        {/* Month and Week Selection */}
        <div className="bg-white rounded-lg shadow-sm  mb-6">
          <div className="p-4">
            <div className="md:flex items-center space-x-6">
              {/* Sort by Month Dropdown */}
              <div className="relative " ref={monthDropdownRef}>
                <div className="relative" ref={monthDropdownRef}>
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

              {/* Week Tabs */}
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((week) => (
                  <button
                    key={week}
                    onClick={() => setActiveWeek(week)}
                    className={`px-4 py-2 text-sm font-medium rounded ${
                      activeWeek === week
                        ? " text-flag-green"
                        : " text-gray-600 "
                    }`}
                  >
                    Week {week}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 font-bold text-gray-600">
                    Day
                  </th>
                  <th className="text-left px-4 py-3  font-bold text-gray-600">
                    Tasks
                  </th>
                  <th className="text-left px-4 py-3  font-bold text-gray-600">
                    Notes
                  </th>
                  <th className="text-left px-4 py-3  font-bold text-gray-600">
                    Tool
                  </th>
                  <th className="text-left px-4 py-3  font-bold text-gray-600">
                    Priority
                  </th>
                  <th className="text-left px-4 py-3  font-bold text-gray-600">
                    Time
                  </th>
                  <th className="text-left px-4 py-3  font-bold text-gray-600">
                    Status
                  </th>
                  <th className="text-left px-4 py-3  font-bold text-gray-600">
                    Constraints
                  </th>
                </tr>
              </thead>
              <tbody>
                {weeklyTasks.map((task, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 border-b"
                  >
                    <td className="px-4 py-3 ">
                      {task.day && (
                        <div>
                          <div className="text-sm font-medium  text-gray-900">
                            {task.day}
                          </div>
                          <div className="text-xs text-gray-500">
                            {task.date}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-4 border-b py-3 text-sm text-gray-900 max-w-xs">
                      {task.tasks}
                    </td>
                    <td className="px-4  border-b py-3 text-sm text-gray-600 max-w-xs">
                      {task.notes}
                    </td>
                    <td className="px-4 py-3 border-b text-sm text-gray-600 max-w-xs">
                      {task.tool}
                    </td>
                    <td className="px-4 py-3 border-b">
                      <span>{task.priority}</span>
                    </td>
                    <td className="px-4 py-3 border-b text-sm text-gray-600">
                      {task.time}
                    </td>

                    <td className="px-4 py-3 border-b">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block w-2.5 h-2.5 rounded-full ${getStatusDot(
                            task.status
                          )}`}
                        ></span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 border-b text-sm text-gray-600">
                      {task.constraints}
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
