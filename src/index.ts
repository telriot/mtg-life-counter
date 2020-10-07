import { default as dotenv } from "dotenv";
dotenv.config();
import * as http from "http";
import express from "express";
import socketIo from "socket.io";
import path from "path";
import { onServerError } from "./lib";
import { indexRouter } from "./routes/index";
import { TRoom, TUser } from "./types/index";
export const app = express();
export const server = http.createServer(app);
const io = socketIo(server);

//Server config
export const port = process.env.PORT || "5000";
app.set("port", port);

server.listen(port);
server.on("error", onServerError);
server.on("listening", () => console.log("Server is running on port " + port));

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
    maxPlayers: room.maxPlayers,
  }));

//SERVER
io.on("connection", (socket) => {
  let { rooms, users } = store;
  io.emit("updateRoomsData", getRoomsDataObj(rooms));

  socket.on("joinRoom", ({ roomName, username, startingLife, maxPlayers }) => {
    if (!roomName || !username) return;

    socket.join(roomName);

    let user: TUser = {
      username,
      life: startingLife || 40,
      active: true,
      socketID: socket.id,
      roomName,
      commanderDamage: {},
    };

    let requestedRoom = rooms.find((room) => room.name === roomName);

    if (!requestedRoom) {
      requestedRoom = { name: roomName, users: [], maxPlayers };
      rooms.push(requestedRoom);
    }

    if (requestedRoom?.users.length >= maxPlayers) {
      io.to(socket.id).emit("message", "Players cap reached");
      return;
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
      requestedRoom.users.forEach((u) => {
        user.commanderDamage[`${u.username}`] = 0;
        u.commanderDamage[`${user.username}`] = 0;
      });
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

  socket.on("leaveRoom", ({ roomName, socketID, username }) => {
    let requestedRoom = rooms.find((room) => room.name === roomName);
    if (!requestedRoom) {
      return;
    }
    requestedRoom.users.forEach(
      (user) => delete user.commanderDamage[username]
    );
    requestedRoom.users = requestedRoom.users.filter(
      (user) => user.socketID !== socketID
    );
    if (requestedRoom.users.length < 1) {
      const roomIndex = rooms.findIndex((room) => room.name === roomName);
      rooms.splice(roomIndex, 1);
    }

    socket.leave(roomName);
    if (requestedRoom.users.length) {
      io.to(roomName).emit("roomData", requestedRoom);
    }
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
    if (requestedRoom.users.length < 2) {
      const userIndex = users.findIndex(
        (user) => user.username === loggedOutUser!.username
      );
      users.splice(userIndex, 1);

      const roomIndex = rooms.findIndex(
        (room) => room.name === requestedRoom?.name
      );
      rooms.splice(roomIndex, 1);
      io.emit("updateRoomsData", getRoomsDataObj(rooms));
    } else {
      setTimeout(() => {
        if (!loggedOutUser?.active) {
          const userIndex = users.findIndex(
            (user) => user.username === loggedOutUser!.username
          );
          users.splice(userIndex, 1);

          let requestedRoom = rooms.find(
            (room) => room.name === loggedOutUser?.roomName
          );
          if (!requestedRoom) return;

          requestedRoom.users = requestedRoom.users.filter(
            (user) => user.username !== loggedOutUser?.username
          );
          requestedRoom.users.forEach(
            (user) =>
              loggedOutUser &&
              delete user.commanderDamage[loggedOutUser.username]
          );
        }
        io.emit("updateRoomsData", getRoomsDataObj(rooms));
      }, 180000);
    }
  });
});

//Mount Routes

app.use("/api", indexRouter);

// Prepare Production Settings

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
