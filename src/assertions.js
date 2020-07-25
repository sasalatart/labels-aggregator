const EXPECTED_HEADERS = [
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
];

const HEADER_COLS = "ABCDEFGHIJKLMNO";

// eslint-disable-next-line no-unused-vars
function assertInputSheet(spreadsheet) {
  const sheet = spreadsheet.getSheetByName("in");
  if (!sheet) throw new InputSheetNotFoundError();

  return sheet;
}

// eslint-disable-next-line no-unused-vars
function assertHeaders(actualHeaders) {
  const notFoundHeaders = [];
  EXPECTED_HEADERS.forEach((expectedHeader, index) => {
    if (!compareText(expectedHeader, actualHeaders[index])) {
      notFoundHeaders.push([expectedHeader, HEADER_COLS[index]]);
    }
  });

  if (notFoundHeaders.length > 0) {
    throw new HeadersNotFoundError(notFoundHeaders);
  }
}
