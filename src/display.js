const NUM_COLS = 6;

const FIRST_NAME_INDEX = 1;
const LAST_NAME_INDEX = 2;
const PHONE_INDEX = 3;
const ADDRESS_L1_INDEX = 5;
const ADDRESS_L2_INDEX = 6;
const CODE_INDEX = 7;
const PRODUCT_NAME_INDEX = 8;
const FORMAT_INDEX = 9;
const QUANTITY_INDEX = 10;
const PRICE_INDEX = 11;
const DISPATCH_VALUE_INDEX = 13;
const PAID_INDEX = 14;

function groupData(matrix) {
  const result = {};

  matrix.forEach((row) => {
    const phoneNumber = row[PHONE_INDEX];
    if (!result[phoneNumber]) {
      result[phoneNumber] = {
        meta: {
          phoneNumber,
          fullName: `${row[FIRST_NAME_INDEX]} ${row[LAST_NAME_INDEX]}`,
          paid: compareText(row[PAID_INDEX], "sí"),
          addressL1: row[ADDRESS_L1_INDEX],
          addressL2: row[ADDRESS_L2_INDEX],
          dispatchValue: row[DISPATCH_VALUE_INDEX] || 0,
        },
        products: [],
      };
    }
    const quantity = +row[QUANTITY_INDEX];
    const price = normalizePrice(row[PRICE_INDEX]);
    result[phoneNumber].products.push({
      code: normalizeCode(row[CODE_INDEX]),
      productName: row[PRODUCT_NAME_INDEX],
      format: row[FORMAT_INDEX],
      quantity,
      price,
      value: quantity * price,
    });
  });

  return result;
}

function fill(amount) {
  const values = [];
  for (let i = 0; i < amount; i += 1) {
    values.push(" ");
  }
  return values;
}

function sumBy(products, key) {
  return products.reduce((acc, { [key]: value }) => acc + value, 0);
}

function formatImportant(range) {
  range
    .setHorizontalAlignment("left")
    .setBackground("#7f8fa6")
    .setFontColor("white")
    .setBorder(
      true,
      true,
      true,
      true,
      false,
      false,
      "black",
      SpreadsheetApp.BorderStyle.SOLID_THICK
    );
}

function displayCustomer(sheet, { meta, products }) {
  const fromRow = sheet.getDataRange().getValues().length + 1;

  const {
    fullName,
    phoneNumber,
    paid,
    addressL1,
    addressL2,
    dispatchValue,
  } = meta;

  const headers = [
    [fullName, phoneNumber, "Pago", paid ? "SÍ" : "NO", ...fill(2)],
    [addressL1, addressL2, ...fill(4)],
    ["CÓDIGO", "PRODUCTO", "FORMATO", "CANTIDAD", "PRECIO", "VALOR"],
  ];

  const content = products.map(
    ({ code, productName, format, quantity, price, value }) => [
      code,
      productName,
      format,
      quantity,
      price,
      value,
    ]
  );

  const footer = [
    [...fill(1), "Despacho", ...fill(2), +dispatchValue, +dispatchValue],
    [
      "Total ($)",
      ...fill(2),
      sumBy(products, "quantity"),
      ...fill(1),
      sumBy(products, "value") + +dispatchValue,
    ],
  ];

  const matrix = [...headers, ...content, ...footer];
  const matrixRange = sheet.getRange(fromRow, 1, matrix.length, NUM_COLS);
  matrixRange
    .setValues(matrix)
    .setWrap(true)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setBorder(true, true, true, true, true, true);
  sheet
    .getRange(fromRow + matrix.length, 1, 2, NUM_COLS)
    .setValues([fill(6), fill(6)]);

  sheet.getRange(fromRow + 1, 1, 1, NUM_COLS).setHorizontalAlignment("left");
  formatImportant(sheet.getRange(fromRow, 1, 1, NUM_COLS));
  formatImportant(sheet.getRange(fromRow + 2, 1, 1, NUM_COLS));
  formatImportant(sheet.getRange(fromRow + matrix.length - 1, 1, 1, NUM_COLS));
}

// eslint-disable-next-line no-unused-vars
function display(sheet, data) {
  sheet.getDataRange().clearFormat().clearContent();

  const groupedData = groupData(data);
  Object.values(groupedData).forEach((customerData) =>
    displayCustomer(sheet, customerData)
  );

  sheet.getRange("D:D").setHorizontalAlignment("center");
  sheet
    .getRange("E:F")
    .setHorizontalAlignment("right")
    .setNumberFormat("$#,###0");

  SpreadsheetApp.flush();
}
