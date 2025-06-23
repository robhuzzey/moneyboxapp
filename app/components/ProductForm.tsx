import React from "react";

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
    className="flex flex-col gap-4 mb-6 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-inner"
  >
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700 dark:text-gray-200">
            Product Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-1"
          />
        </div>
        <div className="flex flex-col gap-1 justify-end">
          <div className="flex items-end h-full mt-[1.85rem]">
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
                <img
                  src={icon || iconPreview}
                  alt="icon preview"
                  className="w-14 h-14 rounded border transition-shadow"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-semibold">
                    Change Icon
                  </span>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow text-sm transition-colors border-2 border-blue-600"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Icon"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-1">
      <label className="font-medium text-gray-700 dark:text-gray-200">
        Description (Markdown or HTML)
      </label>
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-1 min-h-[80px]"
        placeholder="Enter product description (Markdown or HTML supported)"
      />
    </div>
    <div className="flex gap-2 items-end">
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold shadow w-full sm:w-auto"
        style={{ minWidth: 120 }}
      >
        {submitLabel}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded font-semibold shadow w-full sm:w-auto"
        >
          Cancel
        </button>
      )}
    </div>
  </form>
);

export default ProductForm;
