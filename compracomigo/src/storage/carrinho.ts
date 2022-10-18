import { SCROLLABLE_STATE } from "@gorhom/bottom-sheet";
import create from "zustand";
import { api } from "../services/api";

export interface itemCarrinho {
  id: number | string;
  nome: string;
  preco: number;
  valorTotal: number;
  quantidade: number;
  image: string;
  priorizado: boolean;
  categoria: string;
}

export interface Produto {
  id: string;
  nome: string;
  image_url: string;
  categoria: string;
  valor: number;
}

export interface carrinho {
  itens: itemCarrinho[];
  valorTotal: number;
}

type carrinhoState = {
  carrinho: carrinho;
  loading: boolean;
  priorizarFirstTime: boolean;
  setPriorizarFirstTime: () => void;
  priorizarModalVisible: boolean;
  setPriorizarModalVisible: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  addItem: (item: itemCarrinho) => void;
  reduceItem: (item: itemCarrinho) => void;
  removeItem: (id: number) => void;
  priorizarItem: (item: itemCarrinho) => void;
  clearCarrinho: () => void;
  suggestedItems: Produto[];
  setSuggestedItems: (items: Produto[]) => void;
  changeCarrinhoItemForSuggestedByIndex: (
    index: number,
    itemId: string | number
  ) => void;
  toChangeCarrinhoItemID: string | number;
  setToChangeCarrinhoItemID: (id: string | number) => void;
};

// // Apenas para testes
// const dummyItems: itemCarrinho[] = [
//   {
//     id: 1,
//     nome: "Item 1",
//     preco: 10,
//     valorTotal: 10,
//     quantidade: 1,
//     priorizado: false,
//     image: "https://picsum.photos/200/300",
//     categoria: "teste",
//   },
//   {
//     id: 2,
//     nome: "Item 2",
//     preco: 20,
//     valorTotal: 20,
//     quantidade: 1,
//     priorizado: false,
//     image: "https://picsum.photos/200/300",
//     categoria: "teste",
//   },
//   {
//     id: 3,
//     nome: "Item 3",
//     preco: 15,
//     valorTotal: 15,
//     quantidade: 1,
//     priorizado: false,
//     image: "https://picsum.photos/200/300",
//     categoria: "teste",
//   },
//   {
//     id: 4,
//     nome: "Item 4",
//     preco: 5,
//     valorTotal: 5,
//     quantidade: 1,
//     priorizado: false,
//     image: "https://picsum.photos/200/300",
//     categoria: "teste",
//   },
// ];

// Define a type with all your state selectors and setters
const useStore = create<carrinhoState>((set) => ({
  carrinho: { itens: [], valorTotal: 0 },
  loading: false,
  priorizarFirstTime: false,
  priorizarModalVisible: false,
  setPriorizarModalVisible: (value) => set({ priorizarModalVisible: value }),
  setPriorizarFirstTime: () => set({ priorizarFirstTime: true }),
  setLoading: (value) => set({ loading: value }),
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
  suggestedItems: [],
  setSuggestedItems: (items) =>
    set((state) => {
      state.suggestedItems = items;
      return {
        suggestedItems: state.suggestedItems,
      };
    }),
  changeCarrinhoItemForSuggestedByIndex: (index, itemId) =>
    set((state) => {
      const item = state.suggestedItems[index];
      const carrinhoItem = state.carrinho.itens.find((i) => i.id === itemId);
      const carrinhoAlreadyHasItem = state.carrinho.itens.find(
        (i) => i.id === item.id
      );
      if (carrinhoItem && carrinhoAlreadyHasItem) {
        carrinhoAlreadyHasItem.quantidade += 1;
        carrinhoAlreadyHasItem.valorTotal += item.valor;
        state.carrinho.itens = state.carrinho.itens.filter(
          (i) => i.id !== carrinhoItem.id
        );
      } else if (carrinhoItem) {
        carrinhoItem.id = item.id;
        carrinhoItem.nome = item.nome;
        carrinhoItem.categoria = item.categoria;
        carrinhoItem.image = item.image_url;
        carrinhoItem.preco = item.valor;
        carrinhoItem.valorTotal = item.valor;
      }
      // update carrinho valorTotal
      state.carrinho.valorTotal = state.carrinho.itens.reduce(
        (acc, item) => acc + item.valorTotal,
        0
      );

      return {
        carrinho: state.carrinho,
        valortotal: state.carrinho.valorTotal,
      };
    }),
  toChangeCarrinhoItemID: "",
  setToChangeCarrinhoItemID: (id) =>
    set((state) => {
      state.toChangeCarrinhoItemID = id;
      return {
        toChangeCarrinhoItemID: state.toChangeCarrinhoItemID,
      };
    }),
}));

export const useCarrinhoStore = useStore;
