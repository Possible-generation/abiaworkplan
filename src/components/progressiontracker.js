"use client";

export default function ProgressTracker({
  currentDay,
  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {days.map((day, index) => (
          <div key={day} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentDay
                    ? "bg-flag-green text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-xs ${
                  index <= currentDay ? "text-flag-green" : "text-gray-500"
                }`}
              >
                {day}
              </span>
            </div>
            {index < days.length - 1 && (
              <div
                className={`h-0.5 md:w-16 w-0  md:mx-4 ${
                  index < currentDay ? "bg-flag-green" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
