import AlertErrorHandler from "./common/error.js";
import { TableDrawer } from "./common/table.js";
import {
  createTimeController,
  createRemoveButton,
} from "./common/html-elements.js";
import MovieInCart from "./models/MovieInCart.js";
import Movie from "./models/Movie.js";

let yourMovies = [
  new MovieInCart("Batman", "Action", 4.55),
  new MovieInCart("Samurai Champloo", "Action", 7.49),
];

const movies = [
  new Movie("Batman", "Action", 4.55, 1),
  new Movie("Samurai Champloo", "Action", 4.55, 1),
  new Movie("Sherlock", "Detective", 4.55, 3),
  new Movie("Danganronpa", "Thriller", 4.55, 0),
];

// Function that describes, how table rown will be drawn
function fillRule(item, index) {
  if (!(item instanceof MovieInCart))
    throw new TypeError('"item" should be MovieInCart');
  if (typeof index !== "number")
    throw new TypeError('"index" should be number');

  const row = document.createElement("tr"); // Main element

  const nameCell = document.createElement("td"); // Name cell
  nameCell.innerHTML = item.name;

  const genreCell = document.createElement("td"); // Genre cell
  genreCell.innerHTML = item.genre;

  const timeCell = document.createElement("td"); // Time cell

  const priceCell = document.createElement("td"); // Price cell
  priceCell.innerHTML = item.priceFor12H + "$";

  const removeButttonCell = document.createElement("td"); // Remove button cell
  let removeButton = createRemoveButton(index); // Remove button

  //  Click event listening
  removeButton.addEventListener("click", () => {
    yourMovies = yourMovies.filter((movie) => {
      return movie.name !== item.name;
    });

    movies.map((movie) => {
      if (movie.name === item.name) {
        movie.countInStock += 1;
      }
      return movie;
    });

    console.log(movies);
    row.remove();
  });

  timeCell.appendChild(createTimeController(priceCell));
  removeButttonCell.appendChild(removeButton);

  row.append(nameCell, genreCell, timeCell, priceCell, removeButttonCell); // Build row

  return row;
}

// IIFE to be able to find execution point faster
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
