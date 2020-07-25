/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */

class SheetNotFoundError extends Error {
  constructor(sheetName) {
    super(`No se encontró la hoja llamada ${sheetName}`);
    this.name = "SheetNotFoundError";
  }
}

class HeadersNotFoundError extends Error {
  constructor(sheetName, notFoundHeaders) {
    const namedHeaders = notFoundHeaders.reduce(
      (acc, [expectedHeader, col], index) => {
        const res = `${acc} ${expectedHeader} (${col})`;
        return index === notFoundHeaders.length - 1 ? res : `${res}, `;
      },
      ""
    );
    const message = `Los siguientes títulos no se encontraron en la hoja "${sheetName}": ${namedHeaders}`;

    super(message);
    this.name = "HeadersNotFoundError";
  }
}

class ProductWithNoCodeError extends Error {
  constructor(message = "Producto sin código") {
    super(message);
    this.name = ProductWithNoCodeError;
  }
}

class LookupCodeNotFoundError extends Error {
  constructor(code) {
    super(`Código ${code} no existe`);
    this.name = "LookupCodeNotFoundError";
  }
}
