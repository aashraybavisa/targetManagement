import { NextResponse } from "next/server";
import targetsData from "../../../data/targets.json";
import fs from "fs";
import path from "path";
import _ from "lodash";
import { Target } from "@/lib/types";
const typedTargets: Target[] = targetsData as Target[];

const saveTargetsData = (data: Target[]) => {
  const filePath = path.join(process.cwd(), "data", "targets.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  return NextResponse.json(targetsData);
}

export async function POST(request: Request) {
  try {
    const { id, newStatus } = await request.json();

    const targetIndex = _.findIndex(typedTargets, (target) => target.id === id);
    if (targetIndex === -1) {
      return NextResponse.json(
        { message: "Target not found" },
        { status: 404 }
      );
    }
    const currentDate = new Date();
    const isoDate = currentDate.toISOString();
    const update = {
      prevStatus: typedTargets[targetIndex].pipelineStatus,
      newStatus,
      time: isoDate,
    };
    typedTargets[targetIndex].pipelineStatus = newStatus; // Update the status
    typedTargets[targetIndex].lastUpdated = isoDate
    typedTargets[targetIndex].updates.push(update)
    // Save the updated targets data back to the JSON file
    saveTargetsData(typedTargets);

    return NextResponse.json(
      { message: "Target updated successfully", data: typedTargets },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
