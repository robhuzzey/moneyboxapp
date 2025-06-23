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
  <li className="bg-white border border-[#e6eaf0] rounded-2xl p-6 shadow-md flex flex-col gap-2">
    <div className="flex items-center gap-3 mb-2">
      {editIndex === index &&
      setEditName &&
      saveEditCategory &&
      setEditIndex ? (
        <form onSubmit={saveEditCategory} className="flex gap-2 items-center">
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="border border-[#e6eaf0] bg-white text-[#1e2a32] rounded px-2 py-1"
            autoFocus
          />
          <button
            type="submit"
            className="bg-[#00b4a0] text-white px-3 py-1 rounded text-sm font-semibold"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditIndex(null)}
            className="px-3 py-1 text-sm"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span className="font-bold text-xl text-[#00b4a0]">{cat.name}</span>
          <span className="inline-block bg-[#eaf1f8] text-[#00b4a0] text-xs font-semibold px-2 py-1 rounded">
            {cat.products?.length ?? 0} product
            {(cat.products?.length ?? 0) === 1 ? "" : "s"}
          </span>
          <button
            onClick={() => startEditCategory(index, cat.name)}
            className="text-[#00b4a0] hover:underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => confirmAndDeleteCategory(index)}
            className="text-red-500 hover:underline text-sm"
          >
            Delete
          </button>
          <button
            onClick={() => setSelectedCat(selectedCat === index ? null : index)}
            className="ml-auto bg-[#eaf1f8] hover:bg-[#d2f4ee] text-[#00b4a0] px-3 py-1 rounded text-sm font-semibold"
          >
            {(cat.products?.length ?? 0) === 0
              ? "Add product"
              : selectedCat === index
              ? "Hide Products"
              : "Manage Products"}
          </button>
        </>
      )}
    </div>
    {children}
  </li>
);

export default CategoryRow;
