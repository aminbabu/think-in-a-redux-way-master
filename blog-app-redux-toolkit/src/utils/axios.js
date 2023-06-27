import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9000",
  timeout: 1200,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
