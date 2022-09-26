import create from "zustand";

type orcamentoState = {
  orcamento: number | null;
  originalOrcamento: number | null;
  setOrcamento: (orcamento: number) => void;
  setOriginalOrcamento: (orcamento: number) => void;
  resetOrcamento: () => void;
  clearOrcamento: () => void;
};

// Define a type with all your state selectors and setters
const useStore = create<orcamentoState>((set) => ({
  orcamento: null,
  originalOrcamento: null,
  setOrcamento: (orcamento) =>
    set((state) => ({
      orcamento: orcamento,
      originalOrcamento: state.originalOrcamento,
    })),
  setOriginalOrcamento: (orcamento) =>
    set((state) => ({
      orcamento: state.orcamento,
      originalOrcamento: orcamento,
    })),
  resetOrcamento: () =>
    set((state) => ({
      orcamento: state.originalOrcamento,
      originalOrcamento: state.originalOrcamento,
    })),
  clearOrcamento: () =>
    set((state) => ({
      orcamento: null,
      originalOrcamento: null,
    })),
}));

export const useOrcamentoStore = useStore;
