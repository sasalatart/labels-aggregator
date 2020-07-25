// eslint-disable-next-line no-unused-vars
function indexLookups(spreadsheet) {
  const lookupsSheet = assertLookupsSheet(spreadsheet);
  const [lookupsHeaders, ...lookups] = lookupsSheet.getDataRange().getValues();
  assertLookupsSheetHeaders(lookupsHeaders);

  const result = {};
  lookups.forEach(([code, name, format, price]) => {
    if (!code || !name || !format || !price) return;

    result[code] = {
      code: normalizeCode(code),
      name,
      format,
      price: normalizePrice(price),
    };
  });
  return result;
}
