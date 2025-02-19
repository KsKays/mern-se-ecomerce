import api from "./api";
const API_URL = "/user";
const signJwt = async (email) => {
  return await api.post(`${API_URL}/sign`, { email });
};

const addUser = async (email) => {
  return await api.post(`${API_URL}/`, { email });
};
const UserServices = {
  signJwt,
  addUser,
};

export default UserServices;
