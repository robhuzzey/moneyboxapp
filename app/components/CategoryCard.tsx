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
    className="bg-white text-[#1e2a32] rounded-3xl shadow-xl border border-[#e6eaf0] px-4 sm:px-8 py-4 sm:py-6 flex flex-col items-center cursor-pointer hover:scale-[1.02] transition w-full max-w-full sm:max-w-md min-w-[0]"
    onClick={() => setOpenProductIdx(null)}
    tabIndex={0}
    aria-label={`Open ${category.name}`}
  >
    <div className="font-extrabold text-xl sm:text-2xl mb-3 sm:mb-4 text-[#00b4a0] text-center w-full">
      {category.name}
    </div>
    <div className="w-full flex flex-col gap-2 sm:gap-3">
      {category.products.map((prod, idx) => (
        <div key={idx} className="w-full">
          <button
            className={`w-full flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 rounded-xl bg-[#f6fafd] text-[#1e2a32] font-semibold shadow border-2 border-[#e6eaf0] focus:outline-none transition
              ${openProductIdx === idx ? "border-[#00b4a0] bg-white" : ""}
            `}
            onClick={(e) => {
              e.stopPropagation();
              setOpenProductIdx(openProductIdx === idx ? null : idx);
            }}
            aria-expanded={openProductIdx === idx}
          >
            <span className="truncate text-sm sm:text-base">{prod.name}</span>
            <span className="ml-2 flex items-center justify-center w-8 h-8">
              {openProductIdx === idx ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="#222"
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
                  stroke="#222"
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
          <div
            className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
              openProductIdx === idx
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 bg-[#eaf1f8] border border-[#b6c6d6] rounded-xl px-4 sm:px-10 py-5 sm:py-7 mt-2 sm:mt-3 shadow-inner items-center justify-center">
              <div className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
                <img
                  src={prod.icon}
                  alt={prod.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full border-2 border-[#00b4a0] mb-2 bg-white"
                />
              </div>
              <div className="flex-1 w-full">
                <div className="bg-white rounded-xl p-4 sm:p-6 text-[#1e2a32] min-h-[48px] sm:min-h-[64px]">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: prod.description,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CategoryCard;
