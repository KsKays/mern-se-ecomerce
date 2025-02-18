import api from "./api";
const API_URL = "/product";

const getAllProducts = async () => {
  return await api.get(`${API_URL}`);
};

const addProduct = async (product) => {
  return await api.post(`${API_URL}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateProduct = async (id, product) => {
  return await api.put(`${API_URL}/${id}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteProduct = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const getProductById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const ProductService = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById
};

export default ProductService;