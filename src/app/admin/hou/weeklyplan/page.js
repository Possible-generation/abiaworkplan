"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useTaskFilterStore from "../../../../store/admin/hou/useTaskFilterStore";
import TaskModal from "../../../../components/hou/taskModa";
import "react-datepicker/dist/react-datepicker.css";
import {
  PencilLine,
  SlidersHorizontal,
  ListFilter,
  ChevronDown,
  Loader2,
} from "lucide-react";
// import useUserStore from "../../../store/useUserStore";

export default function WeekTasksPage() {
  const router = useRouter();
  //   const { user } = useUserStore();

  // Zustand store
  const {
    tasks,
    loading,
    error,
    filters,
    selectedWeek,
    selectedMonth,
    fetchTasks,
    setWeek,
    setMonth,
    resetFilters,
  } = useTaskFilterStore();

  // Local UI state
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Refs for dropdown management
  const statusDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const monthDropdownRef = useRef(null);

  const isAnyDropdownOpen = isStatusOpen || isSortOpen || isMonthOpen;

  // Options for dropdowns
  const statusOptions = [
    { label: "All Tasks", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Completed", value: "COMPLETED" },
  ];

  const priorityOptions = [
    { label: "All Priority", value: "ALL" },
    { label: "High", value: "HIGH" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Low", value: "LOW" },
  ];

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

  const weekOptions = [
    { label: "Week 1", value: "WEEK_1" },
    { label: "Week 2", value: "WEEK_2" },
    { label: "Week 3", value: "WEEK_3" },
    { label: "Week 4", value: "WEEK_4" },
  ];

  // Get display labels for selected values
  const selectedStatusLabel =
    statusOptions.find((opt) => opt.value === filters.statusFilter)?.label ||
    "All Tasks";
  const selectedPriorityLabel =
    priorityOptions.find((opt) => opt.value === filters.priorityFilter)
      ?.label || "All Priority";
  const selectedMonthLabel =
    monthOptions.find((opt) => opt.value === selectedMonth)?.label || "August";
  const selectedWeekLabel =
    weekOptions.find((opt) => opt.value === selectedWeek)?.label || "Week 1";

  // Fetch tasks on component mount
  useEffect(() => {
    console.log("Component mounted, fetching initial tasks...");
    fetchTasks();
  }, []);

  // Handle filter changes
  const handleStatusSelect = async (status) => {
    setIsStatusOpen(false);
    console.log("Status filter changed:", status.value);
    try {
      await fetchTasks({
        statusFilter: status.value,
        priorityFilter: filters.priorityFilter,
        week: selectedWeek,
        month: selectedMonth,
      });
    } catch (error) {
      console.error("Failed to apply status filter:", error);
    }
  };

  const handlePrioritySelect = async (priority) => {
    setIsSortOpen(false);
    console.log("Priority filter changed:", priority.value);
    try {
      await fetchTasks({
        statusFilter: filters.statusFilter,
        priorityFilter: priority.value,
        week: selectedWeek,
        month: selectedMonth,
      });
    } catch (error) {
      console.error("Failed to apply priority filter:", error);
    }
  };

  const handleMonthSelect = async (month) => {
    setIsMonthOpen(false);
    console.log("Month changed:", month.value);
    setMonth(month.value);
    try {
      await fetchTasks({
        statusFilter: filters.statusFilter,
        priorityFilter: filters.priorityFilter,
        week: selectedWeek,
        month: month.value,
      });
    } catch (error) {
      console.error("Failed to change month:", error);
    }
  };

  const handleWeekSelect = async (week) => {
    console.log("Week changed from", selectedWeek, "to", week);
    setWeek(week);
    try {
      await fetchTasks({
        statusFilter: filters.statusFilter,
        priorityFilter: filters.priorityFilter,
        week: week,
        month: selectedMonth,
      });
      console.log("Tasks fetched for week:", week);
    } catch (error) {
      console.error("Failed to change week:", error);
    }
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

  const handleEditTask = (task) => {
    // Validate that task exists
    if (!task || !task.id) {
      console.error("Invalid task provided to handleEditTask:", task);
      alert("Invalid task selected. Please try again.");
      return;
    }

    try {
      // Log the task being edited for debugging
      console.log("Opening status update modal for task:", {
        id: task.id,
        title: task.title || task.name,
        currentStatus: task.status,
      });

      // Set the task to be edited
      setEditingTask(task);

      // Open the modal
      setModalOpen(true);

      // Close any open dropdowns when opening modal for better UX
      setIsStatusOpen(false);
      setIsSortOpen(false);
      setIsMonthOpen(false);
    } catch (error) {
      console.error("Error opening status update modal:", error);
      alert("Failed to open status editor. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
    // Refresh tasks after modal close (in case task was updated)
    fetchTasks();
  };

  const getStatusDot = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-flag-green";
      case "in progress":
      case "in_progress":
        return "bg-blue-500";
      case "pending":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-flag-green";
      case "in progress":
      case "in_progress":
        return "text-blue-600";
      case "pending":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // Check if current week is completed
  const currentWeekCompleted = tasks.every(
    (task) => task.status?.toLowerCase() === "completed"
  );

  // Debug info
  useEffect(() => {
    console.log("Current state:", {
      selectedWeek,
      selectedMonth,
      tasksCount: tasks.length,
      loading,
      error,
      filters,
    });
  }, [selectedWeek, selectedMonth, tasks, loading, error, filters]);

  const exportToPDF = () => {
    const printWindow = window.open("", "_blank");
    const currentDate = new Date().toLocaleDateString();

    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title></title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 15px;
            font-size: 11px;
            line-height: 1.3;
          }
          .header {
            text-align: center;
            margin-bottom: 25px;
          }
          .logo-placeholder {
            width: 50px;
            height: 50px;

            margin: 0 auto 8px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 10px;
            padding-bottom: 15px;
          }
          .work-plan-title {
            font-size: 13px;
            font-weight: bold;
            margin: 4px 0;
          }
          .ministry-title {
            font-size: 15px;
            font-weight: bold;
            margin: 4px 0;
            padding-top: 6px;
          }
          .week-plan {
            font-size: 13px;
            margin: 4px 0;
          }
          .info-section {
            display: flex;
            justify-content: space-between;
            margin: 15px 0;
            padding: 8px 0;
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
            margin: 15px 0;
            font-size: 10px;
          }
          th, td {
            border: 1px solid #333;
            padding: 6px;
            text-align: left;
            vertical-align: top;
          }
          th {
            background-color: #f5f5f5;
            font-weight: bold;
            text-align: center;
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
          .status-completed { color: #16a34a; font-weight: bold; }
          .status-progress { color: #2563eb; font-weight: bold; }
          .status-pending { color: #dc2626; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-placeholder">
            <img src="applogo.png" alt="Logo" />
          </div>

          <div class="ministry-title">Ministry of ${user?.ministry?.name}</div>
          <div class="week-plan">${selectedWeekLabel} - ${selectedMonthLabel} 2025</div>
        </div>

        <div class="info-section">
           <div class="info-left">
              <div><strong>Name:</strong> ${user?.employee_id}</div>
              <div><strong>Department:</strong> ${user?.department?.name}</div>
              <div><strong>Role:</strong> Internal Auditor</div>
            </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Task</th>
              <th>Description</th>

              <th>Priority</th>
              <th>Time</th>
              <th>Status</th>

            </tr>
          </thead>
          <tbody>
            ${tasks
              .map(
                (task) => `
              <tr>
                <td>${task.date || "Not set"}</td>
                <td>${task.day || "Not set"}</td>
                <td>${task.title || task.name || "No title"}</td>
                <td>${task.description || task.notes || "No description"}</td>

                <td>${task.priority || "Not set"}</td>
                <td>${task.startTime || task.time || "Not set"}</td>
                <td class="status-${task.status
                  ?.toLowerCase()
                  .replace(" ", "")}">${task.status || "Pending"}</td>

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

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <>
      <div className="px-4 mt-8 md:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded p-4 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Work Plan</h2>
            <p className="text-sm text-gray-600 mt-1">
              Current Selection: {selectedWeekLabel} of {selectedMonthLabel} (
              {tasks.length} tasks)
            </p>
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded">
              {/* {error} */}
              This week task does not exist yet
            </div>
          )}
        </div>

        {/* Filters and Actions */}
        <div className="mt-6 bg-white p-4 md:flex grid place-content-center md:justify-between gap-6 items-center">
          <div className="flex items-center space-x-4">
            {/* Filter by Status Dropdown */}
            <div className="relative" ref={statusDropdownRef}>
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <SlidersHorizontal size={16} />
                <span className="text-sm font-medium">Filter by status</span>
              </div>
              <button
                onClick={() => {
                  setIsStatusOpen(!isStatusOpen);
                  setIsSortOpen(false);
                  setIsMonthOpen(false);
                }}
                className="flex items-center justify-between w-40 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
                disabled={loading}
              >
                <span className="text-gray-700">{selectedStatusLabel}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {isStatusOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {statusOptions.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => handleStatusSelect(option)}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                        index === 0 ? "rounded-t-lg" : ""
                      } ${
                        index === statusOptions.length - 1
                          ? "rounded-b-lg"
                          : "border-b border-gray-100"
                      } ${
                        filters.statusFilter === option.value
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

            {/* Sort by Priority Dropdown */}
            <div className="relative" ref={sortDropdownRef}>
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <ListFilter size={16} />
                <span className="text-sm font-medium">Filter by priority</span>
              </div>
              <button
                onClick={() => {
                  setIsSortOpen(!isSortOpen);
                  setIsStatusOpen(false);
                  setIsMonthOpen(false);
                }}
                className="flex items-center justify-between w-40 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
                disabled={loading}
              >
                <span className="text-gray-700">{selectedPriorityLabel}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {isSortOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {priorityOptions.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => handlePrioritySelect(option)}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                        index === 0 ? "rounded-t-lg" : ""
                      } ${
                        index === priorityOptions.length - 1
                          ? "rounded-b-lg"
                          : "border-b border-gray-100"
                      } ${
                        filters.priorityFilter === option.value
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

          {/* Action Buttons */}
          <div className="mt-6 md:mt-0 flex space-x-2">
            <button
              onClick={() => router.push("/admin/hou/weeklyplan/addtask")}
              disabled={!currentWeekCompleted} // 🔄 opposite condition
              className={`px-4 cursor-pointer py-2 rounded-md text-sm flex justify-center items-center ${
                !currentWeekCompleted
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-flag-green text-white hover:bg-green-700"
              }`}
            >
              <span className="text-lg mr-1">+</span>
              Add New Task
            </button>

            {/* <button
              onClick={() => router.push("/weeklyplan/addtask")}
              disabled={
                currentWeekCompleted ||
                tasks.some(
                  (task) =>
                    task.week === selectedWeek || currentWeek < selectedWeek
                )
              }
              className={`px-2 py-2 rounded-md text-sm flex justify-center items-center ${
                currentWeekCompleted ||
                tasks.some(
                  (task) =>
                    task.week === selectedWeek || currentWeek < selectedWeek
                )
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-flag-green text-white hover:bg-green-700"
              }`}
            >
              <span className="text-lg hidden md:block">+</span>
              Add New Task
            </button> */}

            {/* <button
              disabled={loading || tasks.length === 0}
              onClick={exportToPDF}
              className="px-2 py-2 rounded-md border border-gray-400 text-sm text-gray-700 hover:bg-flag-green hover:text-white cursor-pointer"
            >
              Export Work Plan
            </button> */}
            <button
              onClick={() => router.push("/admin/hou/weeklyplan/reviewreport")}
              className="px-2 py-2 bg-flag-green text-white rounded-md text-sm cursor-pointer hover:bg-flag-green"
            >
              Review Performance
            </button>
          </div>
        </div>

        {/* Month and Week Selection */}
        <div className="md:flex gap-10 lg:mt-10 mt-8 items-center mb-8 bg-white p-4 rounded">
          <div className="mt-4 sm:mt-0 grid items-center space-y-2 mb-4 md:mb-0">
            <p className="text-sm font-medium">Month</p>
            <div className="relative" ref={monthDropdownRef}>
              <button
                onClick={() => {
                  setIsMonthOpen(!isMonthOpen);
                  setIsStatusOpen(false);
                  setIsSortOpen(false);
                }}
                className="flex items-center justify-between w-32 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
                disabled={loading}
              >
                <span className="text-gray-700">{selectedMonthLabel}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {isMonthOpen && (
                <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {monthOptions.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => handleMonthSelect(option)}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                        index === 0 ? "rounded-t-lg" : ""
                      } ${
                        index === monthOptions.length - 1
                          ? "rounded-b-lg"
                          : "border-b border-gray-100"
                      } ${
                        selectedMonth === option.value
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

          {/* Week Selection */}
          <div>
            <p className="text-sm font-medium mb-2">Week</p>
            <div className="grid grid-cols-4 gap-2">
              {weekOptions.map((week) => (
                <button
                  key={week.value}
                  onClick={() => handleWeekSelect(week.value)}
                  disabled={loading}
                  className={`px-2 py-2 text-sm font-medium rounded transition-colors ${
                    selectedWeek === week.value
                      ? "bg-flag-green text-white"
                      : "text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  }`}
                >
                  {week.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-flag-green" />
              <span className="ml-2 text-gray-600">Loading tasks...</span>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No tasks found for {selectedWeekLabel} of {selectedMonthLabel}.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Try changing the week/month or adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold">Day</th>
                    <th className="text-left py-3 px-4 font-semibold">Task</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Description
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
                    <th className="text-left py-3 px-4 font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
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
                      <tr key={task.id} className="hover:bg-gray-50">
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
                        <td className="px-6 py-4 text-sm max-w-xs border-b border-gray-600">
                          <div
                            className="truncate"
                            title={task.description || task.notes}
                          >
                            {task.description || task.notes || "No description"}
                          </div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-600">
                          {task.tools || task.tool || "Not specified"}
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-600">
                          <span className="px-2 py-1 text-xs font-medium">
                            {task.priority || "Not set"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm  border-b border-gray-600">
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
                        {/* <td className="px-6 py-4 text-sm  max-w-xs border-b ">
                          <div className="truncate" title={task.constraints}>
                            {task.constraints || "None"}
                          </div>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-600">
                          <button
                            onClick={() => handleEditTask(task)}
                            disabled={task.week !== selectedWeek}
                            className={`px-2 py-1 rounded inline-flex items-center text-sm
                ${
                  task.week === selectedWeek
                    ? "text-flag-green hover:text-flag-green-dark hover:bg-flag-green-light"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                          >
                            <PencilLine className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <TaskModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          task={editingTask}
        />
      </div>
    </>
  );
}
