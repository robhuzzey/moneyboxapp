import React from "react";
import ProductForm from "./ProductForm";

interface ProductListProps {
  products: any[];
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
  startEditProduct: (prod: any, idx: number) => void;
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
        className="flex items-center gap-3 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-3 py-2 shadow-sm"
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
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {prod.name}
            </span>
            {prod.icon && (
              <img src={prod.icon} alt="" className="w-8 h-8 rounded border" />
            )}
            <button
              onClick={() => startEditProduct(prod, j)}
              className="text-blue-600 hover:underline text-xs"
            >
              Edit
            </button>
            <button
              onClick={() => confirmAndDeleteProduct(catIndex, j)}
              className="text-red-600 hover:underline text-xs"
            >
              Delete
            </button>
            <div className="flex flex-col items-center ml-2">
              <button
                disabled={j === 0}
                onClick={() => reorderProducts(catIndex, j, j - 1)}
                className={`p-1 rounded-full mb-1 transition-colors ${
                  j === 0
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white shadow"
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
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white shadow"
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
