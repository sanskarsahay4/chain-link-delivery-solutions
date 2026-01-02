import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export default function OrganizationDashboard() {
  const [rides, setRides] = useState([]);
  const [rideData, setRideData] = useState({ pickupLat: "", pickupLong: "", dropLat: "", dropLong: "" });
  const API_KEY = "YOUR_ORGANIZATION_API_KEY"; // replace with your actual API key

  // Fetch rides submitted by this organization
  const fetchOrganizationRides = async () => {
    try {
      const res = await axios.get(`${API_BASE}/organization/rides`, {
        headers: { "x-api-key": API_KEY },
      });
      setRides(res.data);
    } catch (err) {
      console.error("Failed to fetch organization rides:", err);
    }
  };

  // Submit a new ride
  const handleSubmitRide = async () => {
    try {
      await axios.post(`${API_BASE}/organization/rides`, rideData, {
        headers: { "x-api-key": API_KEY },
      });
      alert("Ride submitted successfully!");
      setRideData({ pickupLat: "", pickupLong: "", dropLat: "", dropLong: "" });
      fetchOrganizationRides(); // refresh the list
    } catch (err) {
      console.error("Failed to submit ride:", err);
      alert("Failed to submit ride");
    }
  };

  useEffect(() => {
    fetchOrganizationRides();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">🤝 Organization Dashboard</h2>

      {/* Submit Ride Form */}
      <div className="mb-4 border p-4 rounded">
        <h3 className="font-bold mb-2">Submit a Ride</h3>
        <input
          type="number"
          placeholder="Pickup Lat"
          value={rideData.pickupLat}
          onChange={(e) => setRideData({ ...rideData, pickupLat: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Pickup Long"
          value={rideData.pickupLong}
          onChange={(e) => setRideData({ ...rideData, pickupLong: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Drop Lat"
          value={rideData.dropLat}
          onChange={(e) => setRideData({ ...rideData, dropLat: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Drop Long"
          value={rideData.dropLong}
          onChange={(e) => setRideData({ ...rideData, dropLong: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleSubmitRide}
          className="bg-purple-600 text-white p-2 rounded mt-2"
        >
          Submit Ride
        </button>
      </div>

      {/* List Organization Rides */}
      <div>
        <h3 className="font-bold mb-2">Your Submitted Rides</h3>
        {rides.length === 0 ? (
          <p>No rides submitted yet.</p>
        ) : (
          <ul className="list-disc pl-5">
            {rides.map((r) => (
              <li key={r.id}>
                Ride #{r.id}: {r.pickupLat}, {r.pickupLong} → {r.dropLat}, {r.dropLong} | Status: {r.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
