import OpenAI from "openai";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const MODEL = "gpt-6-luna";
const client = new OpenAI();
const now = new Date();
const today = now.toLocaleDateString("en-CA");
const weekday = now.toLocaleDateString("en-CA", { weekday: "long" });
const messages = [
  {
    role: "system",
    content: `You are a helpful AI, acting as a job application logging assistant. Today is ${weekday}, ${today}. Turn relative dates like “last Tuesday” into YYYY-MM-DD, and never guess a missing company or title.`,
  },
];

const rl = readline.createInterface({ input, output });
while (true) {
  const userInput = await rl.question("You: ");
  if (userInput.trim().toLowerCase() === "exit") {
    rl.close();
    break;
  }
  messages.push({ role: "user", content: userInput });
  const response = await client.chat.completions.create({
    model: MODEL,
    messages,
  });
  const reply = response.choices[0].message;
  messages.push(reply);
  console.log("AI:", reply.content);
}
