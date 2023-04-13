import { TableDrawer } from "./common/table.js";
import AlertErrorHandler from "./common/error.js";
import Movie from "./models/Movie.js";

//  Array of pre-defined movies
const movies = [
  new Movie("Batman", "Action", 4.55, 1),
  new Movie("Samurai Champloo", "Action", 4.55, 1),
  new Movie("Sherlock", "Detective", 4.55, 3),
  new Movie("Danganronpa", "Thriller", 4.55, 0),
];

//  Array of customer rented movies
const yourMovies = [];

// Function that describes, how table rows will be drawn
function fillRule(item, index) {
  if (!(item instanceof Movie)) throw new TypeError('"item" should be a Movie');

  const row = document.createElement("tr"); // Main element
  row.id = index;

  const name = document.createElement("td"); // Name cell
  name.innerHTML = item.name;

  const genre = document.createElement("td"); // Genre cell
  genre.innerHTML = item.genre;

  const priceFor12H = document.createElement("td"); // Price for 12 Hours cell
  priceFor12H.innerHTML = item.priceFor12H;

  const inStock = document.createElement("td"); //  InStock status cell

  if (item.inStock) {
    inStock.innerHTML =
      '<div class="icon"><div class="icon-check"></div></div>'; // Positive icon display. "icon-check" CSS class should be defined
  } else {
    inStock.innerHTML =
      '<div class="icon"><div class="icon-cross"></div></div>'; // Negative icon display. "icon-cross" CSS class should be defined
  }

  const button = document.createElement("td"); // Rent button
  button.innerHTML = `<button class="button button-default">Rent</button>`;
  button.addEventListener("click", () => {
    try {
      yourMovies.push(rentByRow(item, row));

      console.log(yourMovies);
    } catch (error) {
      AlertErrorHandler.raise(error);
    }
  });

  row.append(name, genre, priceFor12H, inStock, button); // Build row

  return row;
}

/**
 * Rent movie assigned to a specified row
 * @param {Movie} item Movie to rent
 * @param {Element} row Row where the item is stored
 * @returns Rented movie or `null`
 */
function rentByRow(item, row) {
  if (!(item instanceof Movie)) throw new Error('"item" should be Movie');
  if (!(row instanceof Element)) throw new Error('"row" should be Element');

  if (!item.inStock)
    throw new Error(`Unable to rent. ${item.name} is out of stock`);

  let result = item.rentOne();

  if (!item.inStock) {
    let icon = row.getElementsByClassName("icon-check")[0];
    icon.classList.replace("icon-check", "icon-cross");
  }

  return result;
}

// Made it as IIFE to be able to find execution point faster
(function build() {
  try {
    let tableDrawer = new TableDrawer(
      document.getElementsByClassName("table-block")[0],
      ["Name", "Genre", "Price for 12h", "Is in stock"],
      movies
    );

    tableDrawer.initTable();
    tableDrawer.fillTable(fillRule);
    tableDrawer.renderTable();
  } catch (error) {
    console.error(error);
    AlertErrorHandler.raise(error);
  }
})();
