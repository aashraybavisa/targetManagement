export interface Target {
  id: number;
  name: string;
  description: string;
  pipelineStatus: "Passed" | "Cold" | "Active" | "Hot" | "Closed" | null;
  markets: string[];
  lastUpdated: string;
  updates: Update[];
}

interface Update {
  prevStatus: "Passed" | "Cold" | "Active" | "Hot" | "Closed" | null;
  newStatus: "Passed" | "Cold" | "Active" | "Hot" | "Closed" | null;
  time: string;
}
