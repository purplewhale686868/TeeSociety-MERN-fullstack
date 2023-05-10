import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const requestMethod = axios.create({
  baseURL: BASE_URL,
});
