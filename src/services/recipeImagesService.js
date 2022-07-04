import http from "./httpService";
import { apiUrl } from "../config.json";
import { getS3Image, deleteS3Image } from "../services/amplify";

function getUrl(uri) {
  return `${apiUrl}/recipe_images/${uri}`;
}

export async function getRecipeImage(id) {
  const image = await http.get(getUrl(`${id}`));
  return image;
}

export async function getRecipeImages(recipeId) {
  const images = await http.get(getUrl(`recipe/${recipeId}`));
  return await getImageUrls(images);
}

export async function getRecipeImagesNoCategory(recipeId) {
  const images = await http.get(getUrl(`recipe/nocategory/${recipeId}`));
  return await getImageUrls(images);
}

export async function getImages(keywords, offset, imageCount) {
  const data = await http.get(
    getUrl(`category/${keywords}?offset=${offset}&imageCount=${imageCount}`)
  );
  await getImageUrls(data.images);

  return data;
}

export function setMealOFTheWeek(image_id) {
  return http.put(getUrl(`mealOfTheWeek/${image_id}`));
}

export async function getMealOfTheWeek() {
  const image = await http.get(getUrl(`mealOfTheWeek`));
  if (image === null) throw Error("Cannot find image for meal of the week!");

  const images = [];
  images.push(image);
  return await getImageUrls(images);
}

async function getImageUrls(images) {
  for (const image of images) {
    const imgUrl = await getS3Image(image.image);
    image.imageUrl = imgUrl.split("?")[0];
  }
  return images;
}

export function saveRecipeImage(image) {
  if (image.image_id) {
    const body = { ...image };
    delete body.image_id;

    return http.put(getUrl(image.image_id), body);
  }
  return http.post(`${apiUrl}/recipe_images`, image);
}

export async function deleteRecipeImage(image) {
  await deleteS3Image(image.recipe_image);
  return http.delete(getUrl(image.image_id));
}
