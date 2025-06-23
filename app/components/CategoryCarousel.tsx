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
      className="rounded-full bg-[#666] text-white w-10 h-10 flex items-center justify-center text-2xl shadow hover:bg-[#888] transition disabled:opacity-50"
      onClick={handlePrev}
      disabled={centerIdx === 0}
      aria-label="Previous Category"
    >
      &lt;
    </button>
    <div className="flex-1 text-center text-lg font-semibold text-[#4a4a4a] dark:text-gray-200">
      Explore Accounts
    </div>
    <button
      className="rounded-full bg-[#666] text-white w-10 h-10 flex items-center justify-center text-2xl shadow hover:bg-[#888] transition disabled:opacity-50"
      onClick={handleNext}
      disabled={centerIdx === categories.length - 1}
      aria-label="Next Category"
    >
      &gt;
    </button>
  </div>
);

export default CategoryCarousel;
