import mockfs from "mock-fs";
import { NextRequest } from "next/server";

// Mock NextResponse.json before importing the route
jest.mock("next/server", () => {
  const original = jest.requireActual("next/server");
  return {
    ...original,
    NextResponse: {
      ...original.NextResponse,
      json: (data, init) =>
        new Response(JSON.stringify(data), {
          ...init,
          headers: {
            "Content-Type": "application/json",
            ...(init && init.headers),
          },
        }),
    },
  };
});

import { POST, PUT, DELETE } from "./route";

describe("/api/products", () => {
  const makeRequest = (body: any) =>
    ({ json: async () => body } as unknown as NextRequest);

  beforeEach(() => {
    mockfs({
      "data.json": JSON.stringify([
        { name: "Cat1", products: [{ name: "P1" }, { name: "P2" }] },
        { name: "Cat2", products: [] },
      ]),
    });
  });

  afterEach(() => {
    mockfs.restore();
  });

  it("POST adds a product to a category", async () => {
    const req = makeRequest({ categoryIndex: 0, product: { name: "P3" } });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const result = await res.json();
    expect(result.success).toBe(true);
  });

  it("POST returns 404 for invalid category", async () => {
    const req = makeRequest({ categoryIndex: 99, product: { name: "P3" } });
    const res = await POST(req);
    expect(res.status).toBe(404);
    const result = await res.json();
    expect(result.error).toBe("Category not found");
  });

  it("PUT edits a product", async () => {
    const req = makeRequest({
      categoryIndex: 0,
      productIndex: 1,
      product: { name: "P2-edited" },
    });
    const res = await PUT(req);
    expect(res.status).toBe(200);
    const result = await res.json();
    expect(result.success).toBe(true);
  });

  it("PUT reorders products", async () => {
    const req = makeRequest({
      categoryIndex: 0,
      reorder: [{ name: "P2" }, { name: "P1" }],
    });
    const res = await PUT(req);
    expect(res.status).toBe(200);
    const result = await res.json();
    expect(result.success).toBe(true);
  });

  it("PUT returns 404 for invalid product", async () => {
    const req = makeRequest({
      categoryIndex: 0,
      productIndex: 99,
      product: { name: "NoProd" },
    });
    const res = await PUT(req);
    expect(res.status).toBe(404);
    const result = await res.json();
    expect(result.error).toBe("Not found");
  });

  it("DELETE removes a product", async () => {
    const req = makeRequest({ categoryIndex: 0, productIndex: 0 });
    const res = await DELETE(req);
    expect(res.status).toBe(200);
    const result = await res.json();
    expect(result.success).toBe(true);
  });

  it("DELETE returns 404 for invalid product", async () => {
    const req = makeRequest({ categoryIndex: 0, productIndex: 99 });
    const res = await DELETE(req);
    expect(res.status).toBe(404);
    const result = await res.json();
    expect(result.error).toBe("Not found");
  });
});
