import axios from "./axiosInstance";

export const listUsers = async () => {
  const res = await axios.get("/users");
  return res.data;
};

export const updateUserRole = async (userId, role) => {
  const res = await axios.put(`/users/${userId}/role`, { role });
  return res.data;
};

export const deleteUser = async (userId) => {
  const res = await axios.delete(`/users/${userId}`);
  return res.data;
};
