import React from "react";

interface CategoryRowProps {
  cat: any;
  index: number;
  selectedCat: number | null;
  startEditCategory: (index: number, name: string) => void;
  confirmAndDeleteCategory: (index: number) => void;
  setSelectedCat: (index: number | null) => void;
  editIndex?: number | null;
  editName?: string;
  setEditName?: (v: string) => void;
  saveEditCategory?: (e: React.FormEvent) => void;
  setEditIndex?: (v: number | null) => void;
  children?: React.ReactNode;
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  cat,
  index,
  selectedCat,
  startEditCategory,
  confirmAndDeleteCategory,
  setSelectedCat,
  editIndex,
  editName,
  setEditName,
  saveEditCategory,
  setEditIndex,
  children,
}) => (
  <li className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow flex flex-col gap-2">
    <div className="flex items-center gap-3 mb-2">
      {editIndex === index && setEditName && saveEditCategory && setEditIndex ? (
        <form onSubmit={saveEditCategory} className="flex gap-2 items-center">
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-2 py-1"
            autoFocus
          />
          <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded text-sm">Save</button>
          <button type="button" onClick={() => setEditIndex(null)} className="px-3 py-1 text-sm">Cancel</button>
        </form>
      ) : (
        <>
          <span className="font-semibold text-xl text-gray-900 dark:text-gray-100">{cat.name}</span>
          <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold px-2 py-1 rounded">
            {cat.products?.length ?? 0} product{(cat.products?.length ?? 0) === 1 ? "" : "s"}
          </span>
          <button onClick={() => startEditCategory(index, cat.name)} className="text-blue-600 hover:underline text-sm">Edit</button>
          <button
            onClick={() => confirmAndDeleteCategory(index)}
            className="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
          <button
            onClick={() => setSelectedCat(selectedCat === index ? null : index)}
            className="ml-auto bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded text-sm"
          >
            {(cat.products?.length ?? 0) === 0 ? "Add product" : (selectedCat === index ? "Hide Products" : "Manage Products")}
          </button>
        </>
      )}
    </div>
    {children}
  </li>
);

export default CategoryRow;
