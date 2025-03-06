import api from "./api";
const API_URL = "/orders";

const getAllOrder = async () => {
  return await api.get(`${API_URL}`);
};

const OrderService = {
  getAllOrder,
};

export default OrderService;
