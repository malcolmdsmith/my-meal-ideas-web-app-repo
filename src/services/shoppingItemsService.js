import http from "./httpService";
import { apiUrl } from "../config.json";
import { getIngredientsByRecipe } from "./ingredientsService";
import { getCurrentUser } from "./authService";

const endPoint = "shopping_items";

function getUrl(uri) {
  return `${apiUrl}/${endPoint}/${uri}`;
}

export function getAllShoppingItems(
  owner_id,
  shopping_list_name,
  runClearAndPicked
) {
  return http.get(
    getUrl(
      `items/all?owner_id=${owner_id}&shopping_list_name=${shopping_list_name}&runClearAndPicked=${runClearAndPicked}&master_list=1`
    )
  );
}

export function saveShoppingItem(shoppingItem) {
  if (shoppingItem.picked === 1) shoppingItem.picked = true;
  else if (shoppingItem.picked === 0) shoppingItem.picked = false;
  if (shoppingItem.master_list === 1) shoppingItem.master_list = true;
  else if (shoppingItem.master_list === 0) shoppingItem.master_list = false;

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

export function deleteShoppingItemsByUser(
  owner_id,
  master_list,
  shopping_list_name
) {
  return http.delete(
    getUrl(
      `items/user?owner_id=${owner_id}&master_list=${master_list}&shopping_list_name=${shopping_list_name}`
    )
  );
}

export function clearPickedItems(owner_id, master_list) {
  return http.get(
    getUrl(`clear/picked?owner_id=${owner_id}&master_list=${master_list}`)
  );
}

export async function AddShoppingItemsFromRecipe(recipeId) {
  try {
    const user = getCurrentUser();
    const result = await getIngredientsByRecipe(recipeId);
    for (const ing of result) {
      let item = {};
      item.ingredientName = ing.ingredientName;
      item.measure = ing.measure;
      item.qty = ing.qty;
      item.picked = false;
      item.shopping_list_date = new Date().toDateString();
      item.owner_id = user.id;
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

export async function updateMasterListToShoppingList(shopping_list) {
  const user = await getCurrentUser();
  //console.info("updateMasterListToShoppingList", shopping_list);
  await clearPickedItems(user.id, 1);
  await updateMasterListPicked(user.id, shopping_list);
}

export function updateCost(item) {
  return http.get(
    getUrl(
      `update/cost?owner_id=${item.owner_id}&ingredient=${item.ingredientName}&cost=${item.cost}&id=${item.id}`
    )
  );
}

export function updateMasterListPicked(owner_id, shopping_list) {
  return http.get(
    getUrl(
      `update/picked?owner_id=${owner_id}&shopping_list_name=${shopping_list}`
    )
  );
}

export function findIngredientShoppingList(
  owner_id,
  master_list,
  ingredient,
  shopping_list_name
) {
  return http.get(
    getUrl(
      `item/ingredient?owner_id=${owner_id}&master_list=${master_list}&ingredient=${ingredient}&shopping_list_name=${shopping_list_name}`
    )
  );
}
