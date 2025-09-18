"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressTracker from "../../../../components/progressiontracker";
import { CircleCheck } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import useWorkplanStore from "../../../../store/workplanStore";
import { getWeekDates } from "../../../../utils/dateHelpers";

import { date } from "yup";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function AddTaskPage() {
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [modalCurrentDay, setModalCurrentDay] = useState(0);
  const [editingTask, setEditingTask] = useState(null);
  const [showSubmittedModal, setShowSubmittedModal] = useState(false);
  const { createWorkplan, loading } = useWorkplanStore();

  const weekDates = getWeekDates();
  // Initialize empty tasks array for each day
  const [tasksByDay, setTasksByDay] = useState(DAYS.map(() => []));

  // Current task form state
  const [currentTask, setCurrentTask] = useState({
    title: "",
    notes: "",
    tools: "",
    priority: "medium",
    // time: "08:00",
    startTime: "08:00",
    endTime: "09:00",
    status: "pending",
    constraints: "",
  });

  // Reset current task form
  const resetCurrentTask = () => {
    setCurrentTask({
      title: "",
      notes: "",
      tools: "",
      priority: "medium",
      startTime: "08:00",
      endTime: "09:00",
      status: "pending",
      constraints: "",
    });
  };

  // Handle current task input changes
  const handleCurrentTaskChange = (field, value) => {
    setCurrentTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add task to current day
  const addTaskToDay = () => {
    // Validate all required fields
    const requiredFields = [
      { field: "title", name: "Task Title" },
      { field: "notes", name: "Notes" },
      // { field: "tools", name: "Tools" },
      // { field: "constraints", name: "Constraints" },
    ];

    for (const { field, name } of requiredFields) {
      if (!currentTask[field].trim()) {
        toast.error(`${name} is required!`);
        return;
      }
    }

    const newTask = {
      id: Date.now() + Math.random(),
      ...currentTask,
      time: `${currentTask.startTime} - ${currentTask.endTime}`,
    };

    const updated = [...tasksByDay];
    updated[currentDay].push(newTask);
    setTasksByDay(updated);
    resetCurrentTask();
    toast.success("Task added successfully!");
  };

  // Remove task by ID
  const removeTaskById = (dayIndex, taskId) => {
    const updated = [...tasksByDay];
    updated[dayIndex] = updated[dayIndex].filter((task) => task.id !== taskId);
    setTasksByDay(updated);
  };

  const handleFinalSubmit = async () => {
    try {
      const plans = [];
      DAYS.forEach((dayName, dayIndex) => {
        const dayTasks = tasksByDay[dayIndex] || [];
        if (dayTasks.length > 0) {
          plans.push({
            day: dayName.toUpperCase(),
            task: dayTasks.map((task) => ({
              title: task.title,
              notes: task.notes || "",

              priority: task.priority.toUpperCase(),
              time: task.time,
              status: task.status.toUpperCase(),

              date: weekDates[dayName.toUpperCase()],
            })),
          });
        }
      });

      const result = await createWorkplan(plans);
      console.log("Workplan created successfully:", result);
      toast.success("Task created successfully!");

      if (result.success) {
        setShowReviewModal(false);
        setShowSubmittedModal(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  // Edit task functions - Now properly loads existing task data
  const handleEditTask = (dayName, task) => {
    setEditingTask({
      dayName,
      task: { ...task }, // Create a copy of the task to avoid direct mutation
    });
  };

  const handleSaveEditTask = () => {
    if (editingTask && editingTask.task.title.trim()) {
      // Validate all required fields for editing
      const requiredFields = [
        { field: "title", name: "Task Title" },
        { field: "notes", name: "Notes" },
        // { field: "tools", name: "Tools" },
        // { field: "constraints", name: "Constraints" },
      ];

      for (const { field, name } of requiredFields) {
        if (!editingTask.task[field] || !editingTask.task[field].trim()) {
          toast.error(`${name} is required!`);
          return;
        }
      }

      const dayIndex = DAYS.indexOf(editingTask.dayName);
      const updated = [...tasksByDay];
      const taskIndex = updated[dayIndex].findIndex(
        (t) => t.id === editingTask.task.id
      );

      if (taskIndex !== -1) {
        // updated[dayIndex][taskIndex] = editingTask.task;
        updated[dayIndex][taskIndex] = {
          ...editingTask.task,
          time: `${editingTask.task.startTime} - ${editingTask.task.endTime}`,
        };
        setTasksByDay(updated);
        toast.success("Task updated successfully!");
      }
      setEditingTask(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleEditTaskChange = (field, value) => {
    setEditingTask((prev) => ({
      ...prev,
      task: {
        ...prev.task,
        [field]: value,
      },
    }));
  };

  // Check if can proceed to next day
  const canProceed = () => {
    const currentDayTasks = tasksByDay[currentDay] || [];
    return currentDayTasks.length > 0;
  };

  // Navigation functions
  const handleNext = () => {
    if (canProceed() && currentDay < DAYS.length - 1) {
      setCurrentDay((prev) => prev + 1);
      resetCurrentTask();
    }
  };

  const handlePrevious = () => {
    if (currentDay > 0) {
      setCurrentDay((prev) => prev - 1);
      resetCurrentTask();
    }
  };

  const handleShowReview = () => {
    setShowReviewModal(true);
    setModalCurrentDay(0);
  };

  // // Generate time options
  // const timeOptions = [];
  // for (let i = 8; i <= 18; i++) {
  //   timeOptions.push(`${i.toString().padStart(2, "0")}:00`);
  // }

  // Generate time options every 30 minutes
  const timeOptions = [];
  for (let i = 8; i <= 18; i++) {
    timeOptions.push(`${i.toString().padStart(2, "0")}:00`);
    if (i < 18) {
      timeOptions.push(`${i.toString().padStart(2, "0")}:30`);
    }
  }

  const currentDayName = DAYS[currentDay];
  const currentDayTasks = tasksByDay[currentDay] || [];
  const modalCurrentDayName = DAYS[modalCurrentDay];
  const modalCurrentDayTasks = tasksByDay[modalCurrentDay] || [];

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Add New Task
          </h1>

          <ProgressTracker currentDay={currentDay} days={DAYS} />

          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900">
              Add Task for {currentDayName}
            </h2>

            <ToastContainer />

            {/* Task Form */}
            <div className="space-y-4 mb-6 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  value={currentTask.title}
                  onChange={(e) =>
                    handleCurrentTaskChange("title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Outcomes *
                </label>
                <textarea
                  value={currentTask.notes}
                  onChange={(e) =>
                    handleCurrentTaskChange("notes", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                  rows="3"
                  placeholder="Enter Expected Outcomes"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={currentTask.status}
                    onChange={(e) =>
                      handleCurrentTaskChange("status", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tools *
                  </label>
                  <input
                    type="text"
                    value={currentTask.tools}
                    onChange={(e) =>
                      handleCurrentTaskChange("tools", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                    placeholder="Required tools"
                    required
                  />
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={currentTask.priority}
                    onChange={(e) =>
                      handleCurrentTaskChange("priority", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              {/* 
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <select
                    value={currentTask.time}
                    onChange={(e) =>
                      handleCurrentTaskChange("time", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flag-green"
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <select
                    value={currentTask.startTime}
                    onChange={(e) =>
                      handleCurrentTaskChange("startTime", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flag-green"
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <select
                    value={currentTask.endTime}
                    onChange={(e) =>
                      handleCurrentTaskChange("endTime", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flag-green"
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Constraints *
                  </label>
                  <input
                    type="text"
                    value={currentTask.constraints}
                    onChange={(e) =>
                      handleCurrentTaskChange("constraints", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flag-green"
                    placeholder="Any constraints"
                    required
                  />
                </div> */}
              </div>

              <button
                onClick={addTaskToDay}
                className="w-full bg-flag-green text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-flag-green"
              >
                Add Task
              </button>
            </div>

            {/* Added Tasks Preview */}
            {currentDayTasks.length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-900 mb-3">
                  Tasks for {currentDayName} ({currentDayTasks.length})
                </h3>
                <div className="space-y-2">
                  {currentDayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                    >
                      <div>
                        <span className="font-medium">{task.title}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({task.priority} priority, {task.time})
                        </span>
                      </div>
                      <button
                        onClick={() => removeTaskById(currentDay, task.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentDay === 0}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentDay === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                Previous
              </button>

              {currentDay === DAYS.length - 1 ? (
                <button
                  onClick={handleShowReview}
                  disabled={!canProceed()}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    canProceed()
                      ? "bg-flag-green text-white hover:bg-green-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Review & Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    canProceed()
                      ? "bg-flag-green text-white hover:bg-green-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next Day
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Review Weekly Tasks - {modalCurrentDayName}
                </h2>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {modalCurrentDayTasks.length > 0 ? (
                <div className="space-y-4">
                  {modalCurrentDayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      {editingTask && editingTask.task.id === task.id ? (
                        /* Edit Form */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-700 mb-1">
                              Task Title *
                            </label>
                            <input
                              type="text"
                              value={editingTask.task.title}
                              onChange={(e) =>
                                handleEditTaskChange("title", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                              required
                            />
                          </div>

                          <div>
                            <label className="block  text-gray-700 mb-1">
                              Expected Outcomes *
                            </label>
                            <textarea
                              value={editingTask.task.notes || ""}
                              onChange={(e) =>
                                handleEditTaskChange("notes", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                              rows="3"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-700 mb-1">
                                Status
                              </label>
                              <select
                                value={editingTask.task.status}
                                onChange={(e) =>
                                  handleEditTaskChange("status", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                              >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                              </select>
                            </div>
                            {/* <div>
                              <label className="block font-normal text-gray-700 mb-1">
                                Tools *
                              </label>
                              <input
                                type="text"
                                value={editingTask.task.tools || ""}
                                onChange={(e) =>
                                  handleEditTaskChange("tools", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                                required
                              />
                            </div> */}

                            <div>
                              <label className="block font-normal text-gray-700 mb-1">
                                Priority
                              </label>
                              <select
                                value={editingTask.task.priority}
                                onChange={(e) =>
                                  handleEditTaskChange(
                                    "priority",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                              >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>
                            </div>
                          </div>
                          {/* 
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Time
                              </label>
                              <select
                                value={editingTask.task.time}
                                onChange={(e) =>
                                  handleEditTaskChange("time", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                              >
                                {timeOptions.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div> */}

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block  text-gray-700 mb-1">
                                Start Time
                              </label>
                              <select
                                value={
                                  editingTask.task.startTime ||
                                  editingTask.task.time?.split(" - ")[0]
                                }
                                onChange={(e) =>
                                  handleEditTaskChange(
                                    "startTime",
                                    e.target.value
                                  )
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flag-green"
                              >
                                {timeOptions.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-1">
                                End Time
                              </label>
                              <select
                                value={
                                  editingTask.task.endTime ||
                                  editingTask.task.time?.split(" - ")[1]
                                }
                                onChange={(e) =>
                                  handleEditTaskChange(
                                    "endTime",
                                    e.target.value
                                  )
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flag-green"
                              >
                                {timeOptions.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          {/* 
                          <div>
                            <label className="block text-sm font-normal text-gray-700 mb-1">
                              Constraints *
                            </label>
                            <input
                              type="text"
                              value={editingTask.task.constraints || ""}
                              onChange={(e) =>
                                handleEditTaskChange(
                                  "constraints",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
                              required
                            />
                          </div> */}

                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveEditTask}
                              className="px-4 py-2 bg-flag-green text-white rounded-md hover:bg-flag-green-dark text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Task Display */
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-medium text-gray-900">
                              {task.title}
                            </h4>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleEditTask(modalCurrentDayName, task)
                                }
                                className="text-flag-green hover:text-green-700 text-sm"
                              >
                                Edit
                              </button>
                              {/* <button
                                onClick={() => {
                                  const dayIndex =
                                    DAYS.indexOf(modalCurrentDayName);
                                  removeTaskById(dayIndex, task.id);
                                }}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Delete
                              </button> */}
                            </div>
                          </div>

                          {task.notes && (
                            <p className="text-gray-600 mb-2">{task.notes}</p>
                          )}

                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>
                              Priority:{" "}
                              <span className="font-medium">
                                {task.priority}
                              </span>
                            </span>
                            <span>
                              Time:{" "}
                              <span className="font-medium">{task.time}</span>
                            </span>
                            <span>
                              Status:{" "}
                              <span className="font-medium">{task.status}</span>
                            </span>
                            {/* {task.tools && (
                              <span>
                                Tools:{" "}
                                <span className="font-medium">
                                  {task.tools}
                                </span>
                              </span>
                            )} */}
                            {/* {task.constraints && (
                              <span>
                                Constraints:{" "}
                                <span className="font-medium">
                                  {task.constraints}
                                </span>
                              </span>
                            )} */}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No tasks added for {modalCurrentDayName}
                </div>
              )}
            </div>

            {/* Modal Footer with Pagination */}
            <div className="p-2 md:p-6 border-t  bg-gray-50">
              <div className="flex justify-between gap-2 items-center">
                {/* Pagination */}
                <div className="flex gap-1">
                  {DAYS.map((day, index) => (
                    <button
                      key={day}
                      onClick={() => setModalCurrentDay(index)}
                      className={`w-10 h-10 rounded-md text-sm font-medium ${
                        modalCurrentDay === index
                          ? "bg-flag-green text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleFinalSubmit}
                  disabled={loading}
                  className=" md:px-6 py-2 bg-flag-green text-white rounded-md hover:bg-green-700 font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Workplan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSubmittedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white items-center rounded-lg p-6 max-w-sm mx-auto grid place-items-center">
            <CircleCheck size={48} className="text-green-500 mb-4" />
            <div>
              <h2 className=" font-semibold text-gray-900 mb-4">
                Workplan Submitted Successfully!
              </h2>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowSubmittedModal(false);
                  router.push("/weeklyplan");
                }}
                className="px-6 py-2  text-flag-green"
              >
                Download workplan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
