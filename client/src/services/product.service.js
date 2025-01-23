import api from "./api";
const API_URL = "/product";

const getAllProducts = async () => {
  // http://localhost:5173/products
  return await api.get(`${API_URL}`);
};

const ProductService = {
  getAllProducts,
};

export default ProductService;
