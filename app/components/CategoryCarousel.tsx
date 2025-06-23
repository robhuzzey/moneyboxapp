import React from "react";

interface CategoryCarouselProps {
  handlePrev: () => void;
  handleNext: () => void;
  centerIdx: number;
  categories: { name: string }[];
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  handlePrev,
  handleNext,
  centerIdx,
  categories,
}) => (
  <div className="w-full max-w-4xl mx-auto flex items-center justify-center mt-6 mb-8">
    <button
      className="rounded-full bg-[#eaf1f8] text-[#00b4a0] w-12 h-12 flex items-center justify-center text-2xl shadow-md hover:bg-[#d2f4ee] transition disabled:opacity-50 border border-[#e6eaf0]"
      onClick={handlePrev}
      disabled={centerIdx === 0}
      aria-label="Previous Category"
    >
      &lt;
    </button>
    <div className="flex-1 text-center text-2xl font-bold text-[#1e2a32] tracking-tight">
      Explore Accounts
    </div>
    <button
      className="rounded-full bg-[#eaf1f8] text-[#00b4a0] w-12 h-12 flex items-center justify-center text-2xl shadow-md hover:bg-[#d2f4ee] transition disabled:opacity-50 border border-[#e6eaf0]"
      onClick={handleNext}
      disabled={centerIdx === categories.length - 1}
      aria-label="Next Category"
    >
      &gt;
    </button>
  </div>
);

export default CategoryCarousel;
