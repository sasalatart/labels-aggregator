const EXPECTED_HEADERS = [
  "FECHA",
  "NOMBRE",
  "APELLIDO",
  "NÚMERO",
  "DIRECCIÓN",
  "COMUNA",
  "CÓDIGO PRODUCTO",
  "PRODUCTO",
  "CANTIDAD",
  "VALOR",
  "DESPACHO",
];

const HEADER_COLS = "ABCDEFGHIJK";

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

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
    if (normalize(expectedHeader) !== normalize(actualHeaders[index])) {
      notFoundHeaders.push([expectedHeader, HEADER_COLS[index]]);
    }
  });

  if (notFoundHeaders.length > 0) {
    throw new HeadersNotFoundError(notFoundHeaders);
  }
}
