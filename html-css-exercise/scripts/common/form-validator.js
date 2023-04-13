/**
 * @class FormData validation
 */
export class FormValidator {
  formName = "";
  formFields = [];

  /**
   * @param {string} formName Form name
   * @param  {...FormField} formFields Form fields
   */
  constructor(formName, ...formFields) {
    this.formName = formName;
    this.formFields = formFields;
  }

  /**
   * Validate passed form data sequently.
   * In case if any of form fields does not pass the validation, the Error will be thrown.
   */
  validate() {
    for (let formField of this.formFields) {
      if (!formField.validator())
        throw new Error(
          `${this.formName}: <${formField.name}> form field is not valid`
        );
    }
  }
}

/**
 * @class Represents single form field with validation rule from FormData
 */
export class FormField {
  #name = "";
  #value = undefined;
  #validator = undefined;

  get name() {
    return this.#name;
  }

  get value() {
    return this.#value;
  }

  get validator() {
    return this.#validator;
  }

  /**
   * @param {string} name Field name
   * @param {any} value Field value
   * @param {function(): boolean} validator Field validator
   *
   * @example
   * // Init password form field that should not be empty and not less than 7 symbols
   * const form = document.getElemebtByTagName('form')[0];
   * let formData = new FormData(form);
   *
   * let passwordFormField = new FormField('password', formData.get('password'), function() {
   *    return this.value && this.value.length >= 7;
   * });
   */
  constructor(name, value, validator) {
    this.#name = name;
    this.#value = value;
    this.#validator = validator;
  }
}
