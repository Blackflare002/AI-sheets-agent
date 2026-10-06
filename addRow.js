import sheets from "./sheets.js";

const addRow = async ({ company, title, date, confidence = 3 }) => {
  if (typeof company !== "string" || company.trim() === "") {
    return {
      error:
        "Company name must be a non-empty string. Ask the user for the company name.",
    };
  }
  if (typeof title !== "string" || title.trim() === "") {
    return {
      error:
        "Title must be a non-empty string. Ask the user for the job title.",
    };
  }
  if (
    !Number.isFinite(confidence) ||
    confidence < 1 ||
    confidence > 5 ||
    Math.round(confidence * 100) / 100 !== confidence
  ) {
    return {
      error:
        "Confidence must be a number between 1 and 5 with at most two decimal places.",
    };
  }

  const rowDate =
    typeof date === "string" && date.trim() !== ""
      ? date.trim()
      : new Date().toLocaleDateString("en-CA");

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: "Sheet1!1:1",
  });

  const headers = res.data.values?.[0] ?? [];
  const dateCol = headers.indexOf("Date");
  const companyCol = headers.indexOf("Company");
  const titleCol = headers.indexOf("Title");
  const confidenceCol = headers.indexOf("Confidence");
  if (
    dateCol === -1 ||
    companyCol === -1 ||
    titleCol === -1 ||
    confidenceCol === -1
  ) {
    return {
      error:
        "One or more required columns (Date, Company, Title, Confidence) are missing in the spreadsheet.",
    };
  }
};

export default addRow;
