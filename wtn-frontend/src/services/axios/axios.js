import axios from "axios";

const DEFAULT_BASE_URL = "http://localhost:7001/api/";

const instance = axios.create({
  baseURL: DEFAULT_BASE_URL,
  timeout: 5000,
  headers: { accept: "application/json" },
});

export default instance;
