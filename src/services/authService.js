// import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

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
  return "malcolms65@gmail.com";
  // try {
  //   const jwt = localStorage.getItem(tokenKey);

  //   const decoded = jwtDecode(jwt);

  //   return decoded.sub;
  // } catch (ex) {
  //   return null;
  // }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
