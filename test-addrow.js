// console.log("start");

import addRow from "./addRow.js";

// const result = await addRow({
//   company: "OpenAI",
//   title: "AI Researcher",
//   confidence: 2,
// });

console.log(
  await addRow({
    title: "Chief Tester",
    confidence: 1,
  }),
);

console.log(
  await addRow({
    title: "   ",
    company: "Weyland-Yutani",
  }),
);

console.log(
  await addRow({
    title: "The Man",
    company: "Megacorp",
    confidence: 6,
  }),
);

console.log(
  await addRow({
    title: "Megaman",
    company: "Megacorp",
    confidence: 1.333333,
  }),
);

console.log(
  await addRow({
    title: "The Man Who Sold The World",
    company: "Diamond Dogs",
    confidence: "5",
  }),
);
// console.log(result);

// console.log("fin");
