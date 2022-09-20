import axios from "axios";

export const api = axios.create({
  baseURL: `http://${process.env.LOCAL_IP}:3333`,
});
