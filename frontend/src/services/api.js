import axios from 'axios';
const API_URL = 'http://localhost:5000';

export const createRide = (ride) => axios.post(`${API_URL}/rides`, ride);
export const assignRide = (rideId) => axios.post(`${API_URL}/rides/${rideId}/assign`);
export const updateRideStatus = (rideId, status) => axios.put(`${API_URL}/rides/${rideId}/status`, { status });
export const getRides = () => axios.get(`${API_URL}/rides`);
