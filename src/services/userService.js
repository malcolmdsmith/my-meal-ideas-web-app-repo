import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(`${apiEndpoint}/register`, {
    username: user.username,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  });
}

export async function update(user) {
  await http.put(`${apiEndpoint}/${user.id}`, {
    username: user.username,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  });
  //await login(user.username, user.password);
}

export function updatePassword(id, user) {
  return http.put(`${apiEndpoint}/${id}`, {
    password: user.password,
  });
}

export function getUsersList() {
  return http.get(apiEndpoint);
}

export function getUser(id) {
  return http.get(`${apiEndpoint}/${id}`);
}
