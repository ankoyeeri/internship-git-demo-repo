export class TableDrawer {
  #table;

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

    this.#table = this.hostContainer.getElementsByTagName("table")[0];
  }

  initTable() {
    if (this.#table) return;
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    if (this.columns.length === 0) throw new Error("Columns are not specified");

    for (let columnName of this.columns) {
      let header = document.createElement("th");
      header.innerHTML = columnName;

      headerRow.appendChild(header);
    }

    table.appendChild(headerRow);

    this.#table = table;
  }

  fillTable(iterationRowInit) {
    if (typeof iterationRowInit !== "function")
      throw new TypeError('"iterationRowInit" should be a function');

    if (this.rowContent.length === 0)
      throw new Error("Row Content should not be empty");

    let index = 0;

    for (let item of this.rowContent) {
      let row = iterationRowInit(item, index);
      this.#table.appendChild(row);

      index += 1;
    }
  }

  renderTable() {
    this.hostContainer.appendChild(this.#table);
  }
}
