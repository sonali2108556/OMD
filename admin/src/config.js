
export var headerHeight = '80px';
export var sideBarOpenWidth = '200px';
export var borderRadiusMainContent = '20px';
export var sidebarCloseWidth = '80px'

export var GRAPH_URL = "http://localhost:7777/graphql";

export const setToken = (token) => {
    window.localStorage.setItem("token",token);
};
export const getToken = () => {
  return window.localStorage.getItem("token");
};
export const removeToken = () => {
    window.localStorage.removeItem("token");
}

