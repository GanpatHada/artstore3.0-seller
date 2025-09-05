import React from "react";
import "./ProductIdentity.css";
import { useProductFormContext } from "../../../../contexts/ProductFormContext";

const ART_CATEGORIES = [
  "Madhubani",
  "Phad",
  "Warli",
  "Pattachitra",
  "Miniature",
  "Gond",
  "Kalighat",
  "Tanjore",
  "Others",
];

const ProductIdentity: React.FC = () => {
  const { state, dispatch } = useProductFormContext();

  return (
    <section id="product-identity" className="add-product-form">
      <header>
        <h3>Product Identity</h3>
      </header>
      <main>
        <div className="form-group">
          <label htmlFor="title">Artwork Title:</label>
          <textarea
            id="title"
            value={state.title}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "title", value: e.target.value })
            }
            style={{ borderColor: state.errors.title ? '#d10000' : undefined }}
            placeholder="e.g., Peacock dancing in the rain during monsoon"
          />
          {state.errors.title && <p className="error">{state.errors.title}</p>}
          <p className="info">
            Add a clear and descriptive title for your artwork. A good title should mention
            the main subject and mood of the painting. Keep it short and simple — avoid just
            "Untitled" or one-word titles.
          </p>
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Select Art Style / Category</label>
          <select
            id="category"
            value={state.category}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "category", value: e.target.value })
            }
            style={{ borderColor: state.errors.category ? '#d10000' : undefined }}
          >
            <option value="" disabled>
              -- Select --
            </option>
            {ART_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {state.errors.category && <p className="error">{state.errors.category}</p>}
        </div>
      </main>
    </section>
  );
};

export default ProductIdentity;
