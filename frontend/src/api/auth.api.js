
import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // Replace with your backend URL

// Axios instance for authenticated requests (session-based)
const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Important for session cookie
});

// Register user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Login user
export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, data, {
      withCredentials: true,
    });
    return response.data; // { user info, JWT if any }
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// import axios from "./axiosInstance";

// export const loginApi = async (email, password) => {
//   const res = await axios.post("/auth/login", { email, password });
//   return res.data;
// };

// export const logoutApi = async () => {
//   const res = await axios.post("/auth/logout");
//   return res.data;
// };

// export const registerApi = async (user) => {
//   const res = await axios.post("/auth/register", user);
//   return res.data;
// };

// export const getProfile = async () => {
//   const res = await axios.get("/auth/profile");
//   return res.data;
// };
