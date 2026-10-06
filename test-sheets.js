import sheets from "./sheets.js";

let res = await sheets.spreadsheets.values.get({
  spreadsheetId: process.env.SHEET_ID,
  range: "Sheet1!A1:D1",
});

console.log(res.data.values);
