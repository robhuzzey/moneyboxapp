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
    className="bg-white text-[#1e2a32] rounded-3xl shadow-xl border border-[#e6eaf0] px-8 py-6 flex flex-col items-center cursor-pointer hover:scale-[1.02] transition"
    onClick={() => setOpenProductIdx(null)}
    tabIndex={0}
    aria-label={`Open ${category.name}`}
  >
    <div className="font-extrabold text-2xl mb-4 text-[#00b4a0]">
      {category.name}
    </div>
    <div className="w-full flex flex-col gap-3">
      {category.products.map((prod, idx) => (
        <div key={idx} className="w-full">
          <button
            className={`w-full flex items-center justify-between px-5 py-4 rounded-xl bg-[#f6fafd] text-[#1e2a32] font-semibold shadow border-2 border-[#e6eaf0] focus:outline-none transition
              ${openProductIdx === idx ? "border-[#00b4a0] bg-white" : ""}
            `}
            onClick={(e) => {
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
                  stroke="#00b4a0"
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
                  stroke="#00b4a0"
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
            <div className="flex gap-4 bg-[#eaf1f8] border border-[#b6c6d6] rounded-xl px-5 py-5 mt-2 shadow-inner animate-fade-in">
              <div className="flex flex-col items-center min-w-[80px]">
                <img
                  src={prod.icon}
                  alt={prod.name}
                  className="w-16 h-16 object-contain rounded-full border-2 border-[#00b4a0] mb-2 bg-white"
                />
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-xl p-4 text-[#1e2a32] min-h-[64px]">
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
