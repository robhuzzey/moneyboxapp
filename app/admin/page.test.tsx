import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import AdminPage from "./page";

global.fetch = jest.fn((url, options) => {
  if (url === "/api/categories" && (!options || options.method === "GET")) {
    return Promise.resolve({
      json: () => Promise.resolve([{ name: "Cat1", products: [] }]),
    });
  }
  if (url === "/api/categories" && options && options.method === "POST") {
    return Promise.resolve({ json: () => Promise.resolve({ success: true }) });
  }
  return Promise.resolve({ json: () => Promise.resolve([]) });
}) as jest.Mock;

describe("AdminPage", () => {
  it("renders and adds a category", async () => {
    render(<AdminPage />);
    await waitFor(() => expect(screen.getByText("Cat1")).toBeInTheDocument());
    const input = screen.getByPlaceholderText(/category name/i);
    fireEvent.change(input, { target: { value: "Cat2" } });
    fireEvent.submit(input.closest("form")!);
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/categories",
        expect.objectContaining({ method: "POST" })
      )
    );
  });

  it("shows error if category name is empty", async () => {
    render(<AdminPage />);
    const input = screen.getByPlaceholderText(/category name/i);
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.submit(input.closest("form")!);
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "cannot be empty"
    );
    // fetch should not be called for POST
    expect(global.fetch).not.toHaveBeenCalledWith(
      "/api/categories",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("dummy test", () => {
    expect(true).toBe(true);
  });
});
