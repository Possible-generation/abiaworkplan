"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Staff data for the new heatmap
const staffData = [
  {
    name: "Chukwu Benedict",
    role: "Internal Auditor",
    weeklyPerformance: [91, 95, 88, 92, 89, 94, 90, 93, 96, 88, 91, 94],
    overall: 91,
    efficiency: 89,
  },
  {
    name: "Chinonso Gloria",
    role: "Revenue Officer",
    weeklyPerformance: [83, 72, 85, 78, 81, 79, 77, 82, 75, 80, 84, 76],
    overall: 83,
    efficiency: 81,
  },
  {
    name: "Joshua Jacob",
    role: "Accountant 1",
    weeklyPerformance: [95, 92, 94, 96, 93, 91, 97, 94, 92, 95, 93, 96],
    overall: 95,
    efficiency: 94,
  },
  {
    name: "Abu Destiny",
    role: "Accountant 2",
    weeklyPerformance: [68, 65, 71, 69, 67, 70, 66, 72, 69, 68, 71, 67],
    overall: 68,
    efficiency: 71,
  },
  {
    name: "Chidiebere Joy",
    role: "Payroll Officer",
    weeklyPerformance: [92, 89, 94, 91, 93, 90, 95, 92, 88, 94, 91, 93],
    overall: 92,
    efficiency: 90,
  },
  {
    name: "Osinachi Amaka",
    role: "",
    weeklyPerformance: [51, 65, 68, 64, 59, 62, 56, 61, 67, 63, 58, 66],
    overall: 61,
    efficiency: 60,
  },
];

// MDA Performance data
const mdaData = [
  { name: "Finance & Accounts", value: 34, color: "#16a34a" },
  { name: "Administration & Supply", value: 25, color: "#2563eb" },
  { name: "Planning, Research & Statistics", value: 15, color: "#ea580c" },
  { name: "Rural Development", value: 15, color: "#3b82f6" },
  { name: "Livestock & Fisheries", value: 6, color: "#a855f7" },
  { name: "Agricultural Services", value: 5, color: "#dc2626" },
];

// Color mapping functions
const getPerformanceColor = (value) => {
  if (value < 60) return "bg-red-500"; // Red for less than 60
  if (value >= 60 && value < 70) return "bg-blue-500"; // Blue for 60-69
  if (value >= 70 && value < 80) return "bg-yellow-500"; // Yellow for 70-79
  if (value >= 80 && value < 90) return "bg-green-300"; // Green for 80-89
  return "bg-green-500"; // Green for 90+
};

const getOverallBadgeColor = (value) => {
  if (value < 60) return "bg-red-100 text-red-800";
  if (value >= 60 && value < 70) return "bg-blue-100 text-blue-800";
  if (value >= 70 && value < 80) return "bg-yellow-100 text-yellow-800";
  if (value >= 80 && value < 90) return "bg-orange-100 text-orange-800";
  return "bg-green-100 text-green-800";
};

const getEfficiencyBadgeColor = (value) => {
  if (value < 60) return "bg-red-100 text-red-800";
  if (value >= 60 && value < 70) return "bg-blue-100 text-blue-800";
  if (value >= 70 && value < 80) return "bg-yellow-100 text-yellow-800";
  if (value >= 80 && value < 90) return "bg-orange-100 text-orange-800";
  return "bg-green-100 text-green-800";
};

// MDA Performance Chart Component
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="16"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-col space-y-2 ml-8">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm text-gray-700">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const MDAPerformanceChart = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <div className="border-2 border-blue-400 rounded-lg p-4">
        <div className="border border-dashed border-gray-400 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            MDA Performance
          </h2>

          <div className="flex items-center justify-center">
            <div className="w-[500px] h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mdaData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    innerRadius={80}
                    outerRadius={180}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {mdaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <CustomLegend
              payload={mdaData.map((item) => ({
                value: item.name,
                color: item.color,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual Performance Analysis Component
const IndividualPerformanceAnalysis = () => {
  const [selectedUnit, setSelectedUnit] = useState("Units");
  const [selectedRole, setSelectedRole] = useState("Role");
  const [searchTerm, setSearchTerm] = useState("");

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
              className="flex items-end justify-start gap-6"
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
            <div className="flex items-start justify-start gap-6 mt-2">
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
              className="flex items-end justify-start gap-6"
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
            <div className="flex items-start justify-start gap-6 mt-2">
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
    <div className="space-y-6">
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
  );
};

// Staff Performance Heatmap Component
const StaffPerformanceHeatmap = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Performance Heatmap
        </h2>
        <p className="text-gray-600">
          Weekly performance visualization across all staff members
        </p>
      </div>

      {/* Legend */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium text-gray-700">
            Performance Scale:
          </span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">&lt; 60%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">60-69%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm text-gray-600">70-79%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-300 rounded"></div>
              <span className="text-sm text-gray-600">80-89%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">90%+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-700">
          <div className="col-span-3">Staff Member</div>
          <div className="col-span-6 text-center">
            Weekly Performance (Last 12 weeks)
          </div>
          <div className="col-span-1 text-center">Overall</div>
          <div className="col-span-1 text-center">Efficiency</div>
          <div className="col-span-1"></div>
        </div>
      </div>

      {/* Heatmap Rows */}
      <div className="divide-y divide-gray-100">
        {staffData.map((staff, index) => (
          <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Staff Info */}
              <div className="col-span-3">
                <div className="font-medium text-gray-900">{staff.name}</div>
                <div className="text-sm text-gray-500">{staff.role}</div>
              </div>

              {/* Weekly Performance Dots */}
              <div className="col-span-6">
                <div className="flex justify-center space-x-1">
                  {staff.weeklyPerformance.map((performance, weekIndex) => (
                    <div
                      key={weekIndex}
                      className={`w-6 h-6 rounded ${getPerformanceColor(
                        performance
                      )} cursor-pointer transition-transform hover:scale-110`}
                      title={`Week ${weekIndex + 1}: ${performance}%`}
                    />
                  ))}
                </div>
              </div>

              {/* Overall Performance */}
              <div className="col-span-1 flex justify-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getOverallBadgeColor(
                    staff.overall
                  )}`}
                >
                  {staff.overall}%
                </span>
              </div>

              {/* Efficiency */}
              <div className="col-span-1 flex justify-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getEfficiencyBadgeColor(
                    staff.efficiency
                  )}`}
                >
                  {staff.efficiency}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Analytics Component
const Analytics = () => {
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState("staff-heatmap");

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading analytics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg text-center p-4 shadow-sm">
            <div className="text-2xl">6</div>
            <div className="text-sm text-gray-600">Total Staff Members</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl">85%</div>
            <div className="text-sm text-gray-600">Average Performance</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl">83%</div>
            <div className="text-sm text-gray-600">Efficiency Rate</div>
          </div>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex space-x-2 mb-8">
        <button
          onClick={() => setActiveView("staff-heatmap")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeView === "staff-heatmap"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Staff Performance Heatmap
        </button>
        <button
          onClick={() => setActiveView("individual-analysis")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeView === "individual-analysis"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Individual Performance Analysis
        </button>
        <button
          onClick={() => setActiveView("mda-performance")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeView === "mda-performance"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          MDA Performance
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Conditional Rendering */}
        {activeView === "staff-heatmap" && <StaffPerformanceHeatmap />}
        {activeView === "individual-analysis" && (
          <IndividualPerformanceAnalysis />
        )}
        {activeView === "mda-performance" && <MDAPerformanceChart />}
      </div>
    </div>
  );
};

export default Analytics;
