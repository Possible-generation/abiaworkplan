// useEffect(() => {
//   // Only fetch on initial load with proper staff ID
//   const staffId = plans[0]?.user_id || staff?.id || "123";
//   const unitId = staff?.department_id || "defaultDepartment"; // Fallback department ID if not available
//   console.log(
//     "Initial fetch for staff:",
//     staffId,
//     "month:",
//     selectedMonth,
//     "week:",
//     activeWeek
//   );
//   fetchStaffTasks(staffId, unitId, selectedMonth, activeWeek);
// }, [fetchStaffTasks]); // Remove dependencies to prevent infinite loops

// --------------------------------------------------------------------------------

"use client";

import React, { useState, useEffect, useRef, use } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import usePermsecTask from "../../../../../../../store/admin/usePermsecTask";
import useReportStore from "../../../../../../../store/admin/usePermsecReport";

export default function WeeklyPerformanceReview() {
  const router = useRouter();
  // const [activeWeek, setActiveWeek] = useState(0);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  // const [selectedMonth, setSelectedMonth] = useState("August");
  const { tasks, loading, fetchStaffTasks, plans, staff } = usePermsecTask();
  const { fetchReport } = useReportStore();
  const monthDropdownRef = useRef(null);
  const isAnyDropdownOpen = isMonthOpen;
  const monthOptions = [
    { label: "JANUARY" },
    { label: "FEBRUARY" },
    { label: "MARCH" },
    { label: "APRIL" },
    { label: "MAY" },
    { label: "JUNE" },
    { label: "JULY" },
    { label: "AUGUST" },
    { label: "SEPTEMBER" },
    { label: "OCTOBER" },
    { label: "NOVEMBER" },
    { label: "DECEMBER" },
  ];

  const handlePerformanceReview = async () => {
    try {
      const staffId = plans[0]?.user_id || staff?.id;
      const departmentId = staff?.department_id; // Fallback department ID if not available

      if (!staffId) {
        console.error("No staff ID available");
        return;
      }

      console.log("Generating performance report for:", {
        staffId,
        departmentId,
        month: selectedMonth,
        week: activeWeek,
      });

      // Send data to backend
      const response = await fetchReport(
        staffId,
        departmentId,
        selectedMonth,
        activeWeek
      );

      if (response.success) {
        // Navigate to performance review page after successful API call
        console.log(
          "Performance report generated frontend successfully:",
          response.data
        );

        router.push(
          `/admin/permsec/dashboard/${staffId}/workplan/${departmentId}/reviews/${departmentId}?month=${selectedMonth}&week=${activeWeek}`
        );
      }
    } catch (error) {
      console.error("Failed to generate performance report:", error);
      // Optionally show user-friendly error message
      alert("Failed to generate performance report. Please try again.");
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

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [activeWeek, setActiveWeek] = useState(getCurrentWeekOfMonth());

  // Handle Month selection
  const handleMonthSelect = (month) => {
    setSelectedMonth(month.label);
    setIsMonthOpen(false);
    const staffId = plans[0]?.user_id || staff?.id; // Try multiple sources for staffId
    const departmentId = staff?.department_id; // Fallback department ID if not available
    const unit_id = staff?.unit_id; // Fallback unit ID if not available

    console.log(
      "Selecting month:",
      month.label,
      "for staff:",
      staffId,
      "department:",
      departmentId,

      "week:",
      activeWeek
    );
    fetchStaffTasks(staffId, departmentId, unit_id, month.label, activeWeek); // Use activeWeek as is (already in WEEK_X format)
  };

  // Handle Week selection
  const handleWeekSelect = (week) => {
    const weekString = `WEEK_${week}`; // Convert number to WEEK_X format
    setActiveWeek(weekString);
    const staffId = plans[0]?.user_id || staff?.id || "123"; // Try multiple sources for staffId
    const departmentId = staff?.department_id || "defaultDepartment"; // Fallback department ID if not available
    const unitId = staff?.unit_id || "defaultUnit"; // Fallback unit ID if not available

    console.log(
      "Selecting week:",
      weekString,
      "for staff:",
      staffId,
      "department:",
      departmentId,
      "month:",
      selectedMonth
    );
    fetchStaffTasks(staffId, departmentId, unitId, selectedMonth, weekString); // Always fetch fresh data
  };

  useEffect(() => {
    // Only fetch on initial load with proper staff ID
    const staffId = plans[0]?.user_id || staff?.id || "123";
    const departmentId = staff?.department_id || "defaultDepartment"; // Fallback department ID if not available
    const unitId = staff?.unit_id || "defaultUnit"; // Fallback unit ID if not available

    console.log(
      "Initial fetch for staff:",
      staffId,
      "month:",
      unitId,
      "unit:",
      departmentId,
      "department:",
      "month:",
      selectedMonth,
      "week:",
      activeWeek
    );
    fetchStaffTasks(staffId, departmentId, unitId, selectedMonth, activeWeek);
  }, [fetchStaffTasks]); // Remove dependencies to prevent infinite loops

  // useEffect(() => {
  //   fetchStaffTasks();
  // }, [fetchStaffTasks]);
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
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-flag-green";
      case "in progress":
      case "in_progress":
        return "bg-blue-800";
      case "pending":
        return "bg-red-600";
      default:
        return "bg-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-flag-green";
      case "in progress":
      case "in_progress":
        return "text-blue-800";
      case "pending":
        return "text-red-600";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {staff?.employee_id}
            </h1>
            <span>{staff?.role}</span>
            <br></br>
            {/* <span>{plans[0]?.user_id}</span> */}
          </div>
          <button
            onClick={handlePerformanceReview}
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-flag-green hover:bg-flag-green-dark"
            } text-white px-6 py-4 rounded text-sm font-medium transition-colors`}
          >
            {loading ? "Generating..." : "Performance Review"}
          </button>
        </div>

        {/* Month and Week Selection */}
        <div className="bg-white rounded-lg shadow-sm  mb-6">
          <div className="p-4 ">
            <div className="md:flex items-center  space-x-6">
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
              <div className="flex  ">
                {[1, 2, 3, 4].map((week) => (
                  <button
                    key={week}
                    onClick={() => handleWeekSelect(week)}
                    className={`px-2 py-2 text-sm font-medium rounded ${
                      activeWeek === `WEEK_${week}` // Compare with WEEK_X format
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
            {loading ? (
              // Loading state
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-500">Loading tasks...</div>
              </div>
            ) : tasks.length === 0 ? (
              // No tasks found
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-gray-500 text-lg mb-2">No tasks found</div>
                <div className="text-gray-400 text-sm">
                  No tasks are scheduled for {selectedMonth} Week{" "}
                  {activeWeek.replace("WEEK_", "")}
                </div>
                {/* Debug info - remove this in production */}
                {/* <div className="text-xs text-gray-300 mt-4">
                  Debug: Staff ID: {plans[0]?.user_id || staff?.id || "123"} |
                  Month: {selectedMonth} | Week: {activeWeek}
                </div> */}
              </div>
            ) : (
              // Tasks table
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold">Day</th>
                    <th className="text-left py-3 px-4 font-semibold">Task</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Expected Outcome
                    </th>
                    {/* <th className="text-left py-3 px-4 font-semibold">Tools</th> */}
                    <th className="text-left py-3 px-4 font-semibold">
                      Priority
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">Time</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Status
                    </th>
                    {/* <th className="text-left py-3 px-4 font-semibold">
                      Constraints
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(
                    tasks.reduce((grouped, task) => {
                      const dayKey = task.day || "Not set";
                      if (!grouped[dayKey]) {
                        grouped[dayKey] = [];
                      }
                      grouped[dayKey].push(task);
                      return grouped;
                    }, {})
                  ).map(([day, dayTasks]) =>
                    dayTasks.map((task, index) => (
                      <tr
                        key={task.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        {index === 0 ? (
                          <td
                            className="py-3 px-4 text-sm text-gray-900 border-b border-gray-600"
                            rowSpan={dayTasks.length}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{day}</span>
                              <span className="text-gray-600">
                                {task.date || "Not set"}
                              </span>
                            </div>
                          </td>
                        ) : null}
                        <td className="px-6 py-4 text-sm  border-b border-gray-600 max-w-xs">
                          <div
                            className="truncate"
                            title={task.title || task.name}
                          >
                            {task.title || task.name || "No title"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm  max-w-xs border-b border-gray-600">
                          <div
                            className="truncate"
                            title={task.description || task.notes}
                          >
                            {task.description || task.notes || "No description"}
                          </div>
                        </td>
                        {/* <td className="py-3 px-4 text-sm border-b border-gray-600">
                          {task.tools || task.tool || "Not set"}
                        </td> */}
                        <td className="py-3 px-4 text-sm border-b border-gray-600">
                          {task.priority || "Not set"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-b border-gray-600">
                          {task.startTime && task.endTime
                            ? `${task.startTime} - ${task.endTime}`
                            : task.startTime || task.time || "Not set"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-600">
                          <div className="flex items-center">
                            <span
                              className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${getStatusDot(
                                task.status
                              )}`}
                            ></span>
                            <span
                              className={`text-xs font-medium ${getStatusColor(
                                task.status
                              )}`}
                            >
                              {task.status || "Pending"}
                            </span>
                          </div>
                        </td>
                        {/* <td className="py-3 px-4 text-sm border-b border-gray-600">
                          {task.constraints || "None"}
                        </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
