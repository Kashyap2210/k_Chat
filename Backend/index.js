const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://kashyap2210.github.io/k_Chat"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

const server = app.listen("3000", () => {
  console.log("Server is running on port 3000");
});

const io = socket(server, {
  cors: {
    origin: ["http://localhost:5173", "https://kashyap2210.github.io/k_Chat"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id, "socket.id");

  socket.on("join_room", (data) => {
    console.log(data, "data");
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    console.log("Message Recieved", data);
    socket.to(data.room).emit("recieve_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});
