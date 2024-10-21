"use client";
import { Target } from "@/lib/types";
import React from "react";
import { EditStatus } from "./EditStatus";

const Table: React.FC<{
  status: string;
  groupedTargets: Record<string, Target[]>;
  editing: number | null;
  newStatus: Target["pipelineStatus"];
  setNewStatus: CallableFunction;
  handleSave: (id: number) => void;
  handleEdit: (id: number, currentStatus: Target["pipelineStatus"]) => void;
  loading: boolean;
}> = ({
  status,
  groupedTargets,
  editing,
  newStatus,
  setNewStatus,
  handleSave,
  handleEdit,
  loading,
}) => {
  const handleStatus = (status: string) =>
    status === "null" ? "No Status" : status;
  return (
    <div key={status} className="mb-4">
      <h3 className="text-xl font-semibold text-gray-900">
        {handleStatus(status)}
      </h3>
      <table className="min-w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-gray-900">Company Name</th>
            <th className="px-4 py-2 text-gray-900">Description</th>
            <th className="px-4 py-2 text-gray-900">Markets</th>
            <th className="px-4 py-2 text-gray-900">Last Updated</th>
            <th className="px-4 py-2 text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {groupedTargets[status].map((target: Target) => (
            <tr key={target.id} className="border-t border-gray-200">
              <td className="px-4 py-2 text-gray-900">{target.name}</td>
              <td className="px-4 py-2 text-gray-900">{target.description}</td>
              <td className="px-4 py-2 text-gray-900">
                {target.markets.join(", ")}
              </td>
              <td className="px-4 py-2 text-gray-900">
                {new Date(target.lastUpdated).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                <EditStatus
                  editing={editing}
                  newStatus={newStatus}
                  setNewStatus={setNewStatus}
                  handleSave={handleSave}
                  handleEdit={handleEdit}
                  loading={loading}
                  target={target}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
