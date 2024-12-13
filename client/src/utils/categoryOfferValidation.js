export const categoryOfferValidation = (
  offerPercentage,
  startingDate,
  expirationDate,
  offerCategory
) => {
  const errors = {};
  if (!offerCategory) {
    errors.offerCategory = "you should select category before proceed";
  }
  if (isNaN(offerPercentage) || offerPercentage > 99 || offerPercentage < 0) {
    errors.offerPercentage = "Offer percentage should be between 0 and 99.";
  }

  const start = new Date(startingDate);
  const end = new Date(expirationDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start <= today) {
    errors.startingDate = "Starting date must be a future date (after today).";
  }

  if (!startingDate || isNaN(start.getTime())) {
    errors.startingDate = "Starting date should be in a valid format.";
  }
  if (!expirationDate || isNaN(end.getTime())) {
    errors.expirationDate = "Expiration date should be in a valid format.";
  }

  if (!errors.startingDate && !errors.expirationDate && start >= end) {
    errors.compare = "Starting date should be earlier than expiration date.";
  }

  return errors;
};
