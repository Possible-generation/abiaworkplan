"use client";

import { useState, useEffect, useRef } from "react";
import { useTaskStore } from "../../../store/taskStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, ChevronDown } from "lucide-react";

export default function DashboardPage() {
  function getCurrentWeekOfMonth() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const dayOfMonth = today.getDate();
    const dayOfWeek = firstDay.getDay();
    const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return Math.ceil((dayOfMonth + offset) / 7);
  }

  // const [selectedMonths, setSelectedMonths] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeekOfMonth());

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

  const {
    getTasksForMonth,
    getWeeklyBreakdown,
    getAllTasks,
    getTasksForWeek,
    getWeeksInMonth,
  } = useTaskStore();

  // const currentMonth = selectedMonths.getMonth();
  // const currentYear = selectedMonth.getFullYear();

  // const monthTasks = getTasksForMonth(currentMonths, currentYear);

  const weekTasks = getTasksForWeek(selectedWeek);
  const displayTasks = weekTasks;

  // const totalTasks = monthTasks.length;
  // const completedTasks = monthTasks.filter(
  //   (t) => t.status === "completed"
  // ).length;
  // const inProgressTasks = monthTasks.filter(
  //   (t) => t.status === "in-progress"
  // ).length;
  // const pendingTasks = monthTasks.filter((t) => t.status === "pending").length;
  // const completionRate =
  //   totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  const StatCard = ({ title, value }) => (
    <div className="bg-white p-3 rounded">
      <div className="text-center">
        <p className="font-semibold">{title}</p>
        <p className="text-gray-800">{value}</p>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-flag-green";
      case "in-progress":
        return "text-blue-800";
      case "pending":
        return "text-orange-800";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="bg-gray-100 md:px-10 px-4  py-6 ">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between mt-6 md:items-center">
        <h1 className=" font-bold text-gray-900 bg-white p-4 rounded ">
          Welcome Back!!
        </h1>
        <button
          onClick={() => router.push("/weeklyplan/addtask")}
          className="bg-flag-green text-white px-4 py-2 flex justify-center items-center  gap-2 rounded-md hover:bg-flag-green-dark transition-colors duration-200"
          // disabled={currentWeekCompleted}
          // className={`px-4 py-2 rounded-md text-sm font-medium ${
          //   currentWeekCompleted
          //     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          //     : "bg-flag-green text-white hover:bg-blue-700"
          // }`}
        >
          <span className="hidden md:inline text-[30px]">+</span>
          Add New Task
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard title="Total Tasks Planned" value="24" />
        <StatCard title="Tasks Completed" value="12" />
        <StatCard title="In Progress" value="8" />
        <StatCard title="Not Started" value="4" />
      </div>

      {/* Week Buttons */}
      <div className="md:flex gap-10 items-center mb-8 bg-white p-4  rounded">
        <div className="mt-4 sm:mt-0 grid items-center space-y-2 mb-4 md:mb-0">
          <p className="text-sm">Month</p>
          {/* <DatePicker
            selected={selectedMonth}
            onChange={(date) => {
              setSelectedMonth(date);
              setSelectedWeek(1); // Reset to week 1
            }}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}

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
        </div>
        <div className=" ">
          <div className="grid grid-cols-5 place-items-center item-center gap-3">
            {[1, 2, 3, 4].map((week) => (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={` font-bold transition-colors ${
                  selectedWeek === week
                    ? "text-flag-green"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
              >
                Week {week}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        {displayTasks.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No tasks for Week {selectedWeek}.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Day</th>
                  <th className="text-left py-3 px-4 font-semibold">Task</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Tools</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Priority
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Constraints
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900">
                      <div className="flex flex-col">
                        <span>{task.day || "Not set"}</span>
                        <span>{task.date || "Not set"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{task.title}</td>
                    <td className="py-3 px-4 text-sm">{task.description}</td>
                    <td className="py-3 px-4 text-sm">
                      {task.tools || "Not set"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {task.priority || "Not set"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {task.startTime && task.endTime
                        ? `${task.startTime} - ${task.endTime}`
                        : "Not set"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status || "pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
