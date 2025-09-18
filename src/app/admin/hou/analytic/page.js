"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const IndividualPerformanceAnalysis = () => {
  const [selectedUnit, setSelectedUnit] = useState("Units");
  const [selectedRole, setSelectedRole] = useState("Role");
  const [searchTerm, setSearchTerm] = useState("");

  // Performance color function
  const getPerformanceColor = (value) => {
    if (value < 60) return "bg-red-500"; // Red for less than 60
    if (value >= 60 && value < 70) return "bg-blue-500"; // Blue for 60-69
    if (value >= 70 && value < 80) return "bg-yellow-500"; // Yellow for 70-79
    if (value >= 80 && value < 90) return "bg-green-300"; // Green for 80-89
    return "bg-green-500"; // Green for 90+
  };

  // Performance Comparison Data
  const performanceData = [
    { week: "Week 1", value: 65 },
    { week: "Week 2", value: 95 },
    { week: "Week 3", value: 92 },
    { week: "Week 4", value: 85 },
    { week: "Week 5", value: 88 },
    { week: "Week 6", value: 78 },
    { week: "Week 7", value: 96 },
    { week: "Week 8", value: 89 },
  ];

  // Tasks Completed Data
  const tasksData = [
    { week: "Week 1", value: 12 },
    { week: "Week 2", value: 15 },
    { week: "Week 3", value: 18 },
    { week: "Week 4", value: 14 },
  ];

  // Hours Worked Data
  const hoursData = [
    { week: "Week 1", value: 32 },
    { week: "Week 2", value: 35 },
    { week: "Week 3", value: 38 },
    { week: "Week 4", value: 33 },
  ];

  const CustomDropdown = ({ value, options, onChange, placeholder }) => (
    <div className="relative">
      <button className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <span className="text-gray-700">{value}</span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>
    </div>
  );

  const PerformanceChart = ({ data, title, subtitle }) => {
    const max = 100;
    const chartHeight = 240;

    return (
      <div className="bg-white rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        <div className="relative">
          {/* Y-axis labels */}
          <div
            className="absolute -left-8 flex flex-col justify-between text-xs text-gray-400"
            style={{ height: chartHeight }}
          >
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          {/* Chart container */}
          <div className="ml-4">
            <div
              className="flex items-end justify-start gap-18"
              style={{ height: chartHeight }}
            >
              {data.map((item, index) => {
                const height = (item.value / max) * chartHeight;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`${getPerformanceColor(
                        item.value
                      )} rounded-sm w-8 transition-all duration-300 hover:opacity-80`}
                      style={{ height: `${height}px`, minHeight: "2px" }}
                      title={`${item.week}: ${item.value}%`}
                    />
                  </div>
                );
              })}
            </div>
            {/* X-axis labels */}
            <div className="flex items-start justify-start gap-18 mt-2">
              {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-8">
                  <span className="text-xs text-gray-600 text-center">
                    {item.week}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BarChart = ({ data, title, subtitle, maxValue = null }) => {
    const max = maxValue || Math.max(...data.map((item) => item.value));
    const chartHeight = 160;

    return (
      <div className="bg-white rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        <div className="relative">
          {/* Y-axis labels */}
          <div
            className="absolute -left-8 flex flex-col justify-between text-xs text-gray-400"
            style={{ height: chartHeight }}
          >
            <span>{max}</span>
            <span>{Math.round(max * 0.75)}</span>
            <span>{Math.round(max * 0.5)}</span>
            <span>{Math.round(max * 0.25)}</span>
            <span>0</span>
          </div>

          {/* Chart container */}
          <div className="ml-4">
            <div
              className="flex items-end justify-start gap-10"
              style={{ height: chartHeight }}
            >
              {data.map((item, index) => {
                const height = (item.value / max) * chartHeight;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="bg-green-500 rounded-sm w-8 transition-all duration-300 hover:opacity-80"
                      style={{ height: `${height}px`, minHeight: "2px" }}
                      title={`${item.week}: ${item.value}`}
                    />
                  </div>
                );
              })}
            </div>
            {/* X-axis labels */}
            <div className="flex items-start justify-start gap-10 mt-2">
              {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-8">
                  <span className="text-xs text-gray-600 text-center">
                    {item.week}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Individual Performance Analysis
          </h1>
          <p className="text-gray-600">
            Select a staff member to view detailed performance comparison
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Filter by:</span>
            </div>

            <div className="w-32">
              <CustomDropdown value={selectedUnit} placeholder="Units" />
            </div>

            <div className="flex-1 max-w-xs relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="search staff"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="w-32">
              <CustomDropdown value={selectedRole} placeholder="Role" />
            </div>
          </div>
        </div>

        {/* Performance Comparison Chart */}
        <div className="mb-6">
          <PerformanceChart
            data={performanceData}
            title="Performance Comparison"
            subtitle=""
          />
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tasks Completed */}
          <BarChart
            data={tasksData}
            title="Tasks Completed"
            subtitle="Weekly task completion trend"
            maxValue={20}
          />

          {/* Hours Worked */}
          <BarChart
            data={hoursData}
            title="Hours Worked"
            subtitle="Weekly hours allocation"
            maxValue={40}
          />
        </div>
      </div>
    </div>
  );
};

export default IndividualPerformanceAnalysis;
