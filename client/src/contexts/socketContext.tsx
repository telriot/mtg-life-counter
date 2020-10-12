import React from "react";
import socketIOClient from "socket.io-client";
import { TUser, TRoom, TRoomsData } from "../types/index";
import { useAppDispatch } from "./appContext";
import { joinedRoom as mockRoom, myUserProfile as mockProfile } from "../data";
type Action =
	| { type: "assignSocket"; payload: any }
	| { type: "leaveRoom" }
	| { type: "resetSocket" }
	| { type: "resetLifeAndCmdDmg"; payload: number }
	| { type: "resetState" }
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
					roomName: undefined,
					life: 40,
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
		case "resetState": {
			return {
				activeSocket: undefined,
				joinedRoom: undefined,
				myUserProfile: undefined,
				rooms: [],
				status: "idle",
				users: [],
			};
		}
		case "setLifeTotal": {
			return {
				...state,
				myUserProfile: { ...state.myUserProfile, life: action.payload },
			};
		}
		case "setUserProfile": {
			return !state.myUserProfile
				? { ...state, myUserProfile: action.payload }
				: { ...state };
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
		socket.current.on("updateRoomsData", (data: any) => {
			socketDispatch({ type: "updateRoomsData", payload: data });
		});
		socket.current.on("message", (data: any) => {
			console.log("individual message", data);
		});
		socket.current.on("got kicked", () => {
			socketDispatch({ type: "resetState" });
		});
		socket.current.on("roomJoined", (data: TUser) => {
			socketDispatch({ type: "setUserProfile", payload: data });
			appDispatch({ type: "setActiveTab", payload: 3 });
		});
		socket.current.on("roomData", (data: TRoom) => {
			socketDispatch({ type: "updateJoinedRoom", payload: data });
		});
		return () => {
			socket.current.disconnect();
			socketDispatch({ type: "resetSocket" });
		};
	}, [appDispatch]);

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
