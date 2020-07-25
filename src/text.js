/* eslint-disable no-unused-vars */

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeCode(code) {
  return normalizeText(code).toUpperCase();
}

function normalizePrice(price) {
  return +String(price).replace(/\D/g, "");
}

function compareText(textA, textB) {
  if ((textA && !textB && textB !== "") || (textB && !textA && textA !== "")) {
    return false;
  }

  return (
    normalizeText(textA).toUpperCase() === normalizeText(textB).toUpperCase()
  );
}
