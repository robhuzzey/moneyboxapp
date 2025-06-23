import { render, screen, waitFor } from "@testing-library/react";
import ViewPage from "./page";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { name: "Cat1", products: [] },
        { name: "Cat2", products: [{ name: "P1" }] },
      ]),
  })
) as jest.Mock;

describe("ViewPage", () => {
  it("renders categories from API", async () => {
    render(<ViewPage />);
    await waitFor(() => expect(screen.getByText("Cat1")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Cat2")).toBeInTheDocument());
  });

  it("renders products for a category", async () => {
    render(<ViewPage />);
    await waitFor(() => expect(screen.getByText("P1")).toBeInTheDocument());
  });
});
