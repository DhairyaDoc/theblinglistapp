export const validateEmail = (email) => {
  if (!email) {
    return "Email is required"
  } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) {
    return "Email address is invalid";
  }
  else {
    return "";
  }
}

export default function validateInfo(values) {

  let errors = {}

  // First Name Validation
  if (!values.firstName) {
    errors.firstName = 'First Name is required';
  }
  // Last Name Validation
  if (!values.lastName) {
    errors.lastName = 'Last Name is required';
  }
  //Email Validation

  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  // Password Validation
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password needs to be 8 characters or more';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Security Answer Validation
  if (!values.securityAnswer) {
    errors.securityAnswer = 'Security Answer is required';
  }
  return errors;
}