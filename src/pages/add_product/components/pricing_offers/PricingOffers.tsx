import React from "react";
import { useProductFormContext } from "../../../../contexts/ProductFormContext";

const PricingOffers: React.FC = () => {
  const { state, dispatch } = useProductFormContext();

  const calculatedPrice =
    state.actualPrice && state.discount
      ? Math.round(state.actualPrice - (state.actualPrice * state.discount) / 100)
      : state.actualPrice || 0;

  const handleChange = (
    field: "actualPrice" | "discount" | "stock",
    value: string
  ) => {
    // Allow only digits
    if (/^\d*$/.test(value)) {
      const numericValue = value === "" ? 0 : Number(value);
      dispatch({ type: "SET_FIELD", field, value: numericValue });
    }
  };

  return (
    <section id="pricing-offers" className="add-product-form">
      <header>
        <h3>Price and Offers</h3>
      </header>
      <main>
        {/* Actual Price */}
        <div className="form-group">
          <label htmlFor="actual-price">Actual Price (INR)</label>
          <input
            type="text"
            id="actual-price"
            value={state.actualPrice ? state.actualPrice.toString() : ""}
            onChange={(e) => handleChange("actualPrice", e.target.value)}
          />
          <p className="error">{state.errors['actualPrice']}</p>
        </div>

        {/* Discount */}
        <div className="form-group">
          <label htmlFor="discount">Discount in % (If any)</label>
          <input
            type="text"
            id="discount"
            value={state.discount ? state.discount.toString() : ""}
            onChange={(e) => handleChange("discount", e.target.value)}
          />
           <p className="error">{state.errors['discount']}</p>
        </div>

        {/* Calculated Price */}
        <div>
          <h4>MRP: {state.actualPrice ? `₹${calculatedPrice}` : "-"}</h4>
          <p className="info">Delivery charges excluded</p>
        </div>

        {/* Stock */}
        <div className="form-group">
          <label htmlFor="stock">Total Stock</label>
          <input
            type="text"
            id="stock"
            value={state.stock ? state.stock.toString() : ""}
            onChange={(e) => handleChange("stock", e.target.value)}
          />
           <p className="error">{state.errors['stock']}</p>
        </div>
      </main>
    </section>
  );
};

export default PricingOffers;
