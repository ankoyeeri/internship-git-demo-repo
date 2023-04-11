class AlertErrorHandler {
  static raise(error) {
    if (!(error instanceof Error))
      throw new TypeError('"error" should be Error type');

    let errorContainer = document.getElementsByClassName("error-container")[0];

    if (!errorContainer) {
      errorContainer = this.#initErrorContainer();
    }

    this.#addNewErrorBox(errorContainer, error);
  }

  static #initErrorContainer() {
    const body = document.body;

    const errorContainer = document.createElement("div");
    errorContainer.className = "error-container";

    body.append(errorContainer);

    return errorContainer;
  }

  static #addNewErrorBox(errorContainer, error) {
    if (!(error instanceof Error))
      throw new TypeError('"error" should be Error type');
    if (!(errorContainer instanceof Element))
      throw new TypeError('"errorContainer" should be instance of Element');

    const errorBox = document.createElement("div");
    errorBox.className = "error";

    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.appendChild(
      document
        .createElement("p")
        .appendChild(document.createTextNode(error.message))
    );

    const closeErrorMessage = document.createElement("div");
    closeErrorMessage.className = "close-error-message";

    const buttonClose = document.createElement('button');
    buttonClose.innerHTML = 'X'
    buttonClose.onclick = function() {
        errorBox.remove();
    };
    closeErrorMessage.appendChild(buttonClose);
    

    errorBox.appendChild(errorMessage);
    errorBox.appendChild(closeErrorMessage);

    errorContainer.appendChild(errorBox);
  }
}

export default AlertErrorHandler;
