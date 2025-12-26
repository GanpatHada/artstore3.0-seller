export function validateProductForm(state: any) {
  const errors: Record<string, string> = {};

  // Title
  if (!state.title || state.title.trim().length < 10) {
    errors.title = 'Title must be at least 10 characters long.';
  }

  // Category
  if (!state.category) {
    errors.category = 'Please select a category.';
  }

  // Dimensions
  (['height', 'width', 'thickness'] as const).forEach((dim) => {
    if (!state.dimensions[dim] || state.dimensions[dim].trim() === '') {
      errors[`dimensions.${dim}`] =
        `${dim.charAt(0).toUpperCase() + dim.slice(1)} is required`;
    }
  });

  // Medium
  if (!state.medium || state.medium.trim() === '') {
    errors.medium = 'Medium is required.';
  }

  // Surface
  if (!state.surface || state.surface.trim() === '') {
    errors.surface = 'Surface is required.';
  }

  // Weight
  if (!state.weight || state.weight.trim().length === 0) {
    errors.weight = 'Weight must be a positive number.';
  }

  // Descriptions: exactly 4, none empty
  if (
    state.descriptions.length !== 4 ||
    state.descriptions.some((d: string) => d.trim().length === 0)
  ) {
    errors.descriptions = 'Exactly four complete bullet points are required';
  }

  // Images
  if (!state.productImages || state.productImages.length === 0) {
    errors.productImages = 'At least one artwork image is required.';
  }

  // Actual Price
  if (
    !state.actualPrice ||
    isNaN(Number(state.actualPrice)) ||
    Number(state.actualPrice) <= 0
  ) {
    errors.actualPrice = 'Actual price must be a positive number.';
  }

  // Discount
  if (
    state.discount == null ||
    isNaN(Number(state.discount)) ||
    Number(state.discount) < 0 ||
    Number(state.discount) > 100
  ) {
    errors.discount = 'Discount is Invalid';
  }

  // Stock
  if (!state.stock || isNaN(Number(state.stock)) || Number(state.stock) < 1) {
    errors.stock = 'Stock must be 1 or greater';
  }

  return errors;
}
