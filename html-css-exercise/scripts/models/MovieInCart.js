/**
 * @class Represents Movie that is added to User Cart
 */
export default class MovieInCart {
  name = "";
  genre = "";
  priceFor12H = 0;

  /**
   * @param {string} name Rented movie name
   * @param {string} genre Rented movie genre
   * @param {number} priceFor12H Rented movie price for 12 hours
   */
  constructor(name, genre, priceFor12H) {
    if (
      typeof name !== "string" ||
      typeof genre !== "string" ||
      typeof priceFor12H !== "number"
    ) {
      throw new TypeError("Wrong parameter type");
    }

    this.name = name;
    this.genre = genre;
    this.priceFor12H = priceFor12H;
  }

  get name() {
    return this.name;
  }

  get genre() {
    return this.genre;
  }

  get priceFor12H() {
    return this.priceFor12H;
  }
}
