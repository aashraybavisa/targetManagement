import { Target } from "@/lib/types";
import _ from "lodash";
import React from "react";
import {
  BarChart as BarRecharts,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  targets: Target[];
}

const BarChart: React.FC<BarChartProps> = ({ targets }) => {
  // Count targets by pipeline status
  const statusCount = _.countBy(targets, "pipelineStatus");

  // Convert the status counts to a format suitable for Recharts
  const data = _.map(_.entries(statusCount), ([status, count]) => ({
    status: status === "null" ? "No Status" : status,
    count,
  }));

  return (
    <div className="w-full h-96 pt-4 pb-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 ml-4">
        Targets by Pipeline Status
      </h2>
      <ResponsiveContainer width="90%" height="90%">
        <BarRecharts data={data}>
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip contentStyle={{ color: "#000" }} />
          <Bar dataKey="count" fill="#8543ff" />
        </BarRecharts>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
