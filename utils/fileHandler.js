import { promises as fs } from "fs";

const filePath = "message.json";

export async function readMessages() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading messages:", err);
    return [];
  }
}

export async function saveMessages(messages) {
  try {
    await fs.writeFile(filePath, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error("Error saving messages:", err);
  }
}
