import AlertErrorHandler from "./common/error.js";
import { FormValidator, FormField } from "./common/form-validator.js";

function validateRegisterForm() {
  const form = document.getElementById("register-form");
  const formData = new FormData(form);

  let formValidator = new FormValidator(
    "Register",
    new FormField("name", formData.get("name"), function () {
      return this.value && this.value.length > 1;
    }),
    new FormField("surname", formData.get("surname"), function () {
      return this.value.length > 1;
    }),
    new FormField("email", formData.get("email"), function () {
      return (
        this.value &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(this.value)
      );
    }),
    new FormField("emailAgain", formData.get("emailAgain"), function () {
      return this.value && this.value === formData.get("email");
    }),
    new FormField("password", formData.get("password"), function () {
      return this.value && this.value.length > 7;
    }),
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

function validateLoginForm() {
  const form = document.getElementById("sign-in-form");
  const formData = new FormData(form);

  let formValidator = new FormValidator(
    "Login",
    new FormField("email", formData.get("email"), function () {
      return (
        this.value &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(this.value)
      );
    }),
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

window.validateLoginForm = validateLoginForm;
window.validateRegisterForm = validateRegisterForm;
