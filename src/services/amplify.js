import { Storage } from "aws-amplify";
import axios from "axios";
import { getJwt } from "./authService";

export async function uploadImageS3(key, file) {
  try {
    delete axios.defaults.headers.common["Authorization"];
    await Storage.put(key, file, { level: "public", contenType: file.type });
    axios.defaults.headers.common["Authorization"] = `Bearer ${getJwt()}`;
  } catch (e) {
    console.log("ERROR::", e);
  }
}

export async function getS3Image(key) {
  delete axios.defaults.headers.common["Authorization"];
  const image = await Storage.get(key, { level: "public" });
  axios.defaults.headers.common["Authorization"] = `Bearer ${getJwt()}`;
  return image;
}

export async function deleteS3Image(key) {
  try {
    delete axios.defaults.headers.common["Authorization"];
    await Storage.remove(key);
    axios.defaults.headers.common["Authorization"] = `Bearer ${getJwt()}`;
  } catch (e) {
    console.log("ERROR::", e);
  }
}
