import React from "react";
import socketIOClient from "socket.io-client";
import { TUser, TRoom, TRoomsData } from "../types/index";
import { useAppDispatch } from "./appContext";
type Action =
  | { type: "assignSocket"; payload: any }
  | { type: "resetSocket" }
  | { type: "updateAll"; payload: any }
  | { type: "setUserProfile"; payload: any }
  | { type: "setLifeTotal"; payload: number }
  | { type: "updateRoomsData"; payload: Array<TRoomsData> }
  | { type: "updateJoinedRoom"; payload: TRoom }
  | { type: "leaveRoom" };

type Dispatch = (action: Action) => void;

type State = {
  status: string;
  activeSocket: any;
  rooms: Array<TRoomsData>;
  users: Array<TUser>;
  myUserProfile?: TUser;
  joinedRoom?: TRoom;
};

const SocketStateContext = React.createContext<State | undefined>(undefined);
const SocketDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

const socketReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "updateAll": {
      return {
        ...state,
        rooms: action.payload.rooms,
        users: action.payload.users,
      };
    }
    case "assignSocket": {
      return { ...state, activeSocket: action.payload };
    }
    case "resetSocket": {
      return { ...state, activeSocket: "undefined" };
    }
    case "setUserProfile": {
      return { ...state, myUserProfile: action.payload };
    }
    case "setLifeTotal": {
      return {
        ...state,
        myUserProfile: { ...state.myUserProfile, life: action.payload },
      };
    }
    case "updateRoomsData": {
      return {
        ...state,
        rooms: action.payload,
      };
    }
    case "updateJoinedRoom": {
      return {
        ...state,
        joinedRoom: action.payload,
      };
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
    default: {
      return state;
    }
  }
};

const SocketProvider = ({ children }: { children: any }) => {
  let socket: any = React.useRef();

  const [socketState, socketDispatch] = React.useReducer(socketReducer, {
    status: "idle",
    activeSocket: undefined,
    users: [],
    rooms: [],
    myUserProfile: undefined,
    joinedRoom: undefined,
  });
  const appDispatch = useAppDispatch();
  React.useEffect(() => {
    socket.current = socketIOClient("/");
    socketDispatch({ type: "assignSocket", payload: socket.current });
    socket.current.on("FromAPI", (data: any) => {
      //console.log("From API", data);
      socketDispatch({ type: "updateAll", payload: data });
    });
    socket.current.on("updateRoomsData", (data: any) => {
      //console.log("updateRoomsData", data);
      socketDispatch({ type: "updateRoomsData", payload: data });
    });
    socket.current.on("message", (data: any) => {
      console.log("individual message", data);
    });
    socket.current.on("roomJoined", (data: TUser) => {
      //console.log("roomJoined", data);
      socketDispatch({ type: "setUserProfile", payload: data });
      appDispatch({ type: "setActiveTab", payload: 3 });
    });
    socket.current.on("roomData", (data: TRoom) => {
      //console.log("roomData", data);
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
