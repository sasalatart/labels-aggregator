/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */

class InputSheetNotFoundError extends Error {
  constructor(message = "No se encontró la hoja de entrada de datos") {
    super(message);
    this.name = "InputSheetNotFoundError";
  }
}

class HeadersNotFoundError extends Error {
  constructor(notFoundHeaders) {
    const namedHeaders = notFoundHeaders.reduce(
      (acc, [expectedHeader, col], index) => {
        const res = `${acc} ${expectedHeader} (${col})`;
        return index === notFoundHeaders.length - 1 ? res : `${res}, `;
      },
      ""
    );
    const message = `Los siguientes títulos no se encontraron: ${namedHeaders}`;

    super(message);
    this.name = "HeadersNotFoundError";
  }
}
