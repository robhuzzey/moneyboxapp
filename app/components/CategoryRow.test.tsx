import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CategoryRow from "./CategoryRow";

describe("CategoryRow", () => {
  it("renders without crashing", () => {
    render(
      <CategoryRow
        cat={{ name: "Test", products: [] }}
        index={0}
        selectedCat={null}
        startEditCategory={() => {}}
        confirmAndDeleteCategory={() => {}}
        setSelectedCat={() => {}}
      />
    );
  });

  it("calls startEditCategory when edit button is clicked", () => {
    const startEditCategory = jest.fn();
    render(
      <CategoryRow
        cat={{ name: "Test", products: [] }}
        index={0}
        selectedCat={null}
        startEditCategory={startEditCategory}
        confirmAndDeleteCategory={() => {}}
        setSelectedCat={() => {}}
      />
    );
    const editBtn = screen.getByText("Edit");
    fireEvent.click(editBtn);
    expect(startEditCategory).toHaveBeenCalled();
  });

  it("calls confirmAndDeleteCategory when delete button is clicked", () => {
    const confirmAndDeleteCategory = jest.fn();
    render(
      <CategoryRow
        cat={{ name: "Test", products: [] }}
        index={0}
        selectedCat={null}
        startEditCategory={() => {}}
        confirmAndDeleteCategory={confirmAndDeleteCategory}
        setSelectedCat={() => {}}
      />
    );
    const deleteBtn = screen.getByText("Delete");
    fireEvent.click(deleteBtn);
    expect(confirmAndDeleteCategory).toHaveBeenCalled();
  });
});
