import OpenAI from "openai";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import tools from "./tools.js";
import addRow from "./addRow.js";

const MODEL = "gpt-6-luna";
const client = new OpenAI();
const now = new Date();
const today = now.toLocaleDateString("en-CA");
const weekday = now.toLocaleDateString("en-CA", { weekday: "long" });
const messages = [
  {
    role: "system",
    content: `You are a helpful AI, acting as a job application logging assistant. Today is ${weekday}, ${today}. Turn relative dates like “last Tuesday” into YYYY-MM-DD, and never guess a missing company or title. Pass the user’s values exactly as given. Never change, omit, or replace a value.`,
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
    tools,
    reasoning_effort: "none",
  });
  let reply = response.choices[0].message;
  // console.log(JSON.stringify(response.choices[0], null, 2));
  messages.push(reply);
  let rounds = 0;
  while (reply.tool_calls) {
    rounds++;
    if (rounds > 5) {
      console.log("Too many rounds of tool calls. Exiting.");
      break;
    }
    // console.log(JSON.stringify(reply.tool_calls, null, 2));
    for (const toolCall of reply.tool_calls) {
      const args = JSON.parse(toolCall.function.arguments);
      // console.log("Args: ", args);
      const result = await addRow(args);
      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
      console.log("Tool result:", result);
    }
    const followUp = await client.chat.completions.create({
      model: MODEL,
      messages,
      tools,
      reasoning_effort: "none",
    });
    reply = followUp.choices[0].message;
    messages.push(reply);
    console.log("AI:", reply.content);
  }
}
