import React from "react";
import socketIOClient from "socket.io-client";
import { TUser, TRoom, TRoomsData } from "../types/index";
import { useAppDispatch } from "./appContext";
import {
	joinedRoom,
	joinedRoom as mockRoom,
	myUserProfile as mockProfile,
	myUserProfile,
} from "../data";
type Action =
	| { type: "assignSocket"; payload: any }
	| { type: "leaveRoom" }
	| { type: "resetSocket" }
	| { type: "resetLifeAndCmdDmg"; payload: number }
	| { type: "setLifeTotal"; payload: number }
	| { type: "setUserProfile"; payload: any }
	| { type: "updateAll"; payload: any }
	| {
			type: "updateCommanderDamage";
			payload: { username: string; damage: number };
	  }
	| { type: "updateJoinedRoom"; payload: TRoom }
	| { type: "updateRoomsData"; payload: Array<TRoomsData> }
	| { type: "updateUserProfile"; payload: any };

type Dispatch = (action: Action) => void;

type State = {
	activeSocket: any;
	joinedRoom?: TRoom;
	myUserProfile?: TUser;
	rooms: Array<TRoomsData>;
	status: string;
	users: Array<TUser>;
};

const SocketDispatchContext = React.createContext<Dispatch | undefined>(
	undefined
);
const SocketStateContext = React.createContext<State | undefined>(undefined);

const socketReducer = (state: State, action: Action) => {
	switch (action.type) {
		case "assignSocket": {
			return { ...state, activeSocket: action.payload };
		}
		case "leaveRoom": {
			return {
				...state,
				myUserProfile: {
					...state.myUserProfile,
					username: undefined,
					roomName: undefined,
					life: 40,
					commanderDamage: {},
				},
				joinedRoom: undefined,
			};
		}
		case "resetLifeAndCmdDmg": {
			let commanderDamageResetObj: any = {};
			Object.entries(state.myUserProfile?.commanderDamage).forEach(
				([username, damage]) => {
					commanderDamageResetObj[username] = 0;
				}
			);
			return {
				...state,

				myUserProfile: {
					...state.myUserProfile,
					life: action.payload,
					commanderDamage: commanderDamageResetObj,
				},
			};
		}

		case "resetSocket": {
			return { ...state, activeSocket: "undefined" };
		}

		case "setLifeTotal": {
			return {
				...state,
				myUserProfile: { ...state.myUserProfile, life: action.payload },
			};
		}
		case "setUserProfile": {
			return { ...state, myUserProfile: action.payload };
		}
		case "updateAll": {
			return {
				...state,
				rooms: action.payload.rooms,
				users: action.payload.users,
			};
		}
		case "updateCommanderDamage": {
			return {
				...state,
				myUserProfile: {
					...state.myUserProfile,
					commanderDamage: {
						...state.myUserProfile?.commanderDamage,
						[action.payload.username]: action.payload.damage,
					},
				},
			};
		}
		case "updateJoinedRoom": {
			return {
				...state,
				joinedRoom: action.payload,
			};
		}
		case "updateRoomsData": {
			return {
				...state,
				rooms: action.payload,
			};
		}
		case "updateUserProfile": {
			return {
				...state,
				myUserProfile: !state.myUserProfile
					? action.payload.users[0]
					: action.payload.users.find(
							(user: TUser) => user.username === state.myUserProfile?.username
					  ),
			};
		}
		default: {
			return state;
		}
	}
};

const SocketProvider = ({ children }: { children: any }) => {
	const appDispatch = useAppDispatch();
	let socket: any = React.useRef();
	const isTesting = false;
	const [socketState, socketDispatch] = React.useReducer(socketReducer, {
		activeSocket: isTesting ? "testingsocket" : undefined,
		joinedRoom: isTesting ? mockRoom : undefined,
		myUserProfile: isTesting ? mockProfile : undefined,
		rooms: isTesting
			? [{ roomName: "TestRoom", usersLength: 4, maxPlayers: 5 }]
			: [],
		status: "idle",
		users: isTesting ? mockRoom.users : [],
	});

	React.useEffect(() => {
		socket.current = socketIOClient("/");

		socketDispatch({ type: "assignSocket", payload: socket.current });
		socket.current.on("FromAPI", (data: any) => {
			socketDispatch({ type: "updateAll", payload: data });
		});
		socket.current.on("got kicked", () => {
			socketDispatch({ type: "leaveRoom" });
			appDispatch({ type: "setActiveTab", payload: 1 });
		});
		socket.current.on("leaveRoom", () => {
			socketDispatch({ type: "leaveRoom" });
		});
		socket.current.on("message", (message: string) => {
			window.alert(message);
			console.log("individual message", message);
		});
		socket.current.on("roomData", (data: TRoom) => {
			console.log("roomData", data);
			socketDispatch({ type: "updateJoinedRoom", payload: data });
		});
		socket.current.on("roomJoined", (data: TUser) => {
			console.log("roomJoined", data);

			appDispatch({ type: "setActiveTab", payload: 3 });
			socketDispatch({ type: "setUserProfile", payload: data });
		});
		socket.current.on("updateRoomsData", (data: any) => {
			socketDispatch({ type: "updateRoomsData", payload: data });
		});
		return () => {
			socket.current.disconnect();
			socketDispatch({ type: "resetSocket" });
		};
	}, [appDispatch, socket]);

	return (
		<SocketStateContext.Provider value={socketState}>
			<SocketDispatchContext.Provider value={socketDispatch}>
				{children}
			</SocketDispatchContext.Provider>
		</SocketStateContext.Provider>
	);
};

function useSocketState() {
	const context = React.useContext(SocketStateContext);
	if (context === undefined) {
		throw new Error("useSocketState must be used within a SocketProvider");
	}
	return context;
}
function useSocketDispatch() {
	const context = React.useContext(SocketDispatchContext);
	if (context === undefined) {
		throw new Error("useSocketDispatch must be used within a SocketProvider");
	}
	return context;
}

export { SocketProvider, useSocketState, useSocketDispatch };
