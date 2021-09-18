import http from "./httpService";
import { apiUrl } from "../config.json";
import { getIngredientsByRecipe } from "./ingredientsService";
import { getCurrentUser } from "./authService";

const endPoint = "shopping_items";

function getUrl(uri) {
  return `${apiUrl}/${endPoint}/${uri}`;
}

export function getAllShoppingItems(username) {
  return http.get(getUrl(`items/all/${username}`));
}

export function getTotalCost(username) {
  return http.get(getUrl(`items/total/${username}`));
}

export function saveShoppingItem(shoppingItem) {
  if (shoppingItem.id) {
    const body = { ...shoppingItem };
    delete body.id;

    return http.put(getUrl(shoppingItem.id), body);
  }
  return http.post(`${apiUrl}/${endPoint}`, shoppingItem);
}

export function deleteShoppingItem(id) {
  return http.delete(getUrl(id));
}

export function deleteAllShoppingItemsByUser(username) {
  return http.delete(getUrl(`/items/${username}`));
}

export async function AddShoppingItemsFromRecipe(recipeId) {
  try {
    const result = await getIngredientsByRecipe(recipeId);
    for (const ing of result) {
      let item = {};
      item.ingredientName = ing.ingredientName;
      item.measure = ing.measure;
      item.qty = ing.qty;
      item.picked = false;
      item.shopping_list_date = new Date().toDateString();
      item.username = getCurrentUser();
      item.cost = 0;
      await saveShoppingItem(item);
    }
  } catch (e) {
    console.log("ERROR>>>", e);
    return false;
  } finally {
    return true;
  }
}
