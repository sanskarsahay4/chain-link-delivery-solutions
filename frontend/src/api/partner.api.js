import axios from "./axiosInstance";

export const submitRide = async (ride, apiKey) => {
  const res = await axios.post("/partner/rides", ride, {
    headers: { "x-api-key": apiKey },
  });
  return res.data;
};

export const listPartnerRides = async (apiKey) => {
  const res = await axios.get("/partner/rides", {
    headers: { "x-api-key": apiKey },
  });
  return res.data;
};
