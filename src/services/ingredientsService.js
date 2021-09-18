import http from "./httpService";
import { apiUrl } from "../config.json";

const endPoint = "ingredients";

function getUrl(uri) {
  return `${apiUrl}/${endPoint}/${uri}`;
}

export async function saveIngredient(ingredient) {
  if (ingredient.id) {
    const body = { ...ingredient };
    delete body.id;

    return http.put(getUrl(ingredient.id), body);
  }
  try {
    return await http.post(`${apiUrl}/${endPoint}`, ingredient);
  } catch (err) {
    return err;
  }
}

export function getIngredientsByRecipe(recipeId) {
  return http.get(getUrl(`/recipe/${recipeId}`));
}

export function deleteIngredient(id) {
  return http.delete(getUrl(id));
}
