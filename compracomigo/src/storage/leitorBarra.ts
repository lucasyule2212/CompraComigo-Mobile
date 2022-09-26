import { BarCodeScanner } from "expo-barcode-scanner";
import create from "zustand";
import { useCarrinhoStore } from "./carrinho";

type leitorBarraState = {
  hasPermission: boolean;
  setHasPermission: (hasPermission: boolean) => void;
  scanned: boolean;
  setScanned: (scanned: boolean) => void;
  codigoDeBarras: string;
  setCodigoDeBarras: (codigoDeBarras: string) => void;
  askForCameraPermission: () => void;
};


// Define a type with all your state selectors and setters
const useStore = create<leitorBarraState>((set) => ({
  hasPermission: false,
  setHasPermission: (hasPermission) =>
    set(() => ({ hasPermission: hasPermission })),
  scanned: false,
  setScanned: (scanned) => set(() => ({ scanned: scanned })),
  codigoDeBarras: "",
  setCodigoDeBarras: (codigoDeBarras) =>
    set(() => ({ codigoDeBarras: codigoDeBarras })),
  askForCameraPermission: async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    set(() => ({ hasPermission: status === "granted" }));
  },
}));

export const useLeitorBarraStore = useStore;
