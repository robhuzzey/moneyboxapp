import { render, screen, fireEvent } from "@testing-library/react";
import ProductForm from "./ProductForm";
describe("ProductForm", () => {
  it("renders form fields", () => {
    render(
      <ProductForm
        name="Test"
        setName={() => {}}
        icon=""
        setIcon={() => {}}
        desc="desc"
        setDesc={() => {}}
        fileInputRef={{ current: null }}
        uploading={false}
        onIconUpload={() => {}}
        onSubmit={() => {}}
        submitLabel="Save"
      />
    );
    expect(screen.getByDisplayValue("Test")).toBeInTheDocument();
    expect(screen.getByDisplayValue("desc")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    render(
      <ProductForm
        name="Test"
        setName={() => {}}
        icon=""
        setIcon={() => {}}
        desc="desc"
        setDesc={() => {}}
        fileInputRef={{ current: null }}
        uploading={false}
        onIconUpload={() => {}}
        onSubmit={onSubmit}
        submitLabel="Save"
      />
    );
    const form = screen.getByText("Save").closest("form");
    if (form) {
      fireEvent.submit(form);
    }
    expect(onSubmit).toHaveBeenCalled();
  });
});
