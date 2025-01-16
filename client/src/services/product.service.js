import api from "./api";
const API_URL = "";

const getAllProduct = async () => {
  // http://localhost:5173/products
  return await api.get(`${API_URL}/products.json`);
};

const ProductService = {
  getAllProduct,
};

export default ProductService;
