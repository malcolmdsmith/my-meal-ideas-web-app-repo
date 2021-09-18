import http from "./httpService";
import { apiUrl } from "../config.json";
import { deleteS3Image } from "./amplify";
import { getRecipeImagesNoCategory } from "./recipeImagesService";

const endPoint = "recipes";

function getUrl(uri) {
  return `${apiUrl}/${endPoint}/${uri}`;
}

export function getRecipe(recipeId) {
  return http.get(getUrl(`${recipeId}`));
}

export async function saveRecipe(recipe) {
  if (recipe.id) {
    const body = { ...recipe };
    delete body.id;

    return http.put(getUrl(recipe.id), body);
  }
  try {
    return await http.post(`${apiUrl}/${endPoint}`, recipe);
  } catch (err) {
    if (err.response.data.message === "Recipe with the name already exists.")
      return err.response.data.message;
    else throw err;
  }
}

export async function deleteRecipe(recipeId) {
  const images = await getRecipeImagesNoCategory(recipeId);

  for (const image of images) {
    console.log("key...", image.image);
    await deleteS3Image(image.image);
  }

  return await http.delete(getUrl(recipeId));
}

export function getSourceOptions() {
  const options = [];

  options.push({ optionName: "Cookbook" });
  options.push({ optionName: "Manual Entry" });
  options.push({ optionName: "Meal Idea" });
  options.push({ optionName: "Photo" });
  options.push({ optionName: "Takeaway" });
  options.push({ optionName: "Web Link" });

  return options;
}

export function getRatings() {
  const ratings = [];

  ratings.push({ rating: "0" });
  ratings.push({ rating: "0.5" });
  ratings.push({ rating: "1.0" });
  ratings.push({ rating: "1.5" });
  ratings.push({ rating: "2.0" });
  ratings.push({ rating: "2.5" });
  ratings.push({ rating: "3.0" });
  ratings.push({ rating: "3.5" });
  ratings.push({ rating: "4.0" });
  ratings.push({ rating: "4.5" });
  ratings.push({ rating: "5.0" });

  return ratings;
}
