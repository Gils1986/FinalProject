import httpService from "./httpService";

// {
//     bizName: Joi.string().min(2).max(255).required(),
//     bizDescription: Joi.string().min(2).max(1024).required(),
//     bizAddress: Joi.string().min(2).max(400).required(),
//     bizPhone: Joi.string()
//     .min(9)
//     .max(10)
//     .required()
//     .regex(/^0[2-9]\d{7,8}$/),
//     bizImage: Joi.string().min(11).max(1024),
// }

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
