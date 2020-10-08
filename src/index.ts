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
    //BOUNCE INCOMPLETE DATA
    if (!roomName || !username) return;
    //JOIN ROOM
    socket.join(roomName);
    //CREATE USER TEMPLATE
    let user: TUser = {
      username,
      life: startingLife || 40,
      active: true,
      socketID: socket.id,
      roomName,
      commanderDamage: {},
    };

    let requestedRoom = rooms.find((room) => room.name === roomName);
    //IF ROOM DOES NOT EXIST - CREATE NEW ROOM
    if (!requestedRoom) {
      requestedRoom = { name: roomName, users: [], maxPlayers };
      rooms.push(requestedRoom);
    }
    //IF ROOM IS FULL - BOUNCE
    if (requestedRoom?.users.length >= maxPlayers) {
      io.to(socket.id).emit("message", "Players cap reached");
      return;
    }
    //FIND IF USER IS ALREADY IN
    let loggedUser = requestedRoom.users.find(
      (user) => user.username === username
    );
    //BOUNCE IF USER WITH SAME USERNAME IS ACTIVE
    if (loggedUser && loggedUser.active) {
      io.to(socket.id).emit("message", "Username already taken");
      return;
    }

    if (loggedUser) {
      //IF USER WITH SAME USERNAME IS NOT ACTIVE REFRESH PROFILE WITH NEW SOCKET ID AND ACTIVATE
      loggedUser.active = true;
      loggedUser.socketID = socket.id;
      io.to(socket.id).emit("roomJoined", loggedUser);
    } else {
      //IF NO USER WITH SAME USERNAME CREATE NEW USER AND ADJUST COMMANDER DAMAGE FOR THE ROOM
      requestedRoom.users.forEach((u) => {
        user.commanderDamage[`${u.username}`] = 0;
        u.commanderDamage[`${user.username}`] = 0;
      });
      //ADD USER TO USER ARRAY, ROOM, THEN EMIT
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
  socket.on(
    "setCommanderDamage",
    ({ roomName, username, life, cmdDmgUsername, cmdDmgDamage }) => {
      if (!roomName || !username || !cmdDmgUsername || !cmdDmgDamage) return;

      let requestedRoom = rooms.find((room) => room.name === roomName);
      if (!requestedRoom) return;
      let requestedUser = requestedRoom?.users.find(
        (user) => user.username === username
      );
      if (!requestedUser) return;
      requestedUser.commanderDamage[cmdDmgUsername] = cmdDmgDamage;
      requestedUser.life = life;
      io.to(roomName).emit("roomData", requestedRoom);
    }
  );
  socket.on("leaveRoom", ({ roomName, socketID, username }) => {
    if (!roomName || !socketID || !username) return;

    let requestedRoom = rooms.find((room) => room.name === roomName);
    if (!requestedRoom) {
      return;
    }
    //CLEAR COMMANDER DAMAGE FOR THE ROOM
    requestedRoom.users.forEach(
      (user) => delete user.commanderDamage[username]
    );
    //REMOVE USER
    requestedRoom.users = requestedRoom.users.filter(
      (user) => user.socketID !== socketID
    );
    //IF NO USERS LEFT, REMOVE ROOM
    if (requestedRoom.users.length < 1) {
      const roomIndex = rooms.findIndex((room) => room.name === roomName);
      rooms.splice(roomIndex, 1);
    }
    //EMIT
    socket.leave(roomName);
    if (requestedRoom.users.length) {
      io.to(roomName).emit("roomData", requestedRoom);
    }
    io.emit("updateRoomsData", getRoomsDataObj(rooms));
  });

  socket.on("disconnect", () => {
    //FIND USER TO LOG OUT AND RETURN IF NONE
    let loggedOutUser = users.find((user) => user.socketID === socket.id);

    if (!loggedOutUser) {
      console.log("No user to log out");
      return;
    }
    //DEACTIVATE USER
    loggedOutUser.active = false;

    let requestedRoom = rooms.find(
      (room) => room.name === loggedOutUser?.roomName
    );
    //IF ROOM HAS BEEN DEELETED, RETURN
    if (!requestedRoom) return;

    let requestedUser = requestedRoom.users.find(
      (user) => user.username === loggedOutUser?.username
    );
    //IF USER HAS BEEN DELETED, RETURN
    if (!requestedUser) return;
    //DEACTIVATE USERS ROOM PROFILE
    requestedUser.active = false;
    //IF USER WAS THE LAST TO LEAVE, DELETE ROOM
    if (requestedRoom.users.length < 2) {
      const userIndex = users.findIndex(
        (user) => user.username === loggedOutUser!.username
      );
      users.splice(userIndex, 1);

      const roomIndex = rooms.findIndex(
        (room) => room.name === requestedRoom?.name
      );
      rooms.splice(roomIndex, 1);
      //EMIT
      io.emit("updateRoomsData", getRoomsDataObj(rooms));
    } else {
      //ELSE IF OTHER USERS ARE IN, START TIMEOUT BEFOR LOGGING OUT
      io.emit("updateRoomsData", getRoomsDataObj(rooms));

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

          const requestedUserRoomIndex = requestedRoom.users.findIndex(
            (user) => user.username === loggedOutUser?.username
          );
          requestedRoom.users.splice(requestedUserRoomIndex, 1);

          requestedRoom.users.forEach(
            (user) =>
              loggedOutUser &&
              delete user.commanderDamage[loggedOutUser.username]
          );
        }
        //EMIT
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
