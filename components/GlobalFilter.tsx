import { Target } from "@/lib/types";
import _ from "lodash";
import React from "react";

interface GlobalFilterProps {
  pipelineStatuses: Target["pipelineStatus"][];
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({
  pipelineStatuses,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="w-full p-4 bg-black shadow-md rounded-lg mt-6">
      <label htmlFor="pipelineFilter" className="font-semibold mr-2">
        Filter by Pipeline Status:
      </label>
      <select
        id="pipelineFilter"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="border p-2 rounded bg-black"
      >
        <option value="">All</option>
        {_.map(pipelineStatuses, (status) => (
          <option key={status} value={status || "No Status"}>
            {status || "No Status"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GlobalFilter;
