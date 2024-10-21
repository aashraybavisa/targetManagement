"use client";
import React, { useState } from "react";
import _ from "lodash";
import Table from "./Table";
import { Target } from "@/lib/types";

const TargetTable: React.FC<{
  targets: Target[];
  updateTargetStatus: (id: number, newStatus: Target["pipelineStatus"]) => void;
  loading: boolean;
}> = ({ targets, updateTargetStatus, loading }) => {
  const [editing, setEditing] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<Target["pipelineStatus"]>(null);
  const [oldStatus, setOldStatus] = useState<Target["pipelineStatus"]>(null);

  const handleEdit = (id: number, currentStatus: Target["pipelineStatus"]) => {
    setEditing(id);
    setOldStatus(currentStatus);
    setNewStatus(currentStatus);
  };

  const handleSave = (id: number) => {
    if (oldStatus !== newStatus) {
      updateTargetStatus(id, newStatus);
    }
    setEditing(null);
  };

  // Grouping targets by pipeline status
  const groupedTargets = _.groupBy(targets, "pipelineStatus");

  // Sort pipeline statuses for display
  const sortedStatuses = Object.keys(groupedTargets).sort();

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        Acquisition Targets
      </h2>
      {!loading ? (
        _.map(sortedStatuses, (status, index) => (
          <Table
            key={`table-${index}`}
            status={status}
            groupedTargets={groupedTargets}
            editing={editing}
            newStatus={newStatus}
            setNewStatus={setNewStatus}
            handleSave={handleSave}
            handleEdit={handleEdit}
            loading={loading}
          />
        ))
      ) : (
        <div className="mt-2 text-blue-500">Loading...</div>
      )}
    </div>
  );
};

export default TargetTable;
