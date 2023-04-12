export function createTimeController(priceCell) {
  if (priceCell && !(priceCell instanceof HTMLTableCellElement))
    throw new TypeError('"item" shoud be HTMLTableCellElement');

  const timeController = document.createElement("div");
  timeController.className = "input-time";

  const buttonLeft = document.createElement("button");
  const buttonRight = document.createElement("button");

  buttonLeft.className = "button";
  buttonRight.className = "button";

  buttonLeft.innerHTML = " <span><</span>";
  buttonRight.innerHTML = " <span>></span>";

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = "12h"; // Should be initial value

  const stepHours = 12;
  const stepPrice = parseFloat(priceCell.innerHTML);
  let hours = stepHours; // Initial value
  let price = stepPrice; // Initial value

  buttonLeft.addEventListener("click", () => {
    if (hours - stepHours < 0) return;

    hours -= stepHours;
    price -= stepPrice;

    inputField.value = hours + "h";
    priceCell.innerHTML = Math.abs(price.toFixed(2)) + "$";
  });

  buttonRight.addEventListener("click", () => {
    hours += stepHours;
    price += stepPrice;

    inputField.value = hours + "h";
    priceCell.innerHTML = price.toFixed(2) + "$";
  });

  timeController.append(buttonLeft, inputField, buttonRight);

  return timeController;
}

export function createRemoveButton() {
  const button = document.createElement("button");

  button.className = "button button-alert";
  button.innerHTML = "Remove";

  return button;
}
