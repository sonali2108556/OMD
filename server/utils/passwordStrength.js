const isStrongPassword = (password) => {
    if (process.env.NODE_ENV === "development") {
      return true;
    }
  
    // Define regular expressions for various password criteria
    const minLength = 8; // Minimum length
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasDigit = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*]/; // You can customize this for more special characters
  
    // Check if the password meets each criterion
    const isMinLength = password.length >= minLength;
    const hasUppercaseChar = hasUppercase.test(password);
    const hasLowercaseChar = hasLowercase.test(password);
    const hasDigitChar = hasDigit.test(password);
    const hasSpecialChars = hasSpecialChar.test(password);
  
    // Check if all criteria are met
    return isMinLength && hasUppercaseChar && hasLowercaseChar && hasDigitChar && hasSpecialChars;
  };
  export default isStrongPassword;
  