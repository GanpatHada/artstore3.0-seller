import React, { useRef, useState } from "react";
import "./ProductMedia.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { useProductFormContext } from "../../../../contexts/ProductFormContext";

const ProductMedia: React.FC = () => {
  const { state, dispatch } = useProductFormContext();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [previews, setPreviews] = useState<(string | null)[]>(state.productImages.map(() => null));


  const handleFileChange = (index: number, file: File | null) => {
    if (!file) return;


    const reader = new FileReader();
    reader.onload = () => {
      const newPreviews = [...previews];
      newPreviews[index] = reader.result as string;
      setPreviews(newPreviews);
    };
    reader.readAsDataURL(file);


    const newFiles = [...state.productImages];
    newFiles[index] = file;
    dispatch({ type: "SET_FIELD", field: "productImages", value: newFiles });
  };

  const removeImage = (index: number) => {
    const newFiles = state.productImages.filter((_, i) => i !== index);
    dispatch({ type: "SET_FIELD", field: "productImages", value: newFiles });

    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

  const moveImage = (index: number, direction: "left" | "right") => {
    const swapIndex = direction === "left" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= state.productImages.length) return;


    const newFiles = [...state.productImages];
    [newFiles[index], newFiles[swapIndex]] = [newFiles[swapIndex], newFiles[index]];
    dispatch({ type: "SET_FIELD", field: "productImages", value: newFiles });


    const newPreviews = [...previews];
    [newPreviews[index], newPreviews[swapIndex]] = [newPreviews[swapIndex], newPreviews[index]];
    setPreviews(newPreviews);
  };

  const hasImageError = Boolean(state.errors.productImages);

  return (
    <section id="product-media" className="add-product-form">
      <header>
        <h3>Upload Artwork Images</h3>
        <p className="sub-info">Upload upto 4 images</p>
      </header>
      <div
        className="media-grid"
        style={{
          border: hasImageError ? "1px solid #d10000" : undefined,
          padding: hasImageError ? "4px" : undefined,
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => {
          const preview = previews[index] || null;
          const fileExists = !!state.productImages[index];

          return (
            <div
              key={index}
              className="media-box"
              onClick={() => {
                if (!fileExists) inputRefs.current[index]?.click();
              }}
            >
              {preview ? (
                <div className="preview-wrapper">
                  <img src={preview} alt={`preview-${index}`} className="preview-image" />
                  <div className="action-row">
                    <button onClick={() => moveImage(index, "left")} disabled={index === 0}>
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
                    ref={(el: HTMLInputElement | null) => {
                      inputRefs.current[index] = el;
                    }}
                    onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {hasImageError && (
        <p className="error" style={{ color: "#d10000", marginTop: "6px" }}>
          {state.errors.productImages}
        </p>
      )}
    </section>
  );
};

export default ProductMedia;
