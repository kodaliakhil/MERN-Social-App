import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", //frontend url
    methods: ["GET", "POST"],
  },
});
export const getRecipientSocketId = (recipientId) => {
  return userSocketMap[recipientId];
};
const userSocketMap = {}; //  {userId:socketId}

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  const userId = socket.handshake.query.userId; //  getting 'query' from client 'socketContext'

  if (userId != "undefined") userSocketMap[userId] = socket.id; //  storing all the online users in userSocketMap
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Here we are sending getOnlineUsers event to client side. Sending only keys of userSocketMap which contains online usersIds
  socket.on("disconnect", () => {
    console.log("User Disconnected");
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
