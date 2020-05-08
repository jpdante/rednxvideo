import axios from "axios";
import { getToken } from "./auth";

const net = axios.create(/*{
  baseURL: ""
}*/);

net.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default net;