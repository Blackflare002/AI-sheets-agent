const tools = [
  {
    type: "function",
    function: {
      name: "add_row",
      description:
        "Logs a job application to the spreadsheet. If the company or title is missing, ask the user for the missing information instead of guessing.",
    },
    parameters: {
      type: "object",
      properties: {
        company: {
          type: "string",
          description: "The name of the company",
        },
        title: {
          type: "string",
          description: "The job title",
        },
        date: {
          type: "string",
          description:
            "The date of the application, the format is YYYY-MM-DD, this is only included if the user provides it",
        },
        confidence: {
          type: "number",
          description:
            "The confidence level of the application, a rating from 1 to 5, this is only included if the user provides it",
        },
      },
      required: ["company", "title"],
    },
  },
];

export default tools;
