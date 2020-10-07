import React from "react";

type Action =
  | { type: "setActiveTab"; payload: number }
  | { type: "setMaxPlayers"; payload: 2 | 3 | 4 | 5 }
  | {
      type: "setStartingLife";
      payload: number;
    };

type Dispatch = (action: Action) => void;

type State = {
  activeTab: number;
  startingLife: number;
  maxPlayers: number;
};

const AppStateContext = React.createContext<State | undefined>(undefined);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const appReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setActiveTab": {
      return {
        ...state,
        activeTab: action.payload,
      };
    }
    case "setMaxPlayers": {
      return {
        ...state,
        maxPlayers: action.payload,
      };
    }
    case "setStartingLife": {
      return {
        ...state,
        startingLife: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

const AppProvider = ({ children }: { children: any }) => {
  const storedStartingLife = localStorage.getItem("startingLife")
    ? ~~localStorage.getItem("startingLife")!
    : 40;

  const [appState, appDispatch] = React.useReducer(appReducer, {
    activeTab: 1,
    startingLife: storedStartingLife || 40,
    maxPlayers: 4,
  });

  return (
    <AppStateContext.Provider value={appState}>
      <AppDispatchContext.Provider value={appDispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppProvider");
  }
  return context;
}
function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a AppProvider");
  }
  return context;
}

export { AppProvider, useAppState, useAppDispatch };
