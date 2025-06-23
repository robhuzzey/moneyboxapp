import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "../data";

export async function GET() {
  const data = await readData();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = await readData();
  data.push(body);
  await writeData(data);
  return NextResponse.json({ success: true });
}

// Update a category by index
export async function PUT(req: NextRequest) {
  const { index, name } = await req.json();
  const data = await readData();
  if (data[index]) {
    data[index].name = name;
    await writeData(data);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

// Delete a category by index, with confirmation expected from the client
export async function DELETE(req: NextRequest) {
  const { index } = await req.json();
  const data = await readData();
  if (data[index]) {
    data.splice(index, 1);
    await writeData(data);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
