"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  CircleUserRound,
  CircleCheck,
  FilePlus2,
  UserRound,
  UserRoundX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useAdminDashboardStore from "../../../../store/admin/useAdminDashboardStore";
import { useRouter } from "next/navigation";

export default function StaffDashboard() {
  const router = useRouter();
  const [activeWeek, setActiveWeek] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("AUGUST");
  const [selectedRole, setSelectedRole] = useState("Hide");
  const [selectedStatus, setSelectedStatus] = useState("Show");
  const {
    user,
    analytics,
    units,
    postUnit,
    loading,
    error,
    fetchAdminDashboard,
  } = useAdminDashboardStore();

  const scrollContainerRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    fetchAdminDashboard();
  }, [fetchAdminDashboard]);

  // Initialize scroll position check
  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);
  const statsData = [
    {
      title: "Number of Staff",
      value: analytics?.staffNo || "0",
      bgColor: "bg-blue-900",
      textColor: "text-white",
      icon: <CircleUserRound className="w-6 h-6" />,
    },
    {
      title: "Approved Work Plans",
      value: analytics?.approvedPlans || "0",
      bgColor: "bg-flag-green",
      textColor: "text-white",
      icon: <CircleCheck className="w-6 h-6" />,
    },
    {
      title: "Pending Work Plans",
      value: analytics?.pendingPlans || "0",
      bgColor: "bg-orange-400",
      textColor: "text-white",
      icon: <FilePlus2 className="w-6 h-6" />,
    },
    {
      title: "Active Staff",
      value: analytics?.activeStaff || "0",
      bgColor: "bg-blue-500",
      textColor: "text-white",
      icon: <UserRound className="w-6 h-6" />,
    },
    {
      title: "Inactive Staff",
      value: analytics?.inActiveStaff || "0",
      bgColor: "bg-red-500",
      textColor: "text-white",
      icon: <UserRoundX className="w-6 h-6" />,
    },
    {
      title: "Total Plan Submitted",
      value: "12",
      bgColor: "bg-gray-600",
      textColor: "text-white",
      icon: <FilePlus2 className="w-6 h-6" />,
    },
    {
      title: "Late Submission",
      value: "12",
      bgColor: "bg-purple-500",
      textColor: "text-white",
      icon: <FilePlus2 className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto my-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {user?.department?.name} Department
        </h1>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        {/* Stats Cards with Scroll */}
        <div className="relative mb-8">
          {/* Left scroll button */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 hidden transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg border ${
              canScrollLeft
                ? "text-gray-700 hover:bg-gray-50"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right scroll button */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 hidden transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg border ${
              canScrollRight
                ? "text-gray-700 hover:bg-gray-50"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <ChevronRight size={20} />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4  py-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitScrollbar: { display: "none" },
            }}
          >
            {statsData.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} ${stat.textColor} flex-shrink-0 w-48 grid place-items-center px-2 py-4 rounded-lg`}
              >
                <div className="flex items-center space-x-2">{stat.icon}</div>
                <div className="text-sm opacity-90 text-center">
                  {stat.title}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-4 font-bold text-gray-600">
                    Units
                  </th>
                  <th className="text-right px-6 py-4  font-bold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {units?.map((unit) => (
                  <tr
                    key={unit.id}
                    className="border-b border-gray-200 hover:bg-gray-200 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 border-b border-gray-200 text-gray-600">
                      {unit.name}
                    </td>
                    <td className="px-6 py-4 text-right border-b border-gray-200">
                      <button
                        onClick={() => {
                          postUnit(unit.id); //  Send to backend
                          router.push(`/admin/hodd/dashboard/${unit.id}`); //  Navigate
                        }}
                        className="text-flag-green hover:text-blue-800 text-sm font-medium hover:underline transition-colors duration-150"
                      >
                        View
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
