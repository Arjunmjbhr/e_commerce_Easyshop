// validation.js

export const validateUserDetails = (username, password, email) => {
  const usernameRegex = /^[a-zA-Z0-9]{5,}$/;
  if (!username.match(usernameRegex)) {
    return "Username must be \n at least 5 characters long \n contain only letters and numbers.";
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password.match(passwordRegex)) {
    return "Password must be \n at least 8 characters long, include at \n least one uppercase letter \n one lowercase letter \n one number \none special character.";
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!email.match(emailRegex)) {
    return "Please enter a valid email address.";
  }
  return null;
};
