"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import useTaskFilterStore from "../../../../../store/admin/permsec/useTaskFilterStore";
import ProgressTracker from "../../../../../components/progressiontracker";
import { ChevronRight, ChevronLeft } from "lucide-react";
import useReportStore from "../../../../../store/admin/permsec/reportStore";
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Helper function to get current week of month
// const getCurrentWeekOfMonth = () => {
//   const now = new Date();
//   const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//   const firstDayWeekday = firstDayOfMonth.getDay();
//   const currentDate = now.getDate();

//   // Adjust for Monday as start of week (0 = Sunday, 1 = Monday, etc.)
//   const adjustedFirstDay = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;
//   const weekNumber = Math.ceil((currentDate + adjustedFirstDay) / 7);

//   return `WEEK_${Math.min(weekNumber, 4)}`; // Cap at WEEK_4
// };

const getCurrentWeekOfMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // First day of the month
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // Sunday=0, Monday=1, ...

  // Find the date (day number) of the first Monday of the month
  const firstMonday =
    firstDayOfWeek === 0 // if month starts on Sunday
      ? 2
      : firstDayOfWeek === 1 // if month starts on Monday
      ? 1
      : 9 - firstDayOfWeek; // else compute next Monday

  const currentDate = now.getDate();
  const diffDays = currentDate - firstMonday;

  // Week 1 includes all days before the first Monday too
  const weekNumber = diffDays < 0 ? 1 : Math.floor(diffDays / 7) + 1;

  // Clamp to 5 weeks max
  if (weekNumber <= 1) return "WEEK_1";
  if (weekNumber === 2) return "WEEK_2";
  if (weekNumber === 3) return "WEEK_3";
  if (weekNumber === 4) return "WEEK_4";
  return "WEEK_5";
};

// Helper function to get current month
const getCurrentMonth = () => {
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  return months[new Date().getMonth()];
};

// Helper function to convert day names to match the API format
const convertDayToAPIFormat = (dayName) => {
  return dayName.toUpperCase();
};

export default function ReviewTasksPage() {
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState(0);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [currentTaskForReason, setCurrentTaskForReason] = useState(null);
  const [reason, setReason] = useState("");
  const [completionStatus, setCompletionStatus] = useState({});
  const [weeklyTasks, setWeeklyTasks] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [hasTasksToReview, setHasTasksToReview] = useState(false);

  // Always use current week and month for review page
  const currentWeek = getCurrentWeekOfMonth();
  const currentMonth = getCurrentMonth();

  const {
    tasks,
    loading,
    error,
    fetchTasks,
    updateTaskReview,
    fetchPlans,
    populateTasksFromPlans,
    plans,
  } = useTaskFilterStore();

  const { fetchReport } = useReportStore();

  const getCurrentWeekOfMonths = () => {
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
  const getCurrentMonths = () => {
    return new Date().toLocaleString("en-US", { month: "long" }).toUpperCase();
  };

  // Fetch data on component mount only
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Loading data for current week:", {
          currentWeek,
          currentMonth,
          plansLength: plans?.length || 0,
          tasksLength: tasks?.length || 0,
        });

        // Fetch tasks specifically for the current week and month
        console.log("Fetching tasks for current week");
        await fetchTasks({ week: currentWeek, month: currentMonth });
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setDataLoaded(true);
      }
    };

    loadData();
  }, []); // Only run once on mount, using fixed current week/month

  // Organize tasks by day whenever tasks change
  useEffect(() => {
    if (tasks && tasks.length > 0 && currentWeek && currentMonth) {
      // ✅ filter tasks to current week + month
      const currentWeekTasks = tasks.filter(
        (task) => task.week === currentWeek && task.month === currentMonth
      );

      const organizedTasks = {};
      DAYS.forEach((day) => (organizedTasks[day] = []));
      currentWeekTasks.forEach((task) => {
        if (task.day) {
          const dayName = task.day.toLowerCase();
          const capitalizedDay =
            dayName.charAt(0).toUpperCase() + dayName.slice(1);
          if (organizedTasks[capitalizedDay]) {
            organizedTasks[capitalizedDay].push(task);
          }
        }
      });

      setWeeklyTasks(organizedTasks);

      // NEW: Check if there are any tasks to review
      const totalTasks = Object.values(organizedTasks).reduce(
        (sum, dayTasks) => sum + dayTasks.length,
        0
      );
      setHasTasksToReview(totalTasks > 0);
    } else {
      const emptyTasks = {};
      DAYS.forEach((day) => (emptyTasks[day] = []));
      setWeeklyTasks(emptyTasks);
      setHasTasksToReview(false); // No tasks to review
    }
  }, [tasks, currentWeek, currentMonth]); // Fixed: Use currentWeek and currentMonth

  // Check if all days with tasks have been reviewed
  const areAllDaysReviewed = () => {
    // NEW: Don't consider "reviewed" if no tasks exist or data isn't loaded
    if (
      !dataLoaded ||
      !hasTasksToReview ||
      Object.keys(weeklyTasks).length === 0
    ) {
      return false;
    }

    return DAYS.every((dayName) => {
      const dayTasks = weeklyTasks[dayName] || [];
      // If no tasks for this day, consider it reviewed
      if (dayTasks.length === 0) return true;
      // All tasks for this day must have completion status
      return dayTasks.every((task) => completionStatus[task.id]);
    });
  };

  // Check if current day can proceed
  const canProceed = () => {
    const dayName = DAYS[currentDay];
    const dayTasks = weeklyTasks[dayName] || [];
    // If no tasks for current day, can proceed
    if (dayTasks.length === 0) return true;
    // All tasks for current day must be reviewed
    return dayTasks.every((task) => completionStatus[task.id]);
  };

  // Load existing completion status from tasks
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const existingStatus = {};
      tasks.forEach((task) => {
        // Only consider a task "reviewed" if completed is specifically "YES" or "NO"
        if (task.completed === "YES" || task.completed === "NO") {
          existingStatus[task.id] = {
            completed: task.completed === "YES",
            reason: task.reason || null,
          };
        }
        // If completed is null, undefined, empty string, etc., treat as not reviewed yet
      });

      console.log("Loaded existing completion status:", existingStatus);
      setCompletionStatus(existingStatus);
    }
  }, [tasks]);

  // Check if all days are reviewed (for button display, no auto-redirect)
  const allDaysReviewed =
    dataLoaded &&
    hasTasksToReview &&
    Object.keys(weeklyTasks).length > 0 &&
    DAYS.every((dayName) => {
      const dayTasks = weeklyTasks[dayName] || [];
      // If no tasks for this day, consider it reviewed
      if (dayTasks.length === 0) return true;
      // All tasks for this day must have completion status
      return dayTasks.every((task) => completionStatus[task.id]);
    });

  // ✅ Handle completion (Yes/No click)
  const handleTaskCompletion = async (taskId, completed) => {
    if (completed) {
      // Update store (completed = true, no reason)
      const success = await updateTaskReview(taskId, true, null);
      if (success) {
        setCompletionStatus((prev) => ({
          ...prev,
          [taskId]: { completed: true, reason: null },
        }));
      }
    } else {
      // Ask for reason in modal
      setCurrentTaskForReason(taskId);
      setReasonModalOpen(true);
    }
  };

  // ✅ Handle reason submission
  const handleReasonSubmit = async () => {
    if (currentTaskForReason && reason.trim()) {
      const success = await updateTaskReview(
        currentTaskForReason,
        false,
        reason.trim()
      );
      if (success) {
        setCompletionStatus((prev) => ({
          ...prev,
          [currentTaskForReason]: { completed: false, reason: reason.trim() },
        }));
      }
      setReason("");
      setCurrentTaskForReason(null);
      setReasonModalOpen(false);
    }
  };

  const handleNext = () => {
    if (canProceed() && currentDay < DAYS.length - 1) {
      setCurrentDay(currentDay + 1);
    }
  };

  const handlePrevious = () => {
    if (currentDay > 0) {
      setCurrentDay(currentDay - 1);
    }
  };

  // const handleSubmitReview = async () => {
  //   console.log("Final Review Completed:", completionStatus);
  //   router.push("/weeklyreport");
  // };

  const handleSubmitReview = async () => {
    const payload = {
      month: getCurrentMonths(),
      week: getCurrentWeekOfMonths(),
    };

    console.log("Sending payload:", payload);

    // call fetch function
    await fetchReport(payload.month, payload.week);

    // navigate after request
    router.push("/admin/permsec/weeklyreport");
  };

  const currentDayName = DAYS[currentDay];
  const currentDayTasks = weeklyTasks[currentDayName] || [];

  // Show loading state
  if (loading || !dataLoaded) {
    // MODIFIED: Include dataLoaded check
    return (
      <div className="px-4 mt-10 sm:px-6 lg:px-8">
        <div className="mx-auto lg:p-8 bg-white rounded-lg">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading tasks...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="px-4 mt-10 sm:px-6 lg:px-8">
        <div className="mx-auto lg:p-8 bg-white rounded-lg">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-500">
              No Performance Review for this week, try again later
              {/* {error} */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // NEW: Show message when no tasks exist for the selected week/month
  if (dataLoaded && !hasTasksToReview) {
    return (
      <div className="px-4 mt-10 sm:px-6 lg:px-8">
        <div className="mx-auto lg:p-8 bg-white rounded-lg">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Review Task Completion
          </h1>

          <div className="mb-4 text-sm text-gray-600">
            Reviewing tasks for {currentWeek} of {currentMonth}
          </div>

          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-lg text-gray-600 mb-4">
                No tasks found for the current week ({currentWeek}).
              </div>
              <div className="text-sm text-gray-500 mb-6">
                Please create tasks for this week before reviewing them.
              </div>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2 bg-flag-green text-white rounded-md hover:bg-flag-green"
              >
                Create Tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mt-10 sm:px-6 lg:px-8">
      <div className="mx-auto lg:p-8 bg-white rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Review Task Completion
        </h1>

        <div className="mb-4 text-sm text-gray-600">
          Reviewing tasks for {currentWeek} of {currentMonth}
        </div>

        <ProgressTracker currentDay={currentDay} days={DAYS} />

        <h1 className="text-lg font-semibold text-gray-900 mb-4">
          Were you able to complete the tasks for {currentDayName}?
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 px-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Task</h2>
            <span className="text-gray-700 mb-4 mr-10">Remark</span>
          </div>

          {currentDayTasks.length === 0 ? (
            <p className="text-gray-500 italic mb-6">
              No tasks were scheduled for {currentDayName}
            </p>
          ) : (
            <div className="space-y-4 mb-6">
              {currentDayTasks.map((task) => (
                <div
                  key={task.id}
                  className="border-b border-gray-200 flex justify-between p-4 rounded-md"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {task.title || task.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {task.description || task.notes}
                    </p>
                    <div className="text-xs text-gray-500">
                      <span>
                        Time: {task.time || task.startTime || "Not specified"}
                      </span>
                      {task.tools && (
                        <span className="ml-4">
                          Tools: {task.tools || task.tool}
                        </span>
                      )}
                      <span className="ml-4">Priority: {task.priority}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-4">
                    {completionStatus[task.id] ? (
                      <div className="bg-gray-50 p-3 rounded-md min-w-[200px]">
                        {completionStatus[task.id].completed ? (
                          <span className="text-flag-green font-normal">
                            ✓ Marked as completed
                          </span>
                        ) : (
                          <div>
                            <span className="text-red-600 font-medium">
                              ✗ Marked as not completed
                            </span>
                            <p className="text-sm text-gray-600 mt-1">
                              Reason: {completionStatus[task.id].reason}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleTaskCompletion(task.id, true)}
                          className="px-4 py-2 text-gray-800 rounded-md border cursor-pointer border-gray-300 hover:bg-flag-green hover:text-white active:bg-flag-green"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => handleTaskCompletion(task.id, false)}
                          className="px-4 py-2 text-gray-800 rounded-md border border-gray-300 cursor-pointer hover:bg-flag-green hover:text-white"
                        >
                          No
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentDay === 0}
              className={`px-4 py-2 rounded-md text-sm cursor-pointer font-medium flex items-center gap-1 ${
                currentDay === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "border-flag-green border text-flag-green hover:bg-flag-green hover:text-white"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {currentDay === DAYS.length - 1 ? (
              <button
                onClick={handleSubmitReview}
                disabled={!canProceed()}
                className={`px-6 py-2 rounded-md text-sm font-medium ${
                  canProceed()
                    ? "bg-flag-green text-white hover:bg-flag-green"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Submit Review
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${
                  canProceed()
                    ? "bg-flag-green text-white hover:bg-flag-green"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Proceed
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Show "Go to Report" button when all days are reviewed */}
        {allDaysReviewed && (
          <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex-col items-center justify-between">
              <div className="ml-6 mb-4 items-center">
                <h3 className="text-lg font-medium text-green-800 mb-2">
                  Review Complete!
                </h3>
                <p className="text-green-700">
                  You have successfully reviewed all tasks for the week. Click
                  below to view your weekly report.
                </p>
              </div>
              <button
                onClick={() => router.push("/admin/permsec/weeklyreport")}
                className="ml-6 px-6 py-3 bg-flag-green text-white rounded-md hover:bg-green-700 font-medium whitespace-nowrap"
              >
                View Weekly Report
              </button>
            </div>
          </div>
        )}

        {/* REMOVED: No more auto-redirect completion modal */}

        {/* Reason Modal */}
        {reasonModalOpen && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium mb-4">
                Kindly state the reason for not completing the task.
              </h3>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="4"
                placeholder="Please provide a reason..."
              />
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => {
                    setReasonModalOpen(false);
                    setCurrentTaskForReason(null);
                    setReason("");
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReasonSubmit}
                  disabled={!reason.trim() || loading}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                    reason.trim() && !loading
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Saving..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
