import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
import TokenService from "./token.service";


const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = TokenService.getLocalAccessToken();
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
}
);

export default instance;
