import React from "react";
import "./Tabs.css";
import { useProductFormContext } from "../../../../contexts/ProductFormContext";
import { MdError } from "react-icons/md";

const tabLabels = [
  "Product identity",
  "Product description",
  "Media",
  "Pricing & offers",
];


const tabFields = [
  ["title", "category"],
  [
    "descriptions.0",
    "descriptions.1",
    "descriptions.2",
    "descriptions.3",
    "dimensions.height",
    "dimensions.width",
    "dimensions.thickness",
    "medium",
    "surface",
    "weight",
  ],
  ["productImages"],
  ["actualPrice", "discount", "stock"],
];

const Tabs: React.FC = () => {
  const { state, dispatch } = useProductFormContext();

  const handleTabClick = (index: number) => {
    dispatch({ type: "SET_ACTIVE_TAB", value: index });
  };

  const tabHasError = (tabIndex: number) => {
    return tabFields[tabIndex].some((field) => field in state.errors);
  };

  return (
    <nav id="tabs">
      <ul>
        {tabLabels.map((label, index) => {
          const isActive = state.activeTab === index;
          const hasError = tabHasError(index);

          return (
            <li
              key={label}
              className={[isActive ? "active" : "", hasError ? "error" : ""].join(" ")}
              onClick={() => handleTabClick(index)}
            >
              {label}
              {hasError &&<MdError color="#d10000" />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Tabs;
