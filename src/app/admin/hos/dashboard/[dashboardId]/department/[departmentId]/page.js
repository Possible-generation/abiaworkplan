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
import useAdminHosDashboardStore from "../../../../../../../store/admin/useAdminHosDashboardStore";
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
    unit,
    postUnit,
    departmentName,
    departmentunitlist,
    ministry,
    loading,
    error,
    fetchAdminDashboard,
  } = useAdminHosDashboardStore();

  useEffect(() => {
    fetchAdminDashboard();
  }, [fetchAdminDashboard]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto my-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Department of{" "}
          <span className="capitalize">{departmentName?.name}</span>
        </h1>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Staff Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-4 font-bold text-gray-600">
                    Unit{" "}
                  </th>
                  <th className="text-right px-6 py-4  font-bold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {departmentunitlist?.map((department) => (
                  <tr
                    key={department.id}
                    className="border-b border-gray-200 hover:bg-gray-200 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 border-b border-gray-200 text-gray-600">
                      <span className="capitalize">{department.name}</span>
                    </td>
                    <td className="px-6 py-4 text-right border-b border-gray-200">
                      <button
                        onClick={async () => {
                          const payload = {
                            ministry_id: ministry?.id,
                            department_id: departmentName?.id,

                            unit_id: department?.id,
                          };

                          await postUnit(
                            payload.ministry_id,
                            payload.department_id,

                            payload.unit_id
                          );
                          console.log("Posted unit payload:", payload);

                          router.push(
                            `/admin/hos/dashboard/${ministry?.id}/department/${departmentName?.id}/unit/${department?.id}`
                          ); //  Navigate
                        }}
                        className="text-flag-green font-medium  transition-colors cursor-pointer duration-150"
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
