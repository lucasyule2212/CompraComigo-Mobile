import create from "zustand";

type sessionState = {
  sessionId: string | number[];
  setSessionId: (session: string | number[]) => void;
};

// Define a type with all your state selectors and setters
const useStore = create<sessionState>((set) => ({
  sessionId: "",
  setSessionId: (sessionId) => set(() => ({ sessionId: sessionId })),
}));

export const useSessionStore = useStore;
