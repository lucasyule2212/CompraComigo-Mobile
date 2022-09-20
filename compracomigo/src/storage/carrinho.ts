import create from "zustand";

export interface itemCarrinho {
  id: number | string;
  nome: string;
  preco: number;
  valorTotal: number;
  quantidade: number;
  image: string;
  priorizado: boolean;
}

export interface carrinho {
  itens: itemCarrinho[];
  valorTotal: number;
}

type carrinhoState = {
  carrinho: carrinho;
  addItem: (item: itemCarrinho) => void;
  reduceItem: (item: itemCarrinho) => void;
  removeItem: (id: number) => void;
  priorizarItem: (item: itemCarrinho) => void;
  clearCarrinho: () => void;
};

// Apenas para testes
const dummyItems: itemCarrinho[] = [
  {
    id: 1,
    nome: "Item 1",
    preco: 10,
    valorTotal: 10,
    quantidade: 1,
    priorizado: false,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    nome: "Item 2",
    preco: 20,
    valorTotal: 20,
    quantidade: 1,
    priorizado: false,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    nome: "Item 3",
    preco: 15,
    valorTotal: 15,
    quantidade: 1,
    priorizado: false,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 4,
    nome: "Item 4",
    preco: 5,
    valorTotal: 5,
    quantidade: 1,
    priorizado: false,
    image: "https://picsum.photos/200/300",
  },
];

// Define a type with all your state selectors and setters
const useStore = create<carrinhoState>((set) => ({
  carrinho: { itens: [...dummyItems], valorTotal: 50 },
  addItem: (item) =>
    set((state) => {
      const index = state.carrinho.itens.findIndex((i) => i.id === item.id);
      if (index === -1) {
        state.carrinho.itens.push(item);
      } else {
        state.carrinho.itens[index].quantidade += 1;
        state.carrinho.itens[index].valorTotal += item.preco;
      }
      state.carrinho.valorTotal += item.preco;

      return {
        carrinho: state.carrinho,
        valortotal: state.carrinho.valorTotal,
      };
    }),
  reduceItem: (item) =>
    set((state) => {
      const index = state.carrinho.itens.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        state.carrinho.itens[index].quantidade -= 1;
        state.carrinho.itens[index].valorTotal -= item.preco;
        state.carrinho.valorTotal -= item.preco;
        if (state.carrinho.itens[index].quantidade === 0) {
          state.carrinho.itens.splice(index, 1);
        }
      }
      return {
        carrinho: state.carrinho,
        valortotal: state.carrinho.valorTotal,
      };
    }),
  removeItem: (id) =>
    set((state) => {
      const index = state.carrinho.itens.findIndex((i) => i.id === id);
      if (index !== -1) {
        state.carrinho.valorTotal -= state.carrinho.itens[index].valorTotal;
        state.carrinho.itens.splice(index, 1);
      }
      return {
        carrinho: state.carrinho,
        valortotal: state.carrinho.valorTotal,
      };
    }),
  priorizarItem: (item) =>
    set((state) => {
      const index = state.carrinho.itens.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        state.carrinho.itens[index].priorizado =
          !state.carrinho.itens[index].priorizado;
      }

      return {
        carrinho: state.carrinho,
        valortotal: state.carrinho.valorTotal,
      };
    }),
  clearCarrinho: () =>
    set((state) => {
      state.carrinho.itens = [];
      state.carrinho.valorTotal = 0;
      return {
        carrinho: state.carrinho,
        valortotal: state.carrinho.valorTotal,
      };
    }),
}));

export const useCarrinhoStore = useStore;
