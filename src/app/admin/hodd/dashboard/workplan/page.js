"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  CircleUserRound,
  CircleCheck,
  FilePlus2,
  UserRound,
  UserRoundX,
} from "lucide-react";

export default function StaffDashboard() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("AUGUST");
  const [selectedRole, setSelectedRole] = useState("Hide");
  const [selectedStatus, setSelectedStatus] = useState("Show");

  const statsData = [
    {
      title: "Number of Staff",
      value: "09",
      bgColor: "bg-blue-900",
      textColor: "text-white",
      icon: <CircleUserRound className="w-6 h-6" />,
    },
    {
      title: "Approved Work Plans",
      value: "06",
      bgColor: "bg-flag-green",
      textColor: "text-white",
      icon: <CircleCheck className="w-6 h-6" />,
    },
    {
      title: "Pending Work Plans",
      value: "03",
      bgColor: "bg-orange-400",
      textColor: "text-white",
      icon: <FilePlus2 className="w-6 h-6" />,
    },
    {
      title: "Active Staff",
      value: "06",
      bgColor: "bg-blue-500",
      textColor: "text-white",
      icon: <UserRound className="w-6 h-6" />,
    },
    {
      title: "Inactive Staff",
      value: "03",
      bgColor: "bg-red-500",
      textColor: "text-white",
      icon: <UserRoundX className="w-6 h-6" />,
    },
  ];

  const staffData = [
    {
      name: "Chucker Benedict",
      role: "Internal Auditor",
      submission: "Aug 5, 2025",
      status: "Approved",
    },
    {
      name: "Chiamanm Gloria",
      role: "Revenue Officer",
      submission: "",
      status: "Pending",
    },
    {
      name: "Joshua Jacob",
      role: "Accountant 1",
      submission: "",
      status: "Pending",
    },
    {
      name: "Aku Destiny",
      role: "Accountant 2",
      submission: "Aug 5, 2025",
      status: "Approved",
    },
    {
      name: "Chelboere Joy",
      role: "Payroll Officer",
      submission: "Aug 5, 2025",
      status: "Approved",
    },
    {
      name: "Odinachi Amaka",
      role: "Budget Officer",
      submission: "",
      status: "Pending",
    },
    {
      name: "Chelboere Gloria",
      role: "Treasury Officer",
      submission: "Aug 5, 2025",
      status: "Approved",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Ministry of Agriculture
        </h1>
        <span className="text-gray-600">Finance & Accounts</span>
      </div>
      <div className="max-w-7xl mx-auto md:mt-20">
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm  mb-6">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-600">
                <Filter size={16} />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              <div className="flex items-center space-x-4 ">
                {/* Search */}
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="search staff"
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Role Dropdown */}
                <div className="relative">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Hide">Hide</option>
                    <option value="Show">Show</option>
                  </select>
                  <ChevronDown
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>

                {/* Status Dropdown */}
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Show">Show</option>
                    <option value="Hide">Hide</option>
                  </select>
                  <ChevronDown
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Month and Week Selection */}
          <div className="p-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Month</span>
                <div className="relative">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="AUGUST">AUGUST</option>
                    <option value="JULY">JULY</option>
                    <option value="SEPTEMBER">SEPTEMBER</option>
                  </select>
                  <ChevronDown
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={12}
                  />
                </div>
              </div>

              {/* Week Tabs */}
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((week) => (
                  <button
                    key={week}
                    onClick={() => setActiveWeek(week)}
                    className={`px-4 py-2 text-sm font-medium rounded ${
                      activeWeek === week
                        ? " text-flag-green"
                        : " text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Week {week}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                    Staff Member
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                    Submission
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {staffData.map((staff, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {staff.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {staff.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {staff.submission}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${staff.statusColor}`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-flag-green hover:text-blue-800 text-sm font-medium">
                        View Plan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
