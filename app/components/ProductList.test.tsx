import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";
describe("ProductList", () => {
  const products = [
    { name: "Prod1", icon: "", description: "desc1" },
    { name: "Prod2", icon: "", description: "desc2" },
  ];
  it("renders product names", () => {
    render(
      <ProductList
        products={products}
        catIndex={0}
        editProductIndex={null}
        editProductName={""}
        setEditProductName={() => {}}
        editProductIcon={""}
        setEditProductIcon={() => {}}
        editProductDesc={""}
        setEditProductDesc={() => {}}
        editFileInputRef={{ current: null }}
        uploading={false}
        handleIconUpload={() => {}}
        saveEditProduct={() => {}}
        startEditProduct={() => {}}
        setEditProductIndex={() => {}}
        confirmAndDeleteProduct={() => {}}
        reorderProducts={() => {}}
      />
    );
    expect(screen.getByText("Prod1")).toBeInTheDocument();
    expect(screen.getByText("Prod2")).toBeInTheDocument();
  });

  it("renders product descriptions", () => {
    render(
      <ProductList
        products={products}
        catIndex={0}
        editProductIndex={null}
        editProductName={""}
        setEditProductName={() => {}}
        editProductIcon={""}
        setEditProductIcon={() => {}}
        editProductDesc={""}
        setEditProductDesc={() => {}}
        editFileInputRef={{ current: null }}
        uploading={false}
        handleIconUpload={() => {}}
        saveEditProduct={() => {}}
        startEditProduct={() => {}}
        setEditProductIndex={() => {}}
        confirmAndDeleteProduct={() => {}}
        reorderProducts={() => {}}
      />
    );
    const descs = screen.getAllByTestId("product-desc");
    expect(descs[0]).toHaveTextContent("desc1");
    expect(descs[1]).toHaveTextContent("desc2");
  });
});
