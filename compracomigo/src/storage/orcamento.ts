import create from "zustand";

type orcamentoState = {
  orcamento: number | null;
  setOrcamento: (orcamento: number) => void;
};

// Define a type with all your state selectors and setters
const useStore = create<orcamentoState>((set) => ({
  orcamento: null,
  setOrcamento: (orcamento) => set(() => ({ orcamento: orcamento })),
}));

export const useOrcamentoStore = useStore;
