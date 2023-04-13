import MovieInCart from "./MovieInCart.js";

/**
 * @class Represents a Movie for renting
 */
export default class Movie {
  #name = "";
  #genre = "";
  #priceFor12H = 0;
  #countInStock = 0;

  /**
   * @param {string} name Movie name
   * @param {string} genre Movie genre
   * @param {number} priceFor12H Movie rent price for 12 hours
   * @param {number} countInStock Movie count in stock
   */
  constructor(name, genre, priceFor12H, countInStock) {
    if (
      typeof name !== "string" ||
      typeof genre !== "string" ||
      typeof priceFor12H !== "number" ||
      typeof countInStock !== "number"
    ) {
      throw new TypeError("Wrong parameter type");
    }

    this.#name = name;
    this.#genre = genre;
    this.#priceFor12H = priceFor12H;
    this.#countInStock = countInStock;
  }

  get name() {
    return this.#name;
  }

  get genre() {
    return this.#genre;
  }

  get priceFor12H() {
    return this.#priceFor12H;
  }

  get countInStock() {
    return this.#countInStock;
  }

  set countInStock(value) {
    this.#countInStock = value;
  }

  get inStock() {
    return this.#countInStock > 0;
  }

  /**
   * Rent one film copy. Using this method will decrease value of _countInStock_ property.
   * @returns **MovieInCart** object based on actual Movie object data.
   */
  rentOne() {
    if (this.#countInStock <= 0) return null;

    this.#countInStock -= 1;

    return new MovieInCart(this.name, this.genre, this.priceFor12H);
  }
}
