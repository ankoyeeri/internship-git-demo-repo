import MovieInCart from "./MovieInCart.js";

export default class Movie {
  #name = "";
  #genre = "";
  #priceFor12H = 0;
  #countInStock = 0;

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

  get inStock() {
    return this.#countInStock > 0;
  }

  rentOne() {
    if (this.#countInStock <= 0) return null;

    this.#countInStock -= 1;

    return new MovieInCart(this.name, this.genre, this.priceFor12H);
  }
}
