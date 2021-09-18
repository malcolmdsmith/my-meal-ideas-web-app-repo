import http from "./httpService";
import { apiUrl } from "../config.json";
import { deleteS3Image } from "./amplify";

const endPoint = "recipe_categories";

function getUrl(uri) {
  return `${apiUrl}/${endPoint}/${uri}`;
}

export function getCategoryImage(categoryName) {
  return http.get(getUrl(`category/${categoryName}`));
}

export function getCategoryNames() {
  return http.get(getUrl(`list`));
}

export function getCategories() {
  return http.get(`${apiUrl}/${endPoint}`);
}

export async function saveCategory(category) {
  if (category.id) {
    const body = { ...category };
    delete body.id;

    return http.put(getUrl(category.id), body);
  }
  try {
    await http.post(`${apiUrl}/${endPoint}`, category);
  } catch (err) {
    if (err.response.data.message === "Category with the name already exists.")
      return err.response.data.message;
    else throw err;
  }
}

export async function deleteCategory(name) {
  const catimage = await getCategoryImage(name);
  await deleteS3Image(catimage.image);
  return http.delete(getUrl(name));
}
