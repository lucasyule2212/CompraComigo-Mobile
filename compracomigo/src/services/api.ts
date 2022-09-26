import axios from "axios";

// ALTERAR O LOCAL IP PARA O IP DA SUA MÁQUINA
export const api = axios.create({
  baseURL: `http://192.168.0.53:3333`,
});
