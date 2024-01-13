import httpService from "./httpService";

export function createProduct(product) {
  return httpService.post("/products", product);
}

export function getAllProducts() {
  return httpService.get("/products", {});
}

export function getAllProductsForGuest() {
  return httpService.get("/products/guest", {});
}

export function getProduct(id) {
  return httpService.get(`/products/${id}`);
}

export function deleteProduct(id) {
  return httpService.delete(`/products/${id}`);
}

export function updateProduct(id, product) {
  return httpService.put(`/products/${id}`, product);
}

const productService = {
  createProduct,
  getAllProductsForGuest,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
