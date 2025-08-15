"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTaskStore } from "../../../../store/taskStore";
import ProgressTracker from "../../../../components/progressiontracker";
import { ChevronRight, ChevronLeft } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function ReviewTasksPage() {
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState(0);
  const [completionStatus, setCompletionStatus] = useState({});
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [currentTaskForReason, setCurrentTaskForReason] = useState(null);
  const [reason, setReason] = useState("");

  const { weeklyTasks, submitReview } = useTaskStore();

  const handleTaskCompletion = (taskId, completed) => {
    if (completed) {
      setCompletionStatus((prev) => ({
        ...prev,
        [taskId]: { completed: true, reason: null },
      }));
    } else {
      setCurrentTaskForReason(taskId);
      setReasonModalOpen(true);
    }
  };

  const handleReasonSubmit = () => {
    if (currentTaskForReason && reason.trim()) {
      setCompletionStatus((prev) => ({
        ...prev,
        [currentTaskForReason]: { completed: false, reason: reason.trim() },
      }));
      setReason("");
      setCurrentTaskForReason(null);
      setReasonModalOpen(false);
    }
  };

  const canProceed = () => {
    const dayName = DAYS[currentDay];
    const dayTasks = weeklyTasks[dayName] || [];
    return dayTasks.every((task) => completionStatus[task.id]);
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

  const handleSubmitReview = async () => {
    // Here you would typically save the review data
    await submitReview(completionStatus);

    console.log("Review completed:", completionStatus);
    router.push("/weeklyreport"); // Redirect to dashboard or another page
  };

  const currentDayName = DAYS[currentDay];
  const currentDayTasks = weeklyTasks[currentDayName] || [];

  return (
    <div className="px-4 mt-10 sm:px-6 lg:px-8">
      <div className=" mx-auto lg:p-8 bg-white rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Review Task Completion
        </h1>

        <ProgressTracker currentDay={currentDay} days={DAYS} />
        <h1 className="text-lg font-semibold text-gray-900 mb-4">
          Were you able to complete the task?
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 px-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Task</h2>
            <span className="text-gray-700 mb-4 mr-10">Remark</span>
          </div>

          {currentDayTasks.length === 0 ? (
            <p className="text-gray-500 italic mb-6">
              No tasks were scheduled for this day
            </p>
          ) : (
            <div className="space-y-4 mb-6">
              {currentDayTasks.map((task) => (
                <div
                  key={task.id}
                  className="border-b border-gray-200  flex justify-between p-4 rounded-md"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      {task.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {task.description}
                    </p>
                  </div>

                  {completionStatus[task.id] ? (
                    <div className="bg-gray-50 p-3 rounded-md">
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
                        className="px-2  text-gray-800 rounded-md  focus:outline-none border border-gray-300 hover:bg-gray-100"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleTaskCompletion(task.id, false)}
                        className="px-2 py-2  text-gray-800 rounded-md  focus:outline-none border border-gray-300 hover:bg-gray-100"
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentDay === 0}
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                currentDay === 0
                  ? "bg-gray-600 text-gray-500 cursor-not-allowed"
                  : " border-flag-green border text-flag-green hover:bg-flag-green"
              }`}
            >
              <ChevronLeft className="inline-block" />
              Previous
            </button>

            {currentDay === DAYS.length - 1 ? (
              <button
                onClick={handleSubmitReview}
                disabled={!canProceed()}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  canProceed()
                    ? "bg-flag-green text-white hover:bg-flag-green"
                    : "bg-flag-green text-white cursor-not-allowed"
                }`}
              >
                Submit Review
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-2 py-2 rounded-md text-sm font-medium ${
                  canProceed()
                    ? "bg-flag-green text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Proceed
                <ChevronRight className="inline-block" />
              </button>
            )}
          </div>
        </div>

        {/* Reason Modal */}
        {reasonModalOpen && (
          <div className="fixed inset-0  bg-flag-green/40 backdrop-opacity-20  bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium mb-4">
                Kindly state the reason for not completing the task.
              </h3>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-flag-green"
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
                  disabled={!reason.trim()}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                    reason.trim()
                      ? "bg-flag-green text-white hover:bg-flag-green"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
