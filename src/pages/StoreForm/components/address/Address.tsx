import React, { useState } from "react";
import { useStoreFormContext } from "../../../../contexts/StoreContext";
import {
  getLocationByPincode,
} from "../../../../services/storeService";
import "./Address.css";
import { generateRandomStreet } from "../../../../utils/storeUtil";

const Address: React.FC = () => {
  const { state, dispatch } = useStoreFormContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFillRandomStreet = () => {
    dispatch({
      type: "SET_FIELD_VALUE",
      field: "street",
      payload: generateRandomStreet(),
    });
  };

  const handlePostalCodeBlur = async () => {
    const postalCode = state.postalCode.value.trim();
    if (!postalCode) return;

    try {
      setLoading(true);
      dispatch({
        type: "CLEAR_FIELD_ERROR",
        field: "postalCode",
      });

      const location = await getLocationByPincode(postalCode);

      dispatch({
        type: "SET_FIELD_VALUE",
        field: "city",
        payload: location.city,
      });
      dispatch({
        type: "SET_FIELD_VALUE",
        field: "state",
        payload: location.state,
      });
      dispatch({
        type: "SET_FIELD_VALUE",
        field: "country",
        payload: location.country,
      });
    } catch (error) {
      dispatch({
        type: "SET_FIELD_ERROR",
        field: "postalCode",
        payload: "Invalid or unsupported PIN code",
      });
      dispatch({ type: "SET_FIELD_VALUE", field: "city", payload: "" });
      dispatch({ type: "SET_FIELD_VALUE", field: "state", payload: "" });
      dispatch({ type: "SET_FIELD_VALUE", field: "country", payload: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <header>
        <h2>Address</h2>
      </header>

      <main>
        {/* Postal Code */}
        <div>
          <label>
            Postal Code <span className="error">*</span>
          </label>
          <input
            type="text"
            value={state.postalCode.value}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD_VALUE",
                field: "postalCode",
                payload: e.target.value,
              })
            }
            onBlur={handlePostalCodeBlur}
          />
          {state.postalCode.error && (
            <p className="error">{state.postalCode.error}</p>
          )}
        </div>

        {/* Street */}
        <div>
          <label>
            Street <span className="error">*</span>
          </label>
          <div>
            <input
              type="text"
              value={state.street.value}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD_VALUE",
                  field: "street",
                  payload: e.target.value,
                })
              }
            />
            <button
              type="button"
              onClick={handleFillRandomStreet}
              className="fill-random-button"
            >
              Fill Random
            </button>
          </div>
          {state.street.error && <p className="error">{state.street.error}</p>}
        </div>

        {/* City (auto-filled) */}
        <div>
          <label>
            City <span className="error">*</span>
          </label>
          <input
            type="text"
            value={loading ? "Fetching ..." : state.city.value}
            readOnly
          />
          {state.city.error && <p className="error">{state.city.error}</p>}
        </div>

        {/* State (auto-filled) */}
        <div>
          <label>
            State <span className="error">*</span>
          </label>
          <input
            type="text"
            value={loading ? "Fetching ..." : state.state.value}
            readOnly
          />
          {state.state.error && <p className="error">{state.state.error}</p>}
        </div>

        {/* Country (auto-filled) */}
        <div>
          <label>
            Country <span className="error">*</span>
          </label>
          <input
            type="text"
            value={loading ? "Fetching ..." : state.country.value}
            readOnly
          />
          {state.country.error && (
            <p className="error">{state.country.error}</p>
          )}
        </div>
      </main>
    </section>
  );
};

export default Address;
