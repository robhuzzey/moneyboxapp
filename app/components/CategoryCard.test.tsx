import { render, screen, fireEvent } from "@testing-library/react";
import CategoryCard from "./CategoryCard";
describe("CategoryCard", () => {
  const category = {
    name: "Cat1",
    products: [
      { name: "Prod1", icon: null, description: "desc1" },
      { name: "Prod2", icon: null, description: "desc2" },
    ],
  };
  it("renders category and products", () => {
    render(
      <CategoryCard
        category={category}
        openProductIdx={null}
        setOpenProductIdx={() => {}}
      />
    );
    expect(screen.getByText("Cat1")).toBeInTheDocument();
    expect(screen.getByText("Prod1")).toBeInTheDocument();
    expect(screen.getByText("Prod2")).toBeInTheDocument();
  });

  it("expands product details when clicked", () => {
    const setOpenProductIdx = jest.fn();
    render(
      <CategoryCard
        category={category}
        openProductIdx={null}
        setOpenProductIdx={setOpenProductIdx}
      />
    );
    fireEvent.click(screen.getByText("Prod1"));
    expect(setOpenProductIdx).toHaveBeenCalledWith(0);
  });
});
