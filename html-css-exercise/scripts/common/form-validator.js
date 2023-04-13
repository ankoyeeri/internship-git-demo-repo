export class FormValidator {
  formName = "";
  formFields = [];

  constructor(formName, ...formFields) {
    this.formName = formName;
    this.formFields = formFields;
  }

  validate() {
    for (let formField of this.formFields) {
      if (!formField.validator())
        throw new Error(
          `${this.formName}: <${formField.name}> form field is not valid`
        );
    }
  }
}

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

  constructor(name, value, validator) {
    this.#name = name;
    this.#value = value;
    this.#validator = validator;
  }
}
