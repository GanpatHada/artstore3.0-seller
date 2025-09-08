import React, { useState } from "react";
import "./ProductDescription.css";
import { useProductFormContext } from "../../../../contexts/ProductFormContext";
import { BsStars } from "react-icons/bs";
import { generateBulletPointUsingAI } from "../../../../services/addProductService";
import toast from "react-hot-toast";
import spinner from '../../../../assets/spinner.svg'


const DescriptionBullets = () => {
  const { state, dispatch } = useProductFormContext();
  const [loading,setLoading]=useState(false)
  const handleGenerateWithAI=async()=>{
    const {title,category,dimensions:{height,width},weight,surface,medium}=state;
    const fields = [
    { name: "title", value: title },
    { name: "category", value: category },
    { name: "height", value: height },
    { name: "width", value: width },
    { name: "weight", value: weight },
    { name: "surface", value: surface },
    { name: "medium", value: medium },
  ];

  const missing = fields
    .filter(({ value }) => value === null || value === undefined || value.toString().trim().length === 0)
    .map(({ name }) => name);

  if (missing.length > 0) {
    dispatch({type:'SET_ERROR',field:'descriptions',error:`Please provide: ${missing.join(", ")} to use this feature`});
    return;
  }
  try {
    setLoading(true)
    const descriptions =  await generateBulletPointUsingAI(title,category,height,width,weight.toString()||"",surface,medium);
    dispatch({ type: "SET_ALL_DESCRIPTIONS", values: descriptions });
    
  } catch (error:any) {
    toast.error(error.message || "unable to generate at the moment")
  }
  finally{
    setLoading(false)
  }

  }


  const handleDescriptionChange = (index: number, value: string) => {
    const updated = [...state.descriptions];
    updated[index] = value;
    dispatch({ type: "SET_FIELD", field: "descriptions", value: updated });
  };

  const descriptionFields = Array.from(
    { length: 4 },
    (_, i) => state.descriptions[i] || ""
  );


  return (
    <div id="description-bullets">
      <header>
             <div>
              <h4>Product Description</h4>
             <h5>Bullet Points*</h5>
             </div>
             <div  id="ai-button-wrapper">
              <button 
              disabled={loading} 
              onClick={handleGenerateWithAI}>
              Auto Generate with AI {loading?<span><img height="30px" src={spinner} alt="" /></span>:<span><BsStars/></span>}
              </button>
             </div>
             
      </header>
      <main>
        <p className="error">{state.errors["descriptions"]}</p>
        {descriptionFields.map((desc, idx) => (
          <div className="form-group" key={idx}>
            <textarea
              id={`description-${idx}`}
              placeholder={`Write description ${idx + 1}`}
              value={desc}
              onChange={(e) => handleDescriptionChange(idx, e.target.value)}
              style={{
                borderColor: state.errors['descriptions']?.length>0&&desc.length===0||undefined
                  ? "#d10000"
                  : undefined,
              }}
            />
          </div>
        ))}
      </main>

    </div>
  )
}

const ProductDescription: React.FC = () => {
  const { state, dispatch } = useProductFormContext();
  const [heightUnit, setHeightUnit] = useState("cm");
  const [widthUnit, setWidthUnit] = useState("cm");
  const [thicknessUnit, setThicknessUnit] = useState("mm");

  const handleFieldChange = (
  field: "height" | "width" | "thickness" | "weight" | "medium" | "surface",
  value: string
) => {
  if (field === "medium" || field === "surface") {
    dispatch({ type: "SET_FIELD", field, value });
  } else if (/^\d*$/.test(value)) {
    if (field === "height" || field === "width" || field === "thickness") {
      dispatch({
        type: "SET_DIMENSION",
        field: field, 
        value: Number(value),
      });
    } else if (field === "weight") {
      dispatch({ type: "SET_FIELD", field, value });
    }
  }
};



  return (
    <section id="product-description" className="add-product-form">
      <header>
        <h3>Product Description</h3>
      </header>
      <main>
        <section id="product-dimensions">
          {/* Height */}
          <div className="form-group">
            <label htmlFor="height">Height</label>
            <div>
              <input
                id="height"
                type="text"
                placeholder="e.g. 60"
                value={state.dimensions.height}
                onChange={(e) =>
                  handleFieldChange("height", e.target.value)
                }
                style={{
                  borderColor: state.errors["dimensions.height"]
                    ? "#d10000"
                    : undefined,
                }}
              />
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value)}
              >
                <option value="cm">cm</option>
                <option value="inch">inch</option>
              </select>
            </div>
            {state.dimensions.height && (
              <p>
                {state.dimensions.height} {heightUnit}
              </p>
            )}
            {state.errors["dimensions.height"] && (
              <p className="error">{state.errors["dimensions.height"]}</p>
            )}
          </div>

          {/* Width */}
          <div className="form-group">
            <label htmlFor="width">Width</label>
            <div>
              <input
                id="width"
                type="text"
                placeholder="e.g. 40"
                value={state.dimensions.width}
                onChange={(e) => handleFieldChange("width", e.target.value)}
                style={{
                  borderColor: state.errors["dimensions.width"]
                    ? "#d10000"
                    : undefined,
                }}
              />
              <select
                value={widthUnit}
                onChange={(e) => setWidthUnit(e.target.value)}
              >
                <option value="cm">cm</option>
                <option value="inch">inch</option>
              </select>
            </div>
            {state.dimensions.width && (
              <p>
                {state.dimensions.width} {widthUnit}
              </p>
            )}
            {state.errors["dimensions.width"] && (
              <p className="error">{state.errors["dimensions.width"]}</p>
            )}
          </div>

          {/* Thickness */}
          <div className="form-group">
            <label htmlFor="thickness">Thickness</label>
            <div>
              <input
                id="thickness"
                type="text"
                placeholder="e.g. 20"
                value={state.dimensions.thickness}
                onChange={(e) =>
                  handleFieldChange("thickness", e.target.value)
                }
                style={{
                  borderColor: state.errors["dimensions.thickness"]
                    ? "#d10000"
                    : undefined,
                }}
              />
              <select
                value={thicknessUnit}
                onChange={(e) => setThicknessUnit(e.target.value)}
              >
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="inch">inch</option>
                <option value="gsm">gsm</option>
              </select>
            </div>
            {state.dimensions.thickness && (
              <p>
                {state.dimensions.thickness} {thicknessUnit}
              </p>
            )}
            {state.errors["dimensions.thickness"] && (
              <p className="error">{state.errors["dimensions.thickness"]}</p>
            )}
          </div>
        </section>

        {/* Medium */}
        <div className="form-group">
          <label htmlFor="medium">Medium</label>
          <input
            id="medium"
            type="text"
            placeholder="e.g. Oil, Acrylic"
            value={state.medium}
            onChange={(e) => handleFieldChange("medium", e.target.value)}
            style={{ borderColor: state.errors.medium ? "#d10000" : undefined }}
          />
          {state.errors.medium && <p className="error">{state.errors.medium}</p>}
        </div>

        {/* Surface */}
        <div className="form-group">
          <label htmlFor="surface">Surface</label>
          <input
            id="surface"
            type="text"
            placeholder="e.g. Canvas, Paper"
            value={state.surface}
            onChange={(e) => handleFieldChange("surface", e.target.value)}
            style={{ borderColor: state.errors.surface ? "#d10000" : undefined }}
          />
          {state.errors.surface && (
            <p className="error">{state.errors.surface}</p>
          )}
        </div>

        {/* Weight */}
        <div className="form-group">
          <label htmlFor="weight">Weight (gm)</label>
          <input
            id="weight"
            type="text"
            placeholder="e.g. 250"
            value={state.weight ? state.weight.toString() : ''}
            onChange={(e) => handleFieldChange("weight", e.target.value)}
            style={{ borderColor: state.errors.weight ? "#d10000" : undefined }}
          />
          {state.errors.weight && <p className="error">{state.errors.weight}</p>}
        </div>
        <DescriptionBullets />
      </main>
    </section>
  );
};

export default ProductDescription;
