"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";

type UIState = {
  isLoading: boolean;
  isMenuOpen: boolean;
  isCommandPaletteOpen: boolean;
  activeSection: string;
  isEasterEggActive: boolean;
};

type UIAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_MENU_OPEN"; payload: boolean }
  | { type: "SET_COMMAND_PALETTE"; payload: boolean }
  | { type: "SET_ACTIVE_SECTION"; payload: string }
  | { type: "SET_EASTER_EGG"; payload: boolean };

const initialState: UIState = {
  isLoading: true,
  isMenuOpen: false,
  isCommandPaletteOpen: false,
  activeSection: "hero",
  isEasterEggActive: false,
};

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_MENU_OPEN":
      return { ...state, isMenuOpen: action.payload };
    case "SET_COMMAND_PALETTE":
      return { ...state, isCommandPaletteOpen: action.payload };
    case "SET_ACTIVE_SECTION":
      return { ...state, activeSection: action.payload };
    case "SET_EASTER_EGG":
      return { ...state, isEasterEggActive: action.payload };
    default:
      return state;
  }
}

const UIContext = createContext<{
  state: UIState;
  dispatch: React.Dispatch<UIAction>;
} | null>(null);

export function UIStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUIState() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIState must be used within UIStateProvider");
  }
  return context;
}
