console.log("start");

import addRow from "./addRow.js";

const result = await addRow({
  company: "OpenAI",
  title: "AI Researcher",
  confidence: 2,
});

console.log(result);

console.log("fin");
