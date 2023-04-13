/**
 * Creates HTML `<div>` element - Rent Timer controller with arrow _buttons_ on both sides to increment and decrement _input field_ value.
 *
 *
 * **NOTE**: this function expects, that you already have a **pre-defined CSS** classes:
 *    * `.input-time`
 *    * `.button`
 * @param {HTMLTableCellElement} priceCell HTML element reference to __"Rent price"__ cell. Necesary for recalculating rent cost related to value of current controller
 * @returns {HTMLDivElement} Built Time Controller HTML element
 */
export function createTimeController(priceCell) {
  if (priceCell && !(priceCell instanceof HTMLTableCellElement))
    throw new TypeError('"item" shoud be HTMLTableCellElement');

  const timeController = document.createElement("div"); //  Main container
  timeController.className = "input-time";

  // Control buttons
  const buttonLeft = document.createElement("button");
  const buttonRight = document.createElement("button");

  buttonLeft.className = "button";
  buttonRight.className = "button";

  buttonLeft.innerHTML = " <span><</span>";
  buttonRight.innerHTML = " <span>></span>";

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = "12h"; // Will be displayed initially

  const stepHours = 12; //  Increment/decrement step for hours
  const stepPrice = parseFloat(priceCell.innerHTML); // Increment/decrement step for rent price
  let hours = stepHours; // Hours initial value
  let price = stepPrice; // Price initial value

  // Left button "click" event listener
  buttonLeft.addEventListener("click", () => {
    if (hours - stepHours < 0) return;

    hours -= stepHours;
    price -= stepPrice;

    inputField.value = hours + "h";
    priceCell.innerHTML = Math.abs(price.toFixed(2)) + "$";
  });

  // Right button "click" event listener
  buttonRight.addEventListener("click", () => {
    hours += stepHours;
    price += stepPrice;

    inputField.value = hours + "h";
    priceCell.innerHTML = price.toFixed(2) + "$";
  });

  // Build time controller
  timeController.append(buttonLeft, inputField, buttonRight);

  return timeController;
}

export function createRemoveButton() {
  const button = document.createElement("button");

  button.className = "button button-alert";
  button.innerHTML = "Remove";

  return button;
}
