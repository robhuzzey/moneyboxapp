"use client";
import React, { useEffect, useState } from "react";
import CategoryCarousel from "./components/CategoryCarousel";
import CategoryCard from "./components/CategoryCard";

interface Product {
  name: string;
  icon: string;
  description: string;
}
interface Category {
  name: string;
  products: Product[];
}

export default function ViewPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [centerIdx, setCenterIdx] = useState(1); // default to 2nd category if exists
  const [openProductIdx, setOpenProductIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Clamp centerIdx to valid range
  useEffect(() => {
    if (
      categories.length &&
      (centerIdx < 0 || centerIdx >= categories.length)
    ) {
      setCenterIdx(Math.max(0, Math.min(centerIdx, categories.length - 1)));
    }
  }, [categories, centerIdx]);

  const handlePrev = () => setCenterIdx((idx) => Math.max(0, idx - 1));
  const handleNext = () =>
    setCenterIdx((idx) => Math.min(categories.length - 1, idx + 1));

  const leftCat = categories[centerIdx - 1];
  const centerCat = categories[centerIdx];
  const rightCat = categories[centerIdx + 1];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-8">
      {/* Header */}
      <header className="w-full bg-[#4a4a4a] text-white py-4 rounded-t-lg shadow text-center text-2xl font-bold tracking-wide">
        Moneybox
      </header>
      {/* Explore Accounts */}
      <CategoryCarousel
        handlePrev={handlePrev}
        handleNext={handleNext}
        centerIdx={centerIdx}
        categories={categories}
      />
      {/* Categories Row */}
      <div className="flex w-full max-w-4xl justify-center gap-6 mb-8">
        {/* Left Category */}
        <div className="flex-1 flex justify-end">
          {leftCat && (
            <button
              className="w-64 bg-[#6c6c6c] text-white rounded-lg shadow border-2 border-[#444] flex items-center justify-center h-24 font-semibold text-lg transition focus:outline-none hover:scale-105"
              onClick={handlePrev}
              aria-label={`Show ${leftCat.name}`}
              tabIndex={0}
            >
              {leftCat.name}
            </button>
          )}
        </div>
        {/* Center Category */}
        <div className="flex-1 max-w-md">
          {centerCat && (
            <CategoryCard
              category={centerCat}
              openProductIdx={openProductIdx}
              setOpenProductIdx={setOpenProductIdx}
            />
          )}
        </div>
        {/* Right Category */}
        <div className="flex-1 flex justify-start">
          {rightCat && (
            <button
              className="w-64 bg-[#6c6c6c] text-white rounded-lg shadow border-2 border-[#444] flex items-center justify-center h-24 font-semibold text-lg transition focus:outline-none hover:scale-105"
              onClick={handleNext}
              aria-label={`Show ${rightCat.name}`}
              tabIndex={0}
            >
              {rightCat.name}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
