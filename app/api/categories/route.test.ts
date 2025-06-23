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

import { GET, POST, PUT, DELETE } from "./route";

describe("/api/categories", () => {
  const makeRequest = (body: any) =>
    ({ json: async () => body } as unknown as NextRequest);

  beforeEach(() => {
    mockfs({
      "data.json": JSON.stringify([
        { name: "Cat1", products: [] },
        { name: "Cat2", products: [] },
      ]),
    });
  });

  afterEach(() => {
    mockfs.restore();
  });

  it("GET returns all categories", async () => {
    const res = await GET();
    const json = await res.json();
    expect(json.length).toBe(2);
    expect(json[0].name).toBe("Cat1");
  });

  it("POST adds a new category", async () => {
    const req = makeRequest({ name: "Cat3", products: [] });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const result = await res.json();
    expect(result.success).toBe(true);
  });

  it("PUT updates a category name", async () => {
    const req = makeRequest({ index: 0, name: "UpdatedCat" });
    const res = await PUT(req);
    expect(res.status).toBe(200);
    const result = await res.json();
    expect(result.success).toBe(true);
  });

  it("PUT returns 404 for invalid index", async () => {
    const req = makeRequest({ index: 99, name: "NoCat" });
    const res = await PUT(req);
    expect(res.status).toBe(404);
    const result = await res.json();
    expect(result.error).toBe("Not found");
  });

  it("DELETE removes a category", async () => {
    const req = makeRequest({ index: 0 });
    const res = await DELETE(req);
    expect(res.status).toBe(200);
    const result = await res.json();
    expect(result.success).toBe(true);
  });

  it("DELETE returns 404 for invalid index", async () => {
    const req = makeRequest({ index: 99 });
    const res = await DELETE(req);
    expect(res.status).toBe(404);
    const result = await res.json();
    expect(result.error).toBe("Not found");
  });
});
