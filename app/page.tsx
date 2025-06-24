"use client";
import React, { useEffect, useState } from "react";
import CategoryCarousel from "./components/CategoryCarousel";
import CategoryCard from "./components/CategoryCard";
import Image from "next/image";

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

  // Reset open product when category changes
  useEffect(() => {
    setOpenProductIdx(null);
  }, [centerIdx]);

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
    <div className="min-h-screen bg-[#f6fafd] flex flex-col items-center pb-8 px-2 sm:px-4">
      {/* Header */}
      <header className="w-full bg-white py-6 sm:py-8 border-[#e6eaf0] mb-6 sm:mb-8 flex items-center justify-center">
        <Image
          src="/MBLogo.svg"
          alt="Moneybox Logo"
          width={120}
          height={120}
          priority
          className="h-16 w-28 sm:h-24 sm:w-36 md:h-28 md:w-44"
          style={{ objectFit: "contain" }}
        />
      </header>
      {/* Explore Accounts */}
      <CategoryCarousel
        handlePrev={handlePrev}
        handleNext={handleNext}
        centerIdx={centerIdx}
        categories={categories}
      />
      {/* Categories Row */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Left Category */}
        <div className="flex-1 flex justify-end mb-4 md:mb-0">
          {leftCat && (
            <button
              className="w-full sm:w-56 bg-white text-mb-primary rounded-2xl shadow-md border border-[#e6eaf0] flex items-center justify-center h-16 sm:h-20 font-semibold text-base sm:text-lg transition hover:scale-105 hover:bg-[#eaf1f8]"
              onClick={handlePrev}
              aria-label={`Show ${leftCat.name}`}
              tabIndex={0}
            >
              {leftCat.name}
            </button>
          )}
        </div>
        {/* Center Category */}
        <div className="flex-1 max-w-full sm:max-w-md">
          {centerCat && (
            <CategoryCard
              category={centerCat}
              openProductIdx={openProductIdx}
              setOpenProductIdx={setOpenProductIdx}
            />
          )}
        </div>
        {/* Right Category */}
        <div className="flex-1 flex justify-start mt-4 md:mt-0">
          {rightCat && (
            <button
              className="w-full sm:w-56 bg-white text-mb-primary rounded-2xl shadow-md border border-[#e6eaf0] flex items-center justify-center h-16 sm:h-20 font-semibold text-base sm:text-lg transition hover:scale-105 hover:bg-[#eaf1f8]"
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
