
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const rideAxios = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Create a new ride
export const createRide = async (rideData) => {
  try {
    const response = await rideAxios.post("/rides", rideData);
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Assign ride to nearest driver
export const assignRide = async (rideId) => {
  try {
    const response = await rideAxios.post(`/rides/${rideId}/assign`);
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Update ride status
export const updateRideStatus = async (rideId, status) => {
  try {
    const response = await rideAxios.put(`/rides/${rideId}/status`, { status });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Get all rides (Admin / Organization)
export const listAllRides = async () => {
  try {
    const response = await rideAxios.get("/rides");
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
// import axios from "./axiosInstance";

// export const createRide = async (ride) => {
//   const res = await axios.post("/rides", ride);
//   return res.data;
// };

// export const assignRide = async (rideId) => {
//   const res = await axios.post(`/rides/${rideId}/assign`);
//   return res.data;
// };

// export const updateRideStatus = async (rideId, status) => {
//   const res = await axios.put(`/rides/${rideId}/status`, { status });
//   return res.data;
// };

// export const listRides = async () => {
//   const res = await axios.get("/rides");
//   return res.data;
// };
