// eslint-disable-next-line no-unused-vars
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("labels")
    .addItem("Hello World", "helloWorld")
    .addToUi();
}

// eslint-disable-next-line no-unused-vars
function helloWorld() {
  console.log("Hello world!");
}
