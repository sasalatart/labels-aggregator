// eslint-disable-next-line no-unused-vars
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("labels")
    .addItem("Generar", "process")
    .addToUi();
}

function generate() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = assertInputSheet(spreadsheet);

  const displayValues = sheet.getDataRange().getDisplayValues();
  const [actualHeaders] = displayValues;
  assertHeaders(actualHeaders);

  Browser.msgBox("OK", "Generado", Browser.Buttons.OK);
}

// eslint-disable-next-line no-unused-vars
function process() {
  try {
    generate();
  } catch (error) {
    Browser.msgBox("Error", error.message, Browser.Buttons.OK);
    // eslint-disable-next-line no-console
    console.error(error);
  }
}
