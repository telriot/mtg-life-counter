import { default as dotenv } from "dotenv";
dotenv.config();
import * as http from "http";
import express from "express";
import socketIo from "socket.io";
import path from "path";
import { onServerError } from "./lib";
import { indexRouter } from "./routes/index";
import store from "./db/index";
import { getRoomsDataObj } from "./lib/helpers";
import { socketDisconnect } from "./controllers";
import { createRoom, joinRoom, leaveRoom } from "./controllers/rooms";
import {
	resetLifeAndCmdDmg,
	setCommanderDamage,
	setLifeTotal,
} from "./controllers/users";
export const app = express();
export const server = http.createServer(app);
const io = socketIo(server);

//Server config
export const port = process.env.PORT || "5000";
app.set("port", port);

server.listen(port);
server.on("error", onServerError);
server.on("listening", () => console.log("Server is running on port " + port));

//SERVER
io.on("connection", (socket) => {
	let { rooms, users } = store;
	io.emit("updateRoomsData", getRoomsDataObj(rooms));
	socket.on(
		"createRoom",
		({ roomName, username, startingLife, maxPlayers }) => {
			createRoom(io, socket, { roomName, username, startingLife, maxPlayers });
		}
	);
	socket.on("joinRoom", ({ roomName, username, startingLife }) => {
		joinRoom(io, socket, { roomName, username, startingLife });
	});

	socket.on("setLifeTotal", ({ roomName, username, life }) =>
		setLifeTotal(io, { roomName, username, life })
	);

	socket.on(
		"setCommanderDamage",
		({ roomName, username, life, cmdDmgUsername, cmdDmgDamage }) =>
			setCommanderDamage(io, {
				roomName,
				username,
				life,
				cmdDmgUsername,
				cmdDmgDamage,
			})
	);

	socket.on("resetLifeAndCmdDmg", ({ roomName, username, life }) =>
		resetLifeAndCmdDmg(io, { roomName, username, life })
	);

	socket.on("leaveRoom", ({ roomName, socketID, username }) =>
		leaveRoom(io, socket, { roomName, socketID, username })
	);
	socket.on("kickPlayer", ({ roomName, socketID, username }) => {
		console.log("starting to kick");
		if (!roomName || !socketID) return;
		io.to(socketID).emit("got kicked");
		let requestedRoom = rooms.find((room) => room.name === roomName);
		if (!requestedRoom) return;
		console.log("kick requested room", requestedRoom);
		//CLEAR COMMANDER DAMAGE FOR THE ROOM
		requestedRoom.users.forEach(
			(user) => delete user.commanderDamage[username]
		);
		//REMOVE USER
		requestedRoom.users = requestedRoom.users.filter(
			(user) => user.socketID !== socketID
		);
		console.log("kick complete requested room");
		io.to(roomName).emit("roomData", requestedRoom);
		io.emit("updateRoomsData", getRoomsDataObj(rooms));
	});

	socket.on("disconnect", () => socketDisconnect(io, socket));
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
