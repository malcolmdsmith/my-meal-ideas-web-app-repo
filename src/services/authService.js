// import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/users/authenticate";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password) {
  const jwt = await http.post(apiEndpoint, { username, password });
  localStorage.setItem(tokenKey, jwt.token);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);

    const decoded = jwtDecode(jwt);
    let user = decoded.sub;
    if (user.role === "user" || user.role === "admin") user.AllowEdits = true;
    else user.AllowEdits = false;
    return user;
  } catch (ex) {
    const user = {
      firstName: "guest",
      lastName: "guest",
      role: "guest",
      AllowEdits: false,
    };
    return user;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
