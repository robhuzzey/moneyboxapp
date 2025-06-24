import React from "react";
import Image from "next/image";

interface ProductFormProps {
  name: string;
  setName: (v: string) => void;
  icon: string;
  setIcon: (v: string) => void;
  desc: string;
  setDesc: (v: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  uploading: boolean;
  onIconUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    setIcon: (url: string) => void
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
  iconPreview?: string;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  name,
  setName,
  icon,
  setIcon,
  desc,
  setDesc,
  fileInputRef,
  uploading,
  onIconUpload,
  onSubmit,
  submitLabel,
  iconPreview,
  onCancel,
}) => (
  <form
    onSubmit={onSubmit}
    className="flex flex-col gap-4 sm:gap-6 mt-6 sm:mt-8 bg-white p-4 sm:p-8 rounded-3xl shadow-xl border border-[#e6eaf0] font-sans w-full"
    style={{
      background: "#fff",
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      boxShadow: "0 8px 32px 0 rgba(30,42,50,0.10)",
      borderColor: "#e6eaf0",
    }}
  >
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1e2a32] text-base mb-1 tracking-tight">
            Product Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            className="border border-[#e6eaf0] bg-white text-[#1e2a32] rounded-lg px-4 sm:px-5 py-2 sm:py-3 text-base font-medium focus:border-[#00b4a0] focus:ring-2 focus:ring-[#00b4a0] transition placeholder-[#b6c6d6]"
            style={{
              background: "#fff",
              color: "#1e2a32",
              fontWeight: 500,
              letterSpacing: "0.01em",
            }}
          />
        </div>
        <div className="flex flex-col gap-2 justify-end">
          <div className="flex items-end h-full mt-[1.2rem] sm:mt-[2.1rem]">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => onIconUpload(e, setIcon)}
            />
            {icon || iconPreview ? (
              <div
                className="relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                tabIndex={0}
                role="button"
                aria-label="Change icon"
              >
                <Image
                  src={icon || iconPreview || ""}
                  alt="icon preview"
                  width={48}
                  height={48}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#00b4a0] bg-white shadow transition-shadow object-cover"
                  style={{
                    background: "#fff",
                    boxShadow: "0 2px 8px 0 rgba(0,180,160,0.10)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#00b4a0]/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-semibold">
                    Change Icon
                  </span>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#00b4a0] hover:bg-[#009e8c] text-white font-semibold px-4 sm:px-5 py-2 rounded-full shadow text-sm transition-colors border-2 border-[#00b4a0]"
                disabled={uploading}
                style={{
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  boxShadow: "0 2px 8px 0 rgba(0,180,160,0.10)",
                }}
              >
                {uploading ? "Uploading..." : "Upload Icon"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-[#1e2a32] text-base mb-1 tracking-tight">
        Description (Markdown or HTML)
      </label>
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border border-[#e6eaf0] bg-white text-[#1e2a32] rounded-lg px-4 sm:px-5 py-2 sm:py-3 text-base font-medium focus:border-[#00b4a0] focus:ring-2 focus:ring-[#00b4a0] transition min-h-[70px] sm:min-h-[90px] placeholder-[#b6c6d6]"
        placeholder="Enter product description (Markdown or HTML supported)"
        style={{
          background: "#fff",
          color: "#1e2a32",
          fontWeight: 500,
          letterSpacing: "0.01em",
        }}
      />
    </div>
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-end mt-2">
      <button
        type="submit"
        className="bg-[#00b4a0] hover:bg-[#009e8c] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow w-full sm:w-auto text-base transition"
        style={{
          minWidth: 120,
          fontWeight: 700,
          letterSpacing: "0.01em",
          boxShadow: "0 2px 8px 0 rgba(0,180,160,0.10)",
        }}
      >
        {submitLabel}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="bg-white hover:bg-[#f0f4f8] text-[#009e8c] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow w-full sm:w-auto text-base border border-[#00b4a0] transition focus:outline-none focus:ring-2 focus:ring-[#00b4a0] focus:ring-offset-2"
          style={{
            fontWeight: 700,
            letterSpacing: "0.01em",
            background: "#fff",
            borderColor: "#00b4a0",
            color: "#009e8c",
            boxShadow: "0 2px 8px 0 rgba(0,180,160,0.08)",
            minWidth: 120,
          }}
        >
          Cancel
        </button>
      )}
    </div>
  </form>
);

export default ProductForm;
