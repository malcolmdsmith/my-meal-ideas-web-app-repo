import http from "./httpService";
import { apiUrl } from "../config.json";
import { getCurrentUser } from "./authService";

const endPoint = "shopping_lists";

function getUrl(uri) {
  return `${apiUrl}/${endPoint}/${uri}`;
}

export function findOne(owner_id) {
  return http.get(getUrl(`item/findone/${owner_id}`));
}

export function getAllShoppingLists(owner_id, master_list) {
  return http.get(
    getUrl(`lists/all?owner_id=${owner_id}&master_list=${master_list}`)
  );
}

export async function saveShoppingList(item) {
  console.info("saving list: ", item);
  if (item.owner_id === 0) {
    const user = await getCurrentUser();
    item.owner_id = user.id;
  }
  if (item.master_list === 1) item.master_list = true;
  else if (item.master_list === 0) item.master_list = false;

  if (item.id) {
    const body = { ...item };
    delete body.id;

    return http.put(getUrl(item.id), body);
  }
  return http.post(`${apiUrl}/${endPoint}`, item);
}

export function deleteShoppingList(owner_id, shopping_list_name) {
  return http.delete(
    getUrl(`?owner_id=${owner_id}&shopping_list_name=${shopping_list_name}`)
  );
}
