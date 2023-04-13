/**
 * @class Draw HTML table dynamically
 */
export class TableDrawer {
  #table; //  Table container were to draw actual table content

  /**
   * @param {Element} hostContainer Host container to place table in
   * @param {string[]} columns Array of column names
   * @param {any[]} rowContent Content that should be placed in rows
   */
  constructor(hostContainer, columns, rowContent) {
    if (!Array.isArray(columns))
      throw new TypeError('"columnNames" should be an Array');
    if (!Array.isArray(rowContent))
      throw new TypeError('"rowContent" should be an Array');
    if (!(hostContainer instanceof Element))
      throw new TypeError('"hostContainer" should be Element');

    this.hostContainer = hostContainer;
    this.columns = columns;
    this.rowContent = rowContent;

    //  Find first available table
    this.#table = this.hostContainer.getElementsByTagName("table")[0];
  }

  /**
   * Initialize HTML table element.
   */
  initTable() {
    // Check if table is already exists
    if (this.#table) return;

    const table = document.createElement("table"); //  Table element to work with
    const headerRow = document.createElement("tr"); //  Row to init table column names

    if (this.columns.length === 0) throw new Error("Columns are not specified");

    // Fulfill header row with column names
    for (let columnName of this.columns) {
      let header = document.createElement("th");
      header.innerHTML = columnName;

      headerRow.appendChild(header);
    }

    table.appendChild(headerRow);

    this.#table = table;
  }

  /**
   * Fill table unsing function wich is responsible for the row fulfillment logic.
   * @param {function(item: any, index: number): HTMLTableRowElement} iterationRowInit Function that defines the row fulfillment logic
   */
  fillTable(iterationRowInit) {
    if (typeof iterationRowInit !== "function")
      throw new TypeError('"iterationRowInit" should be a function');

    if (this.rowContent.length === 0)
      throw new Error("Row Content should not be empty");

    let index = 0;

    for (let item of this.rowContent) {
      let row = iterationRowInit(item, index); // Create row
      this.#table.appendChild(row); //  Add row to the table

      index += 1;
    }
  }

  /**
   * Draw table inside of host container.
   */
  renderTable() {
    this.hostContainer.appendChild(this.#table);
  }
}
