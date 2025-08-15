"use client";

import { useState } from "react";
import { useTaskStore } from "../store/taskStore";

export default function TaskCard({ task, onEdit }) {
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    // <div className="bg-white p-4 rounded-lg shadow-sm border">
    //   <div className="flex justify-between items-start mb-2">
    //     <h3 className="font-medium text-gray-900">{task.title}</h3>
    //     <div className="flex space-x-2">
    //       <button
    //         onClick={() => onEdit(task)}
    //         className="text-blue-600 hover:text-blue-800 text-sm"
    //       >
    //         Edit
    //       </button>
    //       <button
    //         onClick={() => deleteTask(task.id)}
    //         className="text-red-600 hover:text-red-800 text-sm"
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   </div>
    //   <p className="text-gray-600 text-sm mb-3">{task.description}</p>
    //   <div className="flex flex-wrap gap-2 mb-3">
    //     <span
    //       className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
    //         task.priority
    //       )}`}
    //     >
    //       {task.priority}
    //     </span>
    //     <span
    //       className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
    //         task.status
    //       )}`}
    //     >
    //       {task.status}
    //     </span>
    //     <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
    //       {task.time}
    //     </span>
    //   </div>
    //   {task.tools && (
    //     <p className="text-sm text-gray-500">
    //       <span className="font-medium">Tools:</span> {task.tools}
    //     </p>
    //   )}
    // </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Day
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tools
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Render task rows here */}
          <tr key={task.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {task.day}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {task.title}
            </td>
            <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
              {task.description}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              {task.tools}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              {task.startTime} - {task.endTime}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <button
                onClick={() => onEdit(task)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ✏️ Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  //   <div className="bg-white rounded-lg shadow overflow-hidden">

  //       <div className="overflow-x-auto">
  //         <table className="min-w-full divide-y divide-gray-200">
  //           <thead className="bg-gray-50">
  //             <tr>
  //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                 Day
  //               </th>
  //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                 Task
  //               </th>
  //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                 Description
  //               </th>
  //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                 Tools
  //               </th>
  //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                 Priority
  //               </th>
  //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                 Time
  //               </th>
  //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                 Status
  //               </th>
  //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  //                 Action
  //               </th>
  //             </tr>
  //           </thead>
  //           <tbody className="bg-white divide-y divide-gray-200">
  //             {filteredTasks.map((task) => (
  //               <tr key={task.id} className="hover:bg-gray-50">
  //                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
  //                   {task.day}
  //                 </td>
  //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
  //                   {task.title}
  //                 </td>
  //                 <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
  //                   {task.description}
  //                 </td>
  //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
  //                   {task.tools}
  //                 </td>
  //                 <td className="px-6 py-4 whitespace-nowrap">
  //                   <span
  //                     className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
  //                       task.priority
  //                     )}`}
  //                   >
  //                     {task.priority}
  //                   </span>
  //                 </td>
  //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
  //                   {task.startTime} - {task.endTime}
  //                 </td>
  //                 <td className="px-6 py-4 whitespace-nowrap">
  //                   <span
  //                     className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
  //                       task.status
  //                     )}`}
  //                   >
  //                     {task.status}
  //                   </span>
  //                 </td>
  //                 <td className="px-6 py-4 whitespace-nowrap text-sm">
  //                   <button
  //                     onClick={() => handleEditTask(task)}
  //                     className="text-blue-600 hover:text-blue-800 font-medium"
  //                   >
  //                     ✏️ Edit
  //                   </button>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     )}
  //   </div>
}
