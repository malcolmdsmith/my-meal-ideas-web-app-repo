import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

const tokenKey = "token";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    (error.response && error.response.status === 400) ||
    (error.response &&
      error.response.status > 401 &&
      error.response.status < 500);

  if (expectedError) toast.error(error.response.data.message);
  else {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

axios.interceptors.response.use(undefined, (err) => {
  const error = err.response;
  console.info("error status...", error.status);
  // if error is 401
  if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
    // request for a new token
    // update the error config with new token
    error.config.__isRetryRequest = true;
    try {
      const token = localStorage.getItem(tokenKey);
      console.info("got token...", token);
      console.info("header token...", axios.defaults.headers.common);
      //error.config.headers.token = token;
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      return axios(error.config);
    } catch (e) {
      console.info("couldnt get token...");
      window.location = "/login";
    }
  }
});

axios.interceptors.response.use(function (response) {
  return response.data;
});

export function checkUserLoggedIn() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    console.info("jwt...", jwt);
    setJwt(jwt);
    return true;
  } catch (e) {
    return false;
  }
}

function setJwt(jwt) {
  axios.defaults.headers.common = { Authorization: `Bearer ${jwt}` };
}

export function getHeader() {
  return axios.defaults.headers.common["Authorization"];
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  getHeader,
};

export default http;
