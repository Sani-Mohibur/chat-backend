import express from "express";
import http from "http";
import { Server } from "socket.io";
import { promises as fs } from "fs";
import { readMessages, saveMessages } from "./utils/fileHandler.js";

const app = express();
const server = http.createServer(app);

//Create a new socket.io server
const io = new Server(server, {
  //CORS-Cross Origin Resource Sharing
  //CORS is a browser security rule that blocks requests from other origins
  cors: {
    origin: "*", //This allows any website to connect
    methods: ["GET", "POST"], //only allowed GET or POST
  },
});

const PORT = process.env.PORT || 3000;

//Handle socket connections
io.on("connection", async (socket) => {
  console.log("A user connected:", socket.id);

  //Brodcast system message that a user joined
  /*const joinMessage = {
    id: Date.now().toString(),
    text: "🔵 A user has joined the chat",
    system: true,
  };
  io.emit("chat message", joinMessage);
  */

  //Send previous messages to the new clients
  try {
    const messages = await readMessages();

    socket.emit("chat history", messages);
  } catch (err) {
    console.error("Error reading chat history:", err);
  }

  //Receive and broadcast message
  socket.on("chat message", async (msg) => {
    try {
      //Read current messages from file
      const messages = await readMessages();

      //Add new message
      const newMessage = {
        id: Date.now().toString(),
        text: msg.text,
        username: msg.username,
      };
      messages.push(newMessage);

      //Write updated message back to file
      await saveMessages(messages);

      //Broadcast message to all clients
      io.emit("chat message", newMessage);
    } catch (err) {
      console.error("File operation error:", err);
    }
  });
  //Edit message event
  socket.on("edit message", async ({ id, newText }) => {
    try {
      const messages = await readMessages();
      const index = messages.findIndex((msg) => msg.id === id);
      if (index !== -1) {
        messages[index].text = newText;
        await saveMessages(messages);
        io.emit("edit message", messages[index]); //Broadcast updated message
        console.log(`Message ${id} edited.`);
      }
    } catch (err) {
      console.error("Error editing message:", err);
    }
  });

  //Delete message event
  socket.on("delete message", async (id) => {
    try {
      let messages = await readMessages();
      messages = messages.filter((msg) => msg.id !== id);
      await saveMessages(messages);
      io.emit("delete message", id); //Broadcast deleted message ID
      console.log(`Message ${id} deleted.`);
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  });

  //Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    //Broadcast system message that a user left
    /*const leaveMessage = {
      id: Date.now().toString(),
      text: "🔴 A user has left the chat",
      system: true,
    };
    io.emit("chat message", leaveMessage);
    */
  });
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
