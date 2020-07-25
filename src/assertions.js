const HEADER_COLS = "ABCDEFGHIJKLMNO";

function assertSheetFactory(sheetName) {
  return function assertSheet(spreadsheet) {
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) throw new SheetNotFoundError(sheetName);

    return sheet;
  };
}

// eslint-disable-next-line no-unused-vars
const assertInputSheet = assertSheetFactory("in");

// eslint-disable-next-line no-unused-vars
const assertLookupsSheet = assertSheetFactory("lookups");

function assertSheetHeadersFactory(sheetName, expectedHeaders) {
  return function assertSheetHeaders(actualHeaders) {
    const notFoundHeaders = [];
    expectedHeaders.forEach((expectedHeader, index) => {
      if (!expectedHeader) return;

      if (!compareText(expectedHeader, actualHeaders[index])) {
        notFoundHeaders.push([expectedHeader, HEADER_COLS[index]]);
      }
    });

    if (notFoundHeaders.length > 0) {
      throw new HeadersNotFoundError(sheetName, notFoundHeaders);
    }
  };
}

// eslint-disable-next-line no-unused-vars
const assertInputSheetHeaders = assertSheetHeadersFactory("in", [
  "FECHA",
  "NOMBRE",
  "APELLIDO",
  "NÚMERO",
  "VENDEDOR",
  "DIRECCIÓN",
  "COMUNA",
  "CÓDIGO PRODUCTO",
  "PRODUCTO",
  "FORMATO",
  "CANTIDAD",
  "PRECIO",
  "VALOR",
  "DESPACHO",
  "PAGO ( SÍ / NO )",
]);

// eslint-disable-next-line no-unused-vars
const assertLookupsSheetHeaders = assertSheetHeadersFactory("lookups", [
  "CÓDIGO",
  null,
  "Formato",
  "Precio",
]);
