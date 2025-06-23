import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "../data";

// Add a product to a category
export async function POST(req: NextRequest) {
  const { categoryIndex, product } = await req.json();
  const data = await readData();
  if (data[categoryIndex]) {
    data[categoryIndex].products.push(product);
    await writeData(data);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Category not found" }, { status: 404 });
}

// Update a product in a category
export async function PUT(req: NextRequest) {
  const { categoryIndex, productIndex, product, reorder } = await req.json();
  const data = await readData();

  // Edit product
  if (typeof productIndex === "number" && product && !reorder) {
    if (data[categoryIndex] && data[categoryIndex].products[productIndex]) {
      data[categoryIndex].products[productIndex] = product;
      await writeData(data);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Reorder products
  if (Array.isArray(reorder)) {
    if (data[categoryIndex]) {
      data[categoryIndex].products = reorder;
      await writeData(data);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

// Delete a product from a category
export async function DELETE(req: NextRequest) {
  const { categoryIndex, productIndex } = await req.json();
  const data = await readData();
  if (data[categoryIndex] && data[categoryIndex].products[productIndex]) {
    data[categoryIndex].products.splice(productIndex, 1);
    await writeData(data);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
