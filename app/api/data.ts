import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data.json");

export async function readData() {
  try {
    const data = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeData(data: any) {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), "utf-8");
}
