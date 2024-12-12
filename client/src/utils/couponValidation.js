export const couponValidation = (
  couponId,
  discountAmount,
  minOrderValue,
  startingDate,
  expirationDate,
  totalRedemptionsAllowed,
  isActive
) => {
  const errors = {};

  // Helper function to check for blank or whitespace-only strings
  const isBlank = (value) =>
    typeof value === "string" ? !value.trim() : !value;

  // Validate couponId
  if (isBlank(couponId)) {
    errors.couponId = "Coupon ID is required and cannot be blank.";
  }

  // Validate discountAmount
  if (
    isBlank(discountAmount) ||
    isNaN(discountAmount) ||
    Number(discountAmount) < 0
  ) {
    errors.discountAmount =
      "Discount amount must be a valid number greater than 0 and cannot be blank.";
  }

  // Validate minOrderValue
  if (
    isBlank(minOrderValue) ||
    isNaN(minOrderValue) ||
    Number(minOrderValue) < 0
  ) {
    errors.minOrderValue =
      "Minimum order value must be a valid number greater than 0 and cannot be blank.";
  }

  // Validate startingDate
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of the day
  const startingDateInMillisecond = new Date(startingDate);

  if (isBlank(startingDate) || isNaN(startingDateInMillisecond)) {
    errors.startingDate =
      "Starting date must be a valid date and cannot be blank.";
  } else if (startingDateInMillisecond <= today) {
    errors.startingDate = "Starting date must be after today.";
  }

  // Validate expirationDate
  const expirationDateInMillisecond = new Date(expirationDate);

  if (isBlank(expirationDate) || isNaN(expirationDateInMillisecond)) {
    errors.expirationDate =
      "Expiration date must be a valid date and cannot be blank.";
  } else if (expirationDateInMillisecond <= startingDateInMillisecond) {
    errors.expirationDate = "Expiration date must be after the starting date.";
  }

  // Validate totalRedemptionsAllowed
  if (
    isBlank(totalRedemptionsAllowed) ||
    isNaN(totalRedemptionsAllowed) ||
    parseInt(totalRedemptionsAllowed, 10) <= 0
  ) {
    errors.totalRedemptionsAllowed =
      "Total redemptions allowed must be a valid positive integer and cannot be blank.";
  }

  // Validate isActive
  if (typeof isActive !== "boolean") {
    errors.isActive = "IsActive must be a boolean.";
  }

  if (parseInt(minOrderValue) <= parseInt(discountAmount)) {
    errors.compare = "order value should be higher than discount amount";
  }

  return errors;
};
