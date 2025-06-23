import { POST } from "./route";

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

describe("/api/upload", () => {
  it("returns 400 if no file is provided", async () => {
    // Simulate a request without a file
    const req = { formData: async () => ({ get: () => null }) };
    const res = await POST(req as any);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBeDefined();
  });
  // Add more tests if upload logic is more complex
});
