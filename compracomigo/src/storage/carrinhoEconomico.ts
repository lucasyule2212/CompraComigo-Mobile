import create from "zustand";
import { itemCarrinho, Produto } from "./carrinho";

export interface ItemCarrinhoEconomico extends itemCarrinho {
  opcoes: Produto[];
}

export type CarrinhoEconomicoType = {
  carrinhoEconomico: ItemCarrinhoEconomico[];
  valorTotalEconomia: number;
};

export type CarrinhoEconomicoState = {
  carrinhoEconomico: CarrinhoEconomicoType | null;
  loading: boolean;
  changeCarrinhoItemForSuggested: (
    itemId: string | number,
    suggestedItem: Produto
  ) => void;
  setCarrinhoEconomico: (carrinho: CarrinhoEconomicoType | null) => void;
  setLoading: (value: boolean) => void;
};

const initialState: Pick<
  CarrinhoEconomicoState,
  "carrinhoEconomico" | "loading"
> = {
  carrinhoEconomico: null,
  loading: false,
};

export const useCarrinhoEconomicoStore = create<CarrinhoEconomicoState>(
  (set) => ({
    ...initialState,
    setCarrinhoEconomico: (carrinho) => set({ carrinhoEconomico: carrinho }),
    setLoading: (value) => set({ loading: value }),
    changeCarrinhoItemForSuggested: (itemId, suggestedItem) => {
      set((state) => {
        if (!state.carrinhoEconomico) return state;
        const carrinhoEconomico = state.carrinhoEconomico.carrinhoEconomico.map(
          (item) => {
            if (item.id === itemId) {
              item.id = suggestedItem.id;
              item.nome = suggestedItem.nome;
              item.preco = suggestedItem.valor;
              item.valorTotal = suggestedItem.valor * item.quantidade;
              item.image = suggestedItem.image_url;
              // opcoes recebe as opcoes mais baratas da lista de opcoes, se houver
              item.opcoes = item.opcoes.filter(
                (item) => item.valor <= suggestedItem.valor
              );
            }
            return item;
          }
        );

        return {
          ...state,
          carrinhoEconomico: {
            ...state.carrinhoEconomico,
            carrinhoEconomico,
          },
        };
      });
    },
  })
);
