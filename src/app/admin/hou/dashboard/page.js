"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  SlidersHorizontal,
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
import useAdminhouDashboardStore from "../../../../store/admin/useAdminhouDashboardStore";
import usehouTask from "../../../../store/admin/usehouTask";

export default function StaffDashboard() {
  const [activeWeek, setActiveWeek] = useState(1);
  const router = useRouter();
  const { analytics, staff, loading, error, fetchAdminDashboard } =
    useAdminhouDashboardStore();
  // use for now
  const { fetchStaffTasks } = usehouTask();
  const getCurrentMonths = () => {
    return new Date().toLocaleString("en-US", { month: "long" }).toUpperCase();
  };

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Role");
  const [selectedSort, setSelectedSort] = useState("Status");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonths());

  const statusDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const monthDropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    fetchAdminDashboard();
  }, [fetchAdminDashboard]);

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
      value: analytics?.totalPlans || "0",
      bgColor: "bg-gray-600",
      textColor: "text-white",
      icon: <FilePlus2 className="w-6 h-6" />,
    },
    {
      title: "Late Submission",
      value: "0",
      bgColor: "bg-purple-500",
      textColor: "text-white",
      icon: <FilePlus2 className="w-6 h-6" />,
    },
  ];

  const statusOptions = [
    { label: "Role" },
    { label: "Pending" },
    { label: "In progress" },
    { label: "Completed" },
  ];

  const sortOptions = [
    { label: "Status" },
    { label: "pending" },
    { label: "approved" },
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

  // const handleStatusSelect = (status) => {
  //   setSelectedStatus(status.label);
  //   setIsStatusOpen(false);
  // };

  // const handleSortSelect = (sort) => {
  //   setSelectedSort(sort.label);
  //   setIsSortOpen(false);
  // };

  const handleStatusSelect = async (status) => {
    setSelectedStatus(status.label);
    setIsStatusOpen(false);

    const payload = {
      status_filter: selectedSort !== "Status" ? selectedSort : "",
      role_filter: status.label !== "Role" ? status.label : "",
    };

    console.log("Sending filters:", payload);
    await fetchAdminDashboard(payload);
  };

  const handleSortSelect = async (sort) => {
    setSelectedSort(sort.label);
    setIsSortOpen(false);

    const payload = {
      status_filter: sort.label !== "Status" ? sort.label : "",
      role_filter: selectedStatus !== "Role" ? selectedStatus : "",
    };

    console.log("Sending filters:", payload);
    await fetchAdminDashboard(payload);
  };

  useEffect(() => {
    fetchAdminDashboard({ role_filter: "", status_filter: "" });
  }, [fetchAdminDashboard]);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month.label);
    setIsMonthOpen(false);
  };

  const getCurrentWeekOfMonth = () => {
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
  const getCurrentMonth = () => {
    return new Date().toLocaleString("en-US", { month: "long" }).toUpperCase();
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

  // Initialize scroll position check
  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
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

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4">
            <div className="md:flex grid items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-600">
                <Filter size={16} />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              <div className="md:flex grid gap-4 items-center space-x-4">
                {/* Search */}
                {/* <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="search staff"
                    className="pl-10 pr-4 py-2 border w-full border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-flag-green"
                  />
                </div> */}

                {/* Dropdowns */}
                <div className="">
                  <div className="flex items-center space-x-4">
                    {/* Filter by Status Dropdown */}
                    <div className="relative" ref={statusDropdownRef}>
                      <div className="relative">
                        <button
                          onClick={() => {
                            setIsStatusOpen(!isStatusOpen);
                            setIsSortOpen(false);
                            setIsMonthOpen(false);
                          }}
                          className="flex items-center justify-between w-40 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-green focus:border-transparent"
                        >
                          <span className="text-gray-700">
                            {selectedStatus}
                          </span>
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
                                    ? " bg-green-50 text-flag-green"
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

                    {/* Sort Dropdown */}
                    <div className="relative" ref={sortDropdownRef}>
                      <div className="relative">
                        <button
                          onClick={() => {
                            setIsSortOpen(!isSortOpen);
                            setIsStatusOpen(false);
                            setIsMonthOpen(false);
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Month and Week Selection */}
          <div className="p-4">
            <div className="md:flex grid items-center space-x-6">
              <div className="items-center space-x-2">
                {/* <span className="text-sm font-medium text-gray-700 pl-5">
                  Month
                </span> */}

                {/* Month Dropdown */}
                {/* <div className="relative" ref={monthDropdownRef}>
                  <div className="relative">
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
                </div> */}
              </div>

              {/* Week Tabs */}
              {/* <div className="flex space-x-1">
                {[1, 2, 3, 4].map((week) => (
                  <button
                    key={week}
                    onClick={() => setActiveWeek(week)}
                    className={`px-4 py-2 text-sm font-medium rounded ${
                      activeWeek === week
                        ? "text-flag-green"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Week {week}
                  </button>
                ))}
              </div> */}
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
                {staff.map((staffs, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm capitalize text-gray-900">
                      {staffs?.employee_id}
                    </td>
                    <td className="px-6 py-4 text-sm capitalize text-gray-600">
                      {staffs?.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {/* {staffs.plans.length > 0
                        ? staffs.plans[0].created_at
                        : "-"} */}
                      {staffs.plans?.length > 0
                        ? new Date(
                            staffs.plans[0].created_at
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="px-6 py-4">
                      {staffs.plans?.length > 0 ? (
                        <span
                          className={`inline-flex px-2 py-1 text-xs my-2 font-medium rounded-full ${
                            staffs.plans?.[0]?.approved === true
                              ? " text-red-700 "
                              : " text-flag-green"
                          }`}
                        >
                          {staffs.plans?.[0]?.approved === true
                            ? "Pending"
                            : "Approved"}
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-1 text-xs my-2 font-medium rounded-full  text-red-700">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {/* <button
                        onClick={() => {
                          // PostStaff(staffs.id, staffs?.unit_id); //  Send to backend
                          router.push(
                            `/admin/hou/dashboard/${staffs?.plans?.[0]?.user_id}`
                          ); //  Navigate
                        }}
                        className="text-flag-green hover:text-blue-800 text-sm font-medium hover:underline transition-colors duration-150"
                      >
                        View
                      </button> */}
                      <button
                        onClick={async () => {
                          const payload = {
                            staff_id: staffs?.id,
                            month: getCurrentMonth(),
                            week: getCurrentWeekOfMonth(),
                          };

                          console.log("Sending payload:", payload);
                          await fetchStaffTasks(
                            payload.staff_id,
                            payload.month,
                            payload.week
                          );

                          // navigate after request
                          router.push(`/admin/hou/dashboard/${staffs?.id}`);
                        }}
                        className="text-flag-green  text-sm font-medium cursor-pointer transition-colors duration-150"
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
