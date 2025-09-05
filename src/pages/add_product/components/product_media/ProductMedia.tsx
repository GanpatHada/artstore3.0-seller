import React, { useRef } from "react";
import "./ProductMedia.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { useProductFormContext } from "../../../../contexts/ProductFormContext";

const ProductMedia: React.FC = () => {
  const { state, dispatch } = useProductFormContext();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleFileChange = (index: number, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const newImages = [...state.productImages];
      newImages[index] = reader.result as string;
      dispatch({ type: "SET_FIELD", field: "productImages", value: newImages });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    const newImages = state.productImages.filter((_, i) => i !== index);
    dispatch({ type: "SET_FIELD", field: "productImages", value: newImages });
  };

  const moveImage = (index: number, direction: "left" | "right") => {
    const newImages = [...state.productImages];
    const swapIndex = direction === "left" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newImages.length) return;

    [newImages[index], newImages[swapIndex]] = [
      newImages[swapIndex],
      newImages[index],
    ];
    dispatch({ type: "SET_FIELD", field: "productImages", value: newImages });
  };

  const hasImageError = Boolean(state.errors.productImages);

  return (
    <section id="product-media" className="add-product-form">
      <h3>Upload Artwork Images</h3>

      <div
        className="media-grid"
        style={{
          border: hasImageError ? "1px solid #d10000" : undefined,
          padding: hasImageError ? "4px" : undefined,
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => {
          const img = state.productImages[index] || null;

          return (
            <div
              key={index}
              className="media-box"
              onClick={() => {
                if (!img) inputRefs.current[index]?.click();
              }}
            >
              {img ? (
                <div className="preview-wrapper">
                  <img
                    src={img}
                    alt={`preview-${index}`}
                    className="preview-image"
                  />
                  <div className="action-row">
                    <button
                      onClick={() => moveImage(index, "left")}
                      disabled={index === 0}
                    >
                      <FaAngleLeft />
                    </button>
                    <button onClick={() => removeImage(index)}>
                      <FaRegTrashAlt />
                    </button>
                    <button
                      onClick={() => moveImage(index, "right")}
                      disabled={index === state.productImages.length - 1}
                    >
                      <FaAngleRight />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <MdAddAPhoto size={28} />
                  <p>Upload</p>
                  <input
                    id={`file-${index}`}
                    type="file"
                    hidden
                    accept="image/*"
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    onChange={(e) =>
                      handleFileChange(index, e.target.files?.[0] || null)
                    }
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Error message at the bottom */}
      {hasImageError && (
        <p className="error" style={{ color: "#d10000", marginTop: "6px" }}>
          {state.errors.productImages}
        </p>
      )}
    </section>
  );
};

export default ProductMedia;
