import httpService from "./httpService";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

setTokenHeader();

export function setTokenHeader() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}

export function createUser(user) {
  return httpService.post("/users", user);
}

export async function loginUser(credentials) {
  const response = await httpService.post("/auth", credentials);
  localStorage.setItem(TOKEN_KEY, response.data.token);
  setTokenHeader();

  return response;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}
export function addFavoriteProduct(productId) {
  return httpService.post(`/users/favoriteProducts/${productId}`);
}

export function removeFavoriteProduct(productId) {
  return httpService.delete(`/users/favoriteProducts/${productId}`);
}

export function getFavoriteProducts() {
  return httpService.get("/users/favoriteProducts", {});
}

const userService = {
  createUser,
  loginUser,
  logout,
  getJWT,
  getUser,
  addFavoriteProduct,
  removeFavoriteProduct,
  getFavoriteProducts,
};

export default userService;
