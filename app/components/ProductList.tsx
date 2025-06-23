import React from "react";
import Image from "next/image";
import ProductForm from "./ProductForm";

interface Product {
  name: string;
  icon: string;
  description: string;
}

interface ProductListProps {
  products: Product[];
  catIndex: number;
  editProductIndex: number | null;
  editProductName: string;
  setEditProductName: (v: string) => void;
  editProductIcon: string;
  setEditProductIcon: (v: string) => void;
  editProductDesc: string;
  setEditProductDesc: (v: string) => void;
  editFileInputRef: React.RefObject<HTMLInputElement | null>;
  uploading: boolean;
  handleIconUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    setIcon: (url: string) => void
  ) => void;
  saveEditProduct: (e: React.FormEvent, catIdx: number) => void;
  startEditProduct: (prod: Product, idx: number) => void;
  setEditProductIndex: (v: number | null) => void;
  confirmAndDeleteProduct: (catIdx: number, prodIdx: number) => void;
  reorderProducts: (catIdx: number, from: number, to: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  catIndex,
  editProductIndex,
  editProductName,
  setEditProductName,
  editProductIcon,
  setEditProductIcon,
  editProductDesc,
  setEditProductDesc,
  editFileInputRef,
  uploading,
  handleIconUpload,
  saveEditProduct,
  startEditProduct,
  setEditProductIndex,
  confirmAndDeleteProduct,
  reorderProducts,
}) => (
  <ul className="space-y-3">
    {products?.map((prod, j) => (
      <li
        key={j}
        className="flex items-center justify-between gap-3 bg-white border border-[#e6eaf0] rounded-xl px-4 py-3 shadow"
      >
        {editProductIndex === j ? (
          <ProductForm
            name={editProductName}
            setName={setEditProductName}
            icon={editProductIcon}
            setIcon={setEditProductIcon}
            desc={editProductDesc}
            setDesc={setEditProductDesc}
            fileInputRef={editFileInputRef}
            uploading={uploading}
            onIconUpload={handleIconUpload}
            onSubmit={(e) => saveEditProduct(e, catIndex)}
            submitLabel="Save"
            iconPreview={prod.icon}
            onCancel={() => setEditProductIndex(null)}
          />
        ) : (
          <>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="font-semibold text-[#1e2a32] truncate">
                {prod.name}
              </span>
              {prod.description && (
                <span
                  className="text-xs text-gray-500 ml-2 truncate"
                  data-testid="product-desc"
                >
                  {prod.description}
                </span>
              )}
              {prod.icon && (
                <Image
                  src={prod.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border-2 border-[#00b4a0] object-contain"
                />
              )}
              <button
                onClick={() => startEditProduct(prod, j)}
                className="text-[#00b4a0] hover:underline text-xs font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => confirmAndDeleteProduct(catIndex, j)}
                className="text-red-500 hover:underline text-xs font-semibold"
              >
                Delete
              </button>
            </div>
            <div className="flex flex-col items-center ml-2 flex-shrink-0">
              <button
                disabled={j === 0}
                onClick={() => reorderProducts(catIndex, j, j - 1)}
                className={`p-1 rounded-full mb-1 transition-colors ${
                  j === 0
                    ? "bg-[#eaf1f8] text-[#b6c6d6] cursor-not-allowed"
                    : "bg-[#00b4a0] hover:bg-[#009e8c] text-white shadow"
                }`}
                title="Move up"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
              <button
                disabled={j === products.length - 1}
                onClick={() => reorderProducts(catIndex, j, j + 1)}
                className={`p-1 rounded-full mt-1 transition-colors ${
                  j === products.length - 1
                    ? "bg-[#eaf1f8] text-[#b6c6d6] cursor-not-allowed"
                    : "bg-[#00b4a0] hover:bg-[#009e8c] text-white shadow"
                }`}
                title="Move down"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </li>
    ))}
  </ul>
);

export default ProductList;
