import axios from "axios";

const API_BASE = "http://localhost:5000/api";

// Axios instance for driver
const driverAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Update location & status
export const updateLocation = async (currentLat, currentLong, status) => {
  try {
    const response = await driverAxios.put("/driver/location", { currentLat, currentLong, status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get assigned rides
export const getAssignedRides = async () => {
  try {
    const response = await driverAxios.get("/driver/rides");
    return response.data; // array of rides
  } catch (error) {
    throw error.response?.data || error;
  }
};

// import axios from "./axiosInstance";

// export const updateLocation = async (data) => {
//   const res = await axios.put("/driver/location", data);
//   return res.data;
// };

// export const getAssignedRides = async () => {
//   const res = await axios.get("/driver/rides");
//   return res.data;
// };

// export const updateRideStatus = async (rideId, status) => {
//   return await axios.put(`/api/rides/${rideId}/status`, { status });
// };

