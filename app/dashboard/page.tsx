"use client";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import BarChart from "../../components/BarChart";
import GlobalFilter from "@/components/GlobalFilter";
import TargetTable from "@/components/TargetTable";
import { Target } from "@/lib/types";

export default function Dashboard() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch data from the API
    fetch("/api/targets")
      .then((res) => res.json())
      .then((data) => setTargets(data));
  }, []);

  // Update target status - DB Operation
  const updateTargetStatus = async (
    id: number,
    newStatus: Target["pipelineStatus"]
  ) => {
    setLoading(true);
    const response = await fetch("/api/targets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, newStatus }),
    });

    const resData = await response.json();
    // check for errors
    if (!response.ok) {
      const errorData = await response.json();
      // console.error("Failed to update target:", errorData.message);
      alert(`Failed to update target: ${errorData?.message}`);
      setLoading(false);
      return;
    }
    // update latest data
    setTargets(resData?.data);
    // Handle successful update
    alert(`Target updated successfully`);
    setLoading(false);
  };

  // Extract unique pipeline statuses for filtering
  const pipelineStatuses: Target["pipelineStatus"][] = _.uniq(
    _.map(targets, "pipelineStatus")
  );
  // Filter targets by selected pipeline status
  const filteredTargets = selectedStatus
    ? _.filter(targets, (target) =>
        selectedStatus === "No Status"
          ? target.pipelineStatus === null
          : target.pipelineStatus === selectedStatus
      )
    : targets;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Target Management Dashboard</h1>
      <GlobalFilter
        pipelineStatuses={pipelineStatuses}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-4">
        <BarChart targets={filteredTargets} />
        <TargetTable
          targets={filteredTargets}
          loading={loading}
          updateTargetStatus={updateTargetStatus}
        />
      </div>
    </div>
  );
}
