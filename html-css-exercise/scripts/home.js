import { TableDrawer } from "./common/table.js";
import AlertErrorHandler from "./common/error.js";
import Movie from "./models/Movie.js";

const movies = [
  new Movie("Batman", "Action", 4.55, 1),
  new Movie("Samurai Champloo", "Action", 4.55, 1),
  new Movie("Sherlock", "Detective", 4.55, 3),
  new Movie("Danganronpa", "Thriller", 4.55, 0),
];

const yourMovies = [];

function fillRule(item, index) {
  if (!(item instanceof Movie)) throw new TypeError('"item" should be a Movie');

  const row = document.createElement("tr");
  row.id = index;

  const name = document.createElement("td");
  name.innerHTML = item.name;

  const genre = document.createElement("td");
  genre.innerHTML = item.genre;

  const priceFor12H = document.createElement("td");
  priceFor12H.innerHTML = item.priceFor12H;

  const inStock = document.createElement("td");

  if (item.inStock) {
    inStock.innerHTML =
      '<div class="icon"><div class="icon-check"></div></div>';
  } else {
    inStock.innerHTML =
      '<div class="icon"><div class="icon-cross"></div></div>';
  }

  const button = document.createElement("td");
  button.innerHTML = `<button class="button button-default">Rent</button>`;
  button.addEventListener("click", () => {
    try {
      yourMovies.push(rentByRow(item, row));

      console.log(yourMovies);
    } catch (error) {
      AlertErrorHandler.raise(error);
    }
  });

  row.append(name, genre, priceFor12H, inStock, button);

  return row;
}

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
