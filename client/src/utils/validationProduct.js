export const validationProduct = (state) => {
  const { brand, name, price, description, discount, stock } = state;
  const errors = {};

  // Helper function to check if a value is blank or invalid
  const isBlank = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string") return value.trim() === "";
    return false;
  };

  // Validation rules
  if (isBlank(brand)) {
    errors.brand = "Brand is required";
  }
  if (isBlank(name)) {
    errors.name = "Name is required";
  }
  if (isBlank(price) || isNaN(price) || price < 1) {
    errors.price = "Price should be a number greater than 0";
  }
  if (isBlank(description)) {
    errors.description = "Description is required";
  }
  if (isBlank(discount) || isNaN(discount) || discount < 0 || discount > 100) {
    errors.discount = "Discount should be a number between 0 and 100";
  }
  if (isBlank(stock) || isNaN(stock) || stock < 0) {
    errors.stock = "Stock should be a number greater than or equal to 0";
  }

  return errors;
};
