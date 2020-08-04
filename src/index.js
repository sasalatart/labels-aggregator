// eslint-disable-next-line no-unused-vars
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("labels")
    .addItem("Generar", "process")
    .addToUi();
}

function generate() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const inputSheet = assertInputSheet(spreadsheet);

  const [inputHeaders, ...input] = inputSheet.getDataRange().getValues();
  assertInputSheetHeaders(inputHeaders);

  display(input, indexLookups(spreadsheet));

  Browser.msgBox(
    "Finalizado",
    "Se convirtió todo el contenido de la hoja <in> en etiquetas dentro de la hoja <out>.",
    Browser.Buttons.OK
  );
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
