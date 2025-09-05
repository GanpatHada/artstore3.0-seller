export function validateProductForm(state: any) {
  const errors: Record<string, string> = {};

  // Title
  if (!state.title || state.title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters long.";
  }

  // Category
  if (!state.category) {
    errors.category = "Please select a category.";
  }

  // Dimensions
  (["height", "width", "thickness"] as const).forEach((dim) => {
    if (!state.dimensions[dim] || state.dimensions[dim].trim() === "") {
      errors[`dimensions.${dim}`] = `${dim.charAt(0).toUpperCase() + dim.slice(1)} is required`;
    }
  });

  // Medium
  if (!state.medium || state.medium.trim() === "") {
    errors.medium = "Medium is required.";
  }

  // Surface
  if (!state.surface || state.surface.trim() === "") {
    errors.surface = "Surface is required.";
  }

  // Weight
  if (!state.weight || isNaN(Number(state.weight)) || Number(state.weight) <= 0) {
    errors.weight = "Weight must be a positive number.";
  }

  // Descriptions: exactly 4, none empty
  for (let i = 0; i < 4; i++) {
    const desc = state.descriptions[i] || "";
    if (desc.trim() === "") {
      errors[`descriptions.${i}`] = `Description ${i + 1} cannot be empty`;
    }
  }

  // Images
  if (!state.productImages || state.productImages.length === 0) {
  errors.productImages = "At least one artwork image is required.";
}

   // Actual Price
  if (!state.actualPrice || isNaN(Number(state.actualPrice)) || Number(state.actualPrice) <= 0) {
    errors.actualPrice = "Actual price must be a positive number.";
  }

  // Discount
  if (state.discount == null || isNaN(Number(state.discount)) || Number(state.discount) < 0) {
    errors.discount = "Discount cannot be negative.";
  }

  // Stock
  if (!state.stock || isNaN(Number(state.stock)) || Number(state.stock) < 0) {
    errors.stock = "Stock must be 0 or greater.";
  }

  return errors;
}
