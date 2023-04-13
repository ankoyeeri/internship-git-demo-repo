import AlertErrorHandler from "./common/error.js";
import { FormValidator, FormField } from "./common/form-validator.js";

/**
 * Validate Register form.
 *
 * This function should be binded to the "Register" button in login.html
 */
function validateRegisterForm() {
  const form = document.getElementById("register-form");
  const formData = new FormData(form);

  let formValidator = new FormValidator(
    "Register",

    // Name
    new FormField("name", formData.get("name"), function () {
      return this.value && this.value.length > 1;
    }),

    //  Surname
    new FormField("surname", formData.get("surname"), function () {
      return this.value.length > 1;
    }),

    //  Email
    new FormField("email", formData.get("email"), function () {
      return (
        this.value &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(this.value)
      );
    }),

    //  Email Again
    new FormField("emailAgain", formData.get("emailAgain"), function () {
      return this.value && this.value === formData.get("email");
    }),

    //  Password
    new FormField("password", formData.get("password"), function () {
      return this.value && this.value.length > 7;
    }),

    // Password Again
    new FormField("passwordAgain", formData.get("passwordAgain"), function () {
      return this.value && this.value === formData.get("password");
    })
  );

  try {
    formValidator.validate();
    window.location.href = "home.html";
  } catch (error) {
    AlertErrorHandler.raise(error);
  }
}

/**
 * Validate Login form.
 *
 * This function should be binded to the "Log in" button in login.html
 */
function validateLoginForm() {
  const form = document.getElementById("sign-in-form");
  const formData = new FormData(form);

  let formValidator = new FormValidator(
    "Login",

    // Email
    new FormField("email", formData.get("email"), function () {
      return (
        this.value &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(this.value)
      );
    }),

    // Password
    new FormField("password", formData.get("password"), function () {
      return this.value;
    })
  );

  try {
    formValidator.validate();
    window.location.href = "home.html";
  } catch (error) {
    AlertErrorHandler.raise(error);
  }
}

// Add validation functions to window object, to be able bind them to button events via HTML file
window.validateLoginForm = validateLoginForm;
window.validateRegisterForm = validateRegisterForm;
