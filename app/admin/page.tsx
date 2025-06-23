"use client";
import { useEffect, useState, useRef } from "react";
import ProductForm from "../components/ProductForm";
import CategoryRow from "../components/CategoryRow";
import ProductList from "../components/ProductList";

export default function AdminPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [productName, setProductName] = useState("");
  const [productIcon, setProductIcon] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [selectedCat, setSelectedCat] = useState<number | null>(null);
  const [editProductIndex, setEditProductIndex] = useState<number | null>(null);
  const [editProductName, setEditProductName] = useState("");
  const [editProductIcon, setEditProductIcon] = useState("");
  const [editProductDesc, setEditProductDesc] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name, products: [] }),
      headers: { "Content-Type": "application/json" },
    });
    setName("");
    setCategories(await fetch("/api/categories").then((res) => res.json()));
  }

  async function deleteCategory(index: number) {
    await fetch("/api/categories", {
      method: "DELETE",
      body: JSON.stringify({ index }),
      headers: { "Content-Type": "application/json" },
    });
    setCategories(await fetch("/api/categories").then((res) => res.json()));
  }

  function startEditCategory(index: number, name: string) {
    setEditIndex(index);
    setEditName(name);
  }

  async function saveEditCategory(e: React.FormEvent) {
    e.preventDefault();
    if (editIndex === null) return;
    await fetch("/api/categories", {
      method: "PUT",
      body: JSON.stringify({ index: editIndex, name: editName }),
      headers: { "Content-Type": "application/json" },
    });
    setEditIndex(null);
    setEditName("");
    setCategories(await fetch("/api/categories").then((res) => res.json()));
  }

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    if (selectedCat === null) return;
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        categoryIndex: selectedCat,
        product: {
          name: productName,
          icon: productIcon,
          description: productDesc,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    setProductName("");
    setProductIcon("");
    setProductDesc("");
    setCategories(await fetch("/api/categories").then((res) => res.json()));
  }

  async function deleteProduct(categoryIndex: number, productIndex: number) {
    await fetch("/api/products", {
      method: "DELETE",
      body: JSON.stringify({ categoryIndex, productIndex }),
      headers: { "Content-Type": "application/json" },
    });
    setCategories(await fetch("/api/categories").then((res) => res.json()));
  }

  function startEditProduct(prod: any, idx: number) {
    setEditProductIndex(idx);
    setEditProductName(prod.name);
    setEditProductIcon(prod.icon);
    setEditProductDesc(prod.description);
  }

  async function saveEditProduct(e: React.FormEvent, catIdx: number) {
    e.preventDefault();
    if (editProductIndex === null) return;
    await fetch("/api/products", {
      method: "PUT",
      body: JSON.stringify({
        categoryIndex: catIdx,
        productIndex: editProductIndex,
        product: {
          name: editProductName,
          icon: editProductIcon,
          description: editProductDesc,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    setEditProductIndex(null);
    setEditProductName("");
    setEditProductIcon("");
    setEditProductDesc("");
    setCategories(await fetch("/api/categories").then((res) => res.json()));
  }

  async function reorderProducts(catIdx: number, from: number, to: number) {
    if (from === to) return;
    const cat = categories[catIdx];
    const products = [...cat.products];
    const [moved] = products.splice(from, 1);
    products.splice(to, 0, moved);
    await fetch("/api/products", {
      method: "PUT",
      body: JSON.stringify({
        categoryIndex: catIdx,
        reorder: products,
      }),
      headers: { "Content-Type": "application/json" },
    });
    setCategories(await fetch("/api/categories").then((res) => res.json()));
  }

  async function handleIconUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    setIcon: (url: string) => void
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setIcon(data.url);
    setUploading(false);
  }

  async function confirmAndDeleteProduct(
    categoryIndex: number,
    productIndex: number
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      await deleteProduct(categoryIndex, productIndex);
    }
  }

  // Add confirmation before deleting a category
  async function confirmAndDeleteCategory(index: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmed) {
      await deleteCategory(index);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 mt-12 bg-white rounded-3xl shadow-2xl border border-[#e6eaf0]">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-[#00b4a0] tracking-tight">
        Admin Panel
      </h1>
      <form
        onSubmit={addCategory}
        className="flex flex-col sm:flex-row gap-3 mb-10 items-center justify-center"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="border border-[#e6eaf0] bg-[#f6fafd] text-[#1e2a32] rounded-full px-6 py-3 flex-1 shadow-sm focus:ring-2 focus:ring-[#00b4a0] focus:bg-white placeholder-[#b6c6d6] font-medium text-base transition"
        />
        <button
          type="submit"
          className="bg-[#00b4a0] hover:bg-[#009e8c] text-white px-6 py-2 rounded-full font-semibold shadow"
        >
          Add Category
        </button>
      </form>
      <ul className="space-y-8">
        {categories.map((cat, i) => (
          <CategoryRow
            key={i}
            cat={cat}
            index={i}
            selectedCat={selectedCat}
            startEditCategory={startEditCategory}
            confirmAndDeleteCategory={confirmAndDeleteCategory}
            setSelectedCat={setSelectedCat}
            editIndex={editIndex}
            editName={editName}
            setEditName={setEditName}
            saveEditCategory={saveEditCategory}
            setEditIndex={setEditIndex}
          >
            {selectedCat === i && (
              <div className="ml-2 mt-4">
                {editProductIndex === null && (
                  <ProductForm
                    name={productName}
                    setName={setProductName}
                    icon={productIcon}
                    setIcon={setProductIcon}
                    desc={productDesc}
                    setDesc={setProductDesc}
                    fileInputRef={fileInputRef}
                    uploading={uploading}
                    onIconUpload={handleIconUpload}
                    onSubmit={addProduct}
                    submitLabel="Add Product"
                  />
                )}
                <ProductList
                  products={cat.products}
                  catIndex={i}
                  editProductIndex={editProductIndex}
                  editProductName={editProductName}
                  setEditProductName={setEditProductName}
                  editProductIcon={editProductIcon}
                  setEditProductIcon={setEditProductIcon}
                  editProductDesc={editProductDesc}
                  setEditProductDesc={setEditProductDesc}
                  editFileInputRef={editFileInputRef}
                  uploading={uploading}
                  handleIconUpload={handleIconUpload}
                  saveEditProduct={saveEditProduct}
                  startEditProduct={startEditProduct}
                  setEditProductIndex={setEditProductIndex}
                  confirmAndDeleteProduct={confirmAndDeleteProduct}
                  reorderProducts={reorderProducts}
                />
              </div>
            )}
          </CategoryRow>
        ))}
      </ul>
    </div>
  );
}
