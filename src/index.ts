import { default as dotenv } from "dotenv";
dotenv.config();
import * as http from "http";
import express from "express";
import socketIo from "socket.io";
import path from "path";
import mongoose from "mongoose";
import session from "express-session";
import { default as connectMongo } from "connect-mongo";
import { onServerError } from "./lib";
import { indexRouter } from "./routes/index";
import { roomsRouter } from "./routes/rooms";
import { usersRouter } from "./routes/users";
import { TRoom, TUser } from "./types/index";
export const app = express();
export const server = http.createServer(app);
const io = socketIo(server);
const MongoStore = connectMongo(session);
//Server config
export const port = process.env.PORT || "5000";
app.set("port", port);

server.listen(port);
server.on("error", onServerError);
server.on("listening", () => console.log("Server is running on port " + port));

//Connect to the DB
mongoose.connect(
  process.env.MONGO_URI || `mongodb://localhost:27017/life-counter-app`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("DB Connected");
});
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
// Setup public assets directory
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
  })
);

// Web Socket Server

//MOCK DB
let store: {
  rooms: Array<TRoom>;
  users: Array<TUser>;
} = { rooms: [], users: [] };

//Helpers
const getRoomsDataObj = (rooms: Array<TRoom>) =>
  rooms.map((room) => ({
    roomName: room.name,
    usersLength: room.users.length,
    maxUsers: room.maxUsers,
  }));

//SERVER
io.on("connection", (socket) => {
  let { rooms, users } = store;

  io.emit("updateRoomsData", getRoomsDataObj(rooms));

  socket.on("joinRoom", ({ roomName, username }) => {
    if (!roomName || !username) return;

    socket.join(roomName);

    let user = {
      username,
      life: 40,
      active: true,
      socketID: socket.id,
      roomName,
    };

    let requestedRoom = rooms.find((room) => room.name === roomName);
    if (!requestedRoom) {
      requestedRoom = { name: roomName, users: [] };
      rooms.push(requestedRoom);
    }

    let loggedUser = requestedRoom.users.find(
      (user) => user.username === username
    );

    if (loggedUser && loggedUser.active) {
      io.to(socket.id).emit("message", "Username already taken");
      return;
    }

    if (loggedUser) {
      loggedUser.active = true;
      loggedUser.socketID = socket.id;
      io.to(socket.id).emit("roomJoined", loggedUser);
    } else {
      users.push(user);
      requestedRoom.users.push(user);
      io.to(socket.id).emit("roomJoined", user);
    }

    io.emit("updateRoomsData", getRoomsDataObj(rooms));
    io.to(roomName).emit("roomData", requestedRoom);
  });

  socket.on("setLifeTotal", ({ roomName, username, life }) => {
    if (!roomName || !username || !life) return;

    let requestedRoom = rooms.find((room) => room.name === roomName);
    if (!requestedRoom) return;

    let requestedUser = requestedRoom?.users.find(
      (user) => user.username === username
    );
    if (!requestedUser) return;

    requestedUser.life = life;
    io.to(roomName).emit("roomData", requestedRoom);
  });

  socket.on("leaveRoom", ({ roomName, socketID }) => {
    let requestedRoom = rooms.find((room) => room.name === roomName);
    if (!requestedRoom) return;

    requestedRoom.users = requestedRoom.users.filter(
      (user) => user.socketID !== socketID
    );
    if (requestedRoom.users.length < 1) {
      rooms = rooms.filter((room) => room.name !== roomName);
    }
    socket.leave(roomName);
    io.to(roomName).emit("roomData", requestedRoom);
    io.emit("updateRoomsData", getRoomsDataObj(rooms));
  });

  socket.on("disconnect", () => {
    let loggedOutUser = users.find((user) => user.socketID === socket.id);
    if (!loggedOutUser) {
      console.log("No user to log out");
      return;
    }

    loggedOutUser.active = false;

    let requestedRoom = rooms.find(
      (room) => room.name === loggedOutUser?.roomName
    );
    if (!requestedRoom) return;

    let requestedUser = requestedRoom.users.find(
      (user) => user.username === loggedOutUser?.username
    );
    if (!requestedUser) return;

    requestedUser.active = false;

    setTimeout(() => {
      if (!loggedOutUser?.active) {
        users = users.filter(
          (user) => user.username !== loggedOutUser!.username
        );

        let requestedRoom = rooms.find(
          (room) => room.name === loggedOutUser?.roomName
        );
        if (!requestedRoom) return;

        requestedRoom.users = requestedRoom.users.filter(
          (user) => user.username !== loggedOutUser?.username
        );
        if (requestedRoom.users.length < 1) {
          rooms = rooms.filter((room) => room.name !== requestedRoom?.name);
        }
      }

      io.emit("updateRoomsData", getRoomsDataObj(rooms));
    }, 6000);
  });
});

//Mount Routes

app.use("/api", indexRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/users", usersRouter);

// Prepare Production Settings

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
