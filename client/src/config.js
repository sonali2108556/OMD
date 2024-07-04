export const GRAPH_URL = "http://localhost:7777/graphql";

export const setToken = (token) => {
  window.localStorage.setItem("token", token);
};
export const getToken = () => {
  return window.localStorage.getItem("token");
};
export const removeToken = () => {
  return window.localStorage.removeItem("token");
};
