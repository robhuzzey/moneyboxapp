import React from "react";

interface Product {
  name: string;
  icon: string;
  description: string;
}
interface Category {
  name: string;
  products: Product[];
}

interface CategoryCardProps {
  category: Category;
  openProductIdx: number | null;
  setOpenProductIdx: (idx: number | null) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  openProductIdx,
  setOpenProductIdx,
}) => (
  <div
    className="bg-[#4a4a4a] text-white rounded-lg shadow-lg border-4 border-[#444] px-6 py-4 flex flex-col items-center cursor-pointer hover:scale-[1.02] transition"
    onClick={() => setOpenProductIdx(null)}
    tabIndex={0}
    aria-label={`Open ${category.name}`}
  >
    <div className="font-bold text-xl mb-4">{category.name}</div>
    <div className="w-full flex flex-col gap-3">
      {category.products.map((prod, idx) => (
        <div key={idx} className="w-full">
          <button
            className={`w-full flex items-center justify-between px-4 py-3 rounded bg-white text-[#222] font-medium shadow border-2 border-[#bbb] focus:outline-none transition
              ${openProductIdx === idx ? "border-blue-500" : ""}
            `}
            onClick={e => {
              e.stopPropagation();
              setOpenProductIdx(openProductIdx === idx ? null : idx);
            }}
            aria-expanded={openProductIdx === idx}
          >
            <span>{prod.name}</span>
            <span className="ml-2">
              {openProductIdx === idx ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="#4a4a4a"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="#4a4a4a"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              )}
            </span>
          </button>
          {openProductIdx === idx && (
            <div className="flex gap-4 bg-gray-50 border border-blue-200 rounded-b px-4 py-4 mt-1 shadow-inner animate-fade-in">
              <div className="flex flex-col items-center min-w-[80px]">
                <img
                  src={prod.icon}
                  alt={prod.name}
                  className="w-16 h-16 object-contain rounded border mb-2 bg-white"
                />
              </div>
              <div className="flex-1">
                <div className="bg-white rounded p-3 text-gray-800 min-h-[64px]">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: prod.description,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default CategoryCard;
