/**
 * @class Display errors in fixed error box on HTML page.
 *
 * NOTE: this class expects, that you already have a pre-defined CSS classes:
 *      * `error-container` - expected to be `position: fixed`
 *          * `error` - expected to be placed inside `error-container` and `display: flex`
 *              * `error-message` - expected to be placed insied `error`
 *              * `close-error-message` - expected to be placed insied `error`
 */
export default class AlertErrorHandler {
  /**
   * Creates a fixed error container on HTML page and displays all incoming errors in it.
   * @param {Error} error Error to display
   */
  static raise(error) {
    if (!(error instanceof Error))
      throw new TypeError('"error" should be Error type');

    // Trying to get existing error container
    let errorContainer = document.getElementsByClassName("error-container")[0];

    // If it does not exists, then create a new one
    if (!errorContainer) {
      errorContainer = this.#initErrorContainer();
    }

    this.#addNewErrorBox(errorContainer, error);
  }

  /**
   * Creates a fixed container on the HTML page to store error boxes.
   * @returns {HTMLDivElement} Reference to created error container
   */
  static #initErrorContainer() {
    const body = document.body;

    const errorContainer = document.createElement("div");
    errorContainer.className = "error-container";

    body.append(errorContainer);

    return errorContainer;
  }

  /**
   * Creates a HTML error block with the error message inside of passed error container.
   * @param {HTMLDivElement} errorContainer Error container reference
   * @param {Error} error Error to display
   */
  static #addNewErrorBox(errorContainer, error) {
    if (!(error instanceof Error))
      throw new TypeError('"error" should be Error type');
    if (!(errorContainer instanceof Element))
      throw new TypeError('"errorContainer" should be instance of Element');

    const errorBox = document.createElement("div"); // Error box to place error message and close-button
    errorBox.className = "error";

    const errorMessage = document.createElement("div"); // Container to place error message
    errorMessage.className = "error-message";
    errorMessage.appendChild(
      document
        .createElement("p")
        .appendChild(document.createTextNode(error.message))
    );

    const closeErrorMessage = document.createElement("div"); // Container to place close-button
    closeErrorMessage.className = "close-error-message";

    const buttonClose = document.createElement("button"); // Button to close actual error message box
    buttonClose.innerHTML = "X";
    buttonClose.onclick = function () {
      errorBox.remove();
    };
    closeErrorMessage.appendChild(buttonClose);

    // Append child elements to main error box before rendering it
    errorBox.appendChild(errorMessage);
    errorBox.appendChild(closeErrorMessage);

    errorContainer.appendChild(errorBox);
  }
}
