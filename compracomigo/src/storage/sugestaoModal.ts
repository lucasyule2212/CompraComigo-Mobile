import { BarCodeScanner } from "expo-barcode-scanner";
import create from "zustand";
import { useCarrinhoStore } from "./carrinho";

type sugestaoModalState = {
  visible: boolean;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setVisible: (visible: boolean) => void;
};

// Define a type with all your state selectors and setters
const useStore = create<sugestaoModalState>((set) => ({
  visible: false,
  loading: false,
  setLoading: (value) => set({ loading: value }),
  setVisible: (visible) => set(() => ({ visible: visible })),
}));

export const useSugestaoModalStore = useStore;
