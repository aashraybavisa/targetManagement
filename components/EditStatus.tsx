import { Target } from "@/lib/types";
import _ from "lodash";

const pipelineStatuses = ["Passed", "Cold", "Active", "Hot", "Closed", null];

export const EditStatus: React.FC<{
  editing: number | null;
  newStatus: Target["pipelineStatus"];
  setNewStatus: CallableFunction;
  handleSave: (id: number) => void;
  handleEdit: (id: number, currentStatus: Target["pipelineStatus"]) => void;
  loading: boolean;
  target: Target;
}> = ({
  editing,
  target,
  newStatus,
  handleSave,
  loading,
  handleEdit,
  setNewStatus,
}) => {
  const checkStatusUpdate = (newValue: string) => {
    if (_.includes(pipelineStatuses, newValue)) setNewStatus(newValue);
    else setNewStatus(null);
  };
  if (editing === target.id)
    return (
      <div>
        <select
          value={newStatus || "No Status"}
          onChange={(e) => checkStatusUpdate(e.target.value)}
          className="border rounded p-1 text-black"
        >
          {pipelineStatuses.map((status) => (
            <option key={status} value={status || "No Status"}>
              {status || "No Status"}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleSave(target.id)}
          className="bg-blue-500 text-white rounded px-2 py-1 mt-2"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    );
  return (
    <button
      onClick={() => handleEdit(target.id, target.pipelineStatus)}
      className="text-blue-500"
    >
      Edit
    </button>
  );
};
