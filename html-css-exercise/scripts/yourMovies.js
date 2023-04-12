import AlertErrorHandler from "./common/error.js";
import { TableDrawer } from "./common/table.js";
import {
  createTimeController,
  createRemoveButton,
} from "./common/html-elements.js";
import MovieInCart from "./models/MovieInCart.js";

const yourMovies = [
  new MovieInCart("Batman", "Action", 4.55),
  new MovieInCart("Samurai Champloo", "Action", 7.49),
];

function fillRule(item, index) {
  if (!(item instanceof MovieInCart))
    throw new TypeError('"item" should be MovieInCart');
  if (typeof index !== "number")
    throw new TypeError('"index" should be number');

  const row = document.createElement("tr");

  const name = document.createElement("td");
  name.innerHTML = item.name;

  const genre = document.createElement("td");
  genre.innerHTML = item.genre;

  const time = document.createElement("td");

  const price = document.createElement("td");
  price.innerHTML = item.priceFor12H + "$";

  const removeButtton = document.createElement("td");

  time.appendChild(createTimeController(price));
  removeButtton.appendChild(createRemoveButton());

  row.append(name, genre, time, price, removeButtton);

  return row;
}

(function build() {
  try {
    let tableDrawer = new TableDrawer(
      document.getElementsByClassName("table-block")[0],
      ["Name", "Genre", "Time", "Price"],
      yourMovies
    );

    tableDrawer.initTable();
    tableDrawer.fillTable(fillRule);
    tableDrawer.renderTable();
  } catch (error) {
    AlertErrorHandler.raise(error);
  }
})();
