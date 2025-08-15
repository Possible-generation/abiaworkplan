"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTaskStore } from "../../../store/taskStore";
import TaskModal from "../../../components/taskModa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  PencilLine,
  SlidersHorizontal,
  ListFilter,
  ChevronDown,
} from "lucide-react";

function getCurrentWeekOfMonth() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const dayOfMonth = today.getDate();
  const dayOfWeek = firstDay.getDay();
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  return Math.ceil((dayOfMonth + offset) / 7);
}

export default function WeekTasksPage() {
  const router = useRouter();
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All Tasks");
  const [selectedSort, setSelectedSort] = useState("Priority");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("August");

  const statusDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const monthDropdownRef = useRef(null);

  const isAnyDropdownOpen = isStatusOpen || isSortOpen || isMonthOpen;

  //
  const [dateFilter, setDateFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const {
    getFilteredTasks,
    hasCompletedWeeklyPlan,
    getWeekDates,
    getAllTasks,
  } = useTaskStore();
  // const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeekOfMonth());
  const currentWeekCompleted = hasCompletedWeeklyPlan();
  const weekDates = getWeekDates();

  const filteredTasks = getFilteredTasks(
    dateFilter,
    statusFilter,
    priorityFilter
  );

  const allTasks = getAllTasks(); // For debugging

  // Status options for filtering tasks
  const statusOptions = [
    { label: "All Tasks" },
    { label: "Pending" },
    { label: "In progress" },
    { label: "Completed" },
  ];

  const sortOptions = [
    { label: "Priority" },
    { label: "Low" },
    { label: "Medium" },
    { label: "High" },
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

  // Close dropdowns on escape key
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsMonthOpen(false);
    }
  };

  // Debug log
  useEffect(() => {
    console.log("All tasks in week view:", allTasks);
    console.log("Filtered tasks:", filteredTasks);
    console.log("Date filter:", dateFilter);
    console.log("Week dates:", weekDates);
  }, [allTasks, filteredTasks, dateFilter, weekDates]);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };
  const getStatusDot = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-flag-green";
      case "in progress":
        return "bg-blue-800";
      case "pending":
        return "bg-red-500";
      default:
        return "bg-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return " text-flag-green";
      case "in-progress":
        return "text-blue-800";
      case "pending":
        return " text-orange-800";
      default:
        return " text-gray-800";
    }
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
              background-color: #8B4513;
              margin: 0 auto 8px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 10px;
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
            .task-row {
              page-break-inside: avoid;
            }
            .day-cell {
              font-weight: bold;
            }
            .status-completed {
              color: #16a34a;
              font-weight: bold;
            }
            .status-progress {
              color: #2563eb;
              font-weight: bold;
            }
            .status-pending {
              color: #dc2626;
              font-weight: bold;
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
            <div class="logo-placeholder">LOGO</div>
            <div class="work-plan-title">WORK PLAN</div>
            <div class="ministry-title">Ministry of Agriculture</div>
            <div class="week-plan">Week Plan</div>
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
                <th>Day</th>
                <th>Tasks</th>
                <th>Notes</th>
                <th>Tool</th>
                <th>Priority</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredTasks
                .map((day) =>
                  day.tasks
                    .map(
                      (task, index) => `
                  <tr class="task-row">
                    <td class="day-cell">${
                      index === 0 ? day.day + "<br/>" + day.date : ""
                    }</td>
                    <td>${task.name}</td>
                    <td>${task.notes}</td>
                    <td>${task.tool}</td>
                    <td>${task.priority}</td>
                    <td>${task.time}</td>
                    <td class="status-${task.status
                      .toLowerCase()
                      .replace(" ", "")}">${task.status}</td>
                  </tr>
                `
                    )
                    .join("")
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
      day: "Monday",
      date: "04/08/2025",
      tasks: [
        {
          name: "Review emails and prioritize audit task",
          notes: "Check for new requests or update",
          tool: "Outlook, Notion",
          priority: "Medium",
          time: "9:00am - 10:00am",
          status: "Completed",
        },
        {
          name: "Follow up on prior audit findings",
          notes: "Contact Finance and Procurement teams",
          tool: "Email, Excel",
          priority: "High",
          time: "10:00am - 12:00pm",
          status: "In progress",
        },
        {
          name: "Conduct risk assessment planning",
          notes: "Identify high risk areas for Q3 audit",
          tool: "Risk matrix, Google sheet",
          priority: "High",
          time: "01:00pm - 03:00pm",
          status: "Pending",
        },
      ],
    },
    {
      day: "Tuesday",
      date: "05/08/2025",
      tasks: [
        {
          name: "Field audit",
          notes: "Onsite review or via ERP",
          tool: "ERP system, Notepad",
          priority: "High",
          time: "9:00am - 11:00am",
          status: "Pending",
        },
        {
          name: "Interview key stakeholders",
          notes: "CFO and Accountant general",
          tool: "Google Meet, Voice Recorder",
          priority: "High",
          time: "11:00am - 01:00pm",
          status: "Pending",
        },
        {
          name: "Analyze evidence and collect transactions",
          notes: "Match with controls",
          tool: "Excel, Audit Software",
          priority: "High",
          time: "01:00pm - 03:00pm",
          status: "In progress",
        },
      ],
    },
    {
      day: "Wednesday",
      date: "06/08/2025",
      tasks: [
        {
          name: "Team alignment meeting",
          notes: "Discuss blockers, schedule check-in",
          tool: "Team, Miro",
          priority: "High",
          time: "9:00am - 11:00am",
          status: "Completed",
        },
        {
          name: "Review policies/ procedure compliance",
          notes: "Focus on Procurement & Travel policies",
          tool: "PDF reader, MS Word",
          priority: "Medium",
          time: "11:00am - 01:00pm",
          status: "In progress",
        },
        {
          name: "Analyze evidence and collect transactions",
          notes: "Draft audit report for Finance Department",
          tool: "Word, Excel",
          priority: "High",
          time: "01:00pm - 03:00pm",
          status: "Pending",
        },
      ],
    },
    {
      day: "Thursday",
      date: "07/08/2025",
      tasks: [
        {
          name: "Test control effectiveness (sampling)",
          notes: "Use random sample from 3 depts",
          tool: "Excel, Audit Software",
          priority: "High",
          time: "9:00am - 11:00am",
          status: "Pending",
        },
        {
          name: "Perform data analytics",
          notes: "Focus on duplicate payments",
          tool: "Excel, IDEA/ ACL",
          priority: "Medium",
          time: "1:00pm - 3:00pm",
          status: "Completed",
        },
        {
          name: "Continue report compilation",
          notes: "Add graphs & findings",
          tool: "Word, PowerPoint",
          priority: "Medium",
          time: "03:00pm - 04:30pm",
          status: "Pending",
        },
      ],
    },
    {
      day: "Friday",
      date: "08/08/2025",
      tasks: [
        {
          name: "Finalize and submit audit report",
          notes: "Send to supervisor and archive",
          tool: "Email, PDF",
          priority: "High",
          time: "9:00am - 11:00am",
          status: "Pending",
        },
        {
          name: "Review previous audit action items",
          notes: "Check what has been implemented",
          tool: "Trello, Sheets",
          priority: "Medium",
          time: "11:00am - 1:00pm",
          status: "Completed",
        },
        {
          name: "Staff development/ self-learning",
          notes: "Compliance course or audit webinar",
          tool: "LMS, YouTube",
          priority: "Low",
          time: "02:00pm - 04:00pm",
          status: "Pending",
        },
      ],
    },
  ];

  return (
    <>
      <div className="px-4 mt-8 md:px-6 lg:px-8 ">
        {/* Date Filtering Section */}
        <div className="bg-white rounded p-1 mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Work Plan</h2>
        </div>

        <div className="mt-6 bg-white p-4 md:flex grid place-content-center  md:justify-between gap-6 items-center">
          {/* Sort by Priority Dropdown */}
          <div className="">
            <div className="flex items-center space-x-4">
              {/* Filter by Status Dropdown */}
              <div className="relative" ref={statusDropdownRef}>
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <SlidersHorizontal size={16} />
                  <span className="text-sm font-medium">Filter by status</span>
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      setIsStatusOpen(!isStatusOpen);
                      setIsSortOpen(false);
                    }}
                    className="flex items-center justify-between w-40 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
                  >
                    <span className="text-gray-700">{selectedStatus}</span>
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
                              ? "bg-blue-50 text-flag-green"
                              : "text-gray-700"
                          }`}
                        >
                          <span className="mr-2">{option.icon}</span>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sort by Priority Dropdown */}
              <div className="relative " ref={sortDropdownRef}>
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <ListFilter size={16} />
                  <span className="text-sm font-medium">Sort by</span>
                </div>

                <div className="relative" ref={sortDropdownRef}>
                  <button
                    onClick={() => {
                      setIsSortOpen(!isSortOpen);
                      setIsStatusOpen(false);
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
          </div>

          {/* <div className="flex space-x-4">
          <div>
            <label className="block flex font-bold text-center content-center text-gray-700 mb-1">
              <SlidersHorizontal size={15} className="mt-1" />
              <span className="ml-1 grid place-content-center content-center ">
                Filter by Status
              </span>
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-none"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block flex font-bold text-gray-700 mb-1">
              <ListFilter
                size={15}
                className="items-center grid mt-1 content-center"
              />
              <span className="ml-1">Filter by Priority</span>
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none appearance-flag-green focus:ring-none"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div> */}

          <div className="mt-6 md:mt-0 flex space-x-1">
            <button
              onClick={() => router.push("/weeklyplan/addtask")}
              disabled={currentWeekCompleted}
              className={`px-2  rounded-md text-sm flex justify-center items-center   ${
                currentWeekCompleted
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-flag-green text-white "
              }`}
            >
              <span className="hidden md:inline text-[30px]">+</span>
              Add New Task
            </button>
            <button
              onClick={exportToPDF}
              className=" px-2 rounded-md border border-gray-400 text-sm  text-gray-300 flex justify-center items-center "
            >
              <span>Export Work Plan</span>
            </button>

            {/* {currentWeekCompleted && ( */}
            <button
              onClick={() => router.push("/weeklyplan/reviewreport")}
              className="px-2 py-2 bg-flag-green text-white rounded-md text-sm hover:bg-green-700"
            >
              Review Performance
            </button>
            {/* )} */}
          </div>
        </div>

        <div className="md:flex gap-10 lg:mt-10 mt-8  items-center mb-8 bg-white p-4  rounded">
          <div className="mt-4 sm:mt-0 grid items-center space-y-2 mb-4 md:mb-0">
            <p className="text-sm">Month</p>

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
            <div className="grid grid-cols-4 font-bold place-items-center item-center gap-3">
              {[1, 2, 3, 4].map((week) => (
                <button
                  key={week}
                  // i remove onclick function
                  className={` font-meduim transition-colors ${
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

        {/* Tasks Grid */}
        <div className="mt-6">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No tasks found matching your filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left  font-semibold tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left font-semibold tracking-wider">
                      Day
                    </th>
                    <th className="px-6 py-3 text-left font-semibold tracking-wider">
                      Task
                    </th>
                    <th className="px-6 py-3 text-left ffont-semibold  tracking-wider">
                      Note
                    </th>
                    <th className="px-6 py-3 text-left  font-semibold tracking-wider">
                      Tools
                    </th>
                    <th className="px-6 py-3 text-left font-semibold tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left font-semibold tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left  font-semibold tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left font-semibold tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left font-semibold tracking-wider">
                      Constraints
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {task.date || "Not set"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {task.day}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {task.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                        {task.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {task.tools}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {task.priority || "Not set"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {task.startTime && task.endTime
                          ? `${task.startTime} - ${task.endTime}`
                          : "Not set"}
                      </td>
                      <td className="px-6 flex py-4 whitespace-nowrap">
                        <span
                          className={`inline-block w-2.5 h-2.5  my-2  rounded-full ${getStatusDot(
                            task.status
                          )}`}
                        ></span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status || "pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="text-flag-green  hover:border hover:border-flag-green  px-3 py-1 rounded-lg  font-normal inline-flex items-center"
                        >
                          <PencilLine className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {task.constraints || "Not set"}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* <tbody>
            {data.map((day, dayIndex) =>
              day.tasks.map((task, taskIndex) => (
                <tr key={`${dayIndex}-${taskIndex}`} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 font-medium align-top">
                    {taskIndex === 0 ? (
                      <>
                        <div className="font-bold">{day.day}</div>
                        <div className="text-xs text-gray-600">{day.date}</div>
                      </>
                    ) : ''}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700 align-top">
                    {task.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700 align-top">
                    {task.notes}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700 align-top">
                    {task.tool}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700 align-top">
                    {task.priority}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700 align-top">
                    {task.time}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm align-top">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusDot(task.status)}`}></div>
                      <span className={`font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody> */}
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

      {/* Blur Overlay */}
      {/* {isAnyDropdownOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-opacity-50"
          onClick={() => {
            setIsStatusOpen(false);
            setIsSortOpen(false);
          }}
        />
      )} */}
    </>
  );
}
