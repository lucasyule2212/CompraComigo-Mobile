import axios from "axios";

// ALTERAR O LOCAL IP PARA O IP DA SUA MÁQUINA
export const api = axios.create({
  baseURL:
    process.env.ENVIRONMENT === "develop"
      ? `http://${process.env.LOCAL_IP}:3333`
      : "https://compracomigo-api.onrender.com",
});
