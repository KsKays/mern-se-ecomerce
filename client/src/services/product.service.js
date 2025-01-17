import api from "./api";
const API_URL = "/products";

const getAllProduct = async () => {
  // http://localhost:5173/products
  return await api.get(`${API_URL}`);
};

const ProductService = {
  getAllProduct,
};

export default ProductService;
