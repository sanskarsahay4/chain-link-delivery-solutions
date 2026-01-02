import React, { useEffect, useState } from "react";
import { getAssignedRides, updateLocation } from "../../api/driver.api";

export default function DriverDashboard() {
  const [rides, setRides] = useState([]);
  const [status, setStatus] = useState("AVAILABLE");
  const [location, setLocation] = useState({ lat: "", long: "" });

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const data = await getAssignedRides();
      setRides(data);
    } catch (err) {
      console.error("Failed to fetch rides:", err);
    }
  };

  const handleUpdateLocation = async () => {
    try {
      await updateLocation(location.lat, location.long, status);
      alert("Location & status updated!");
    } catch (err) {
      console.error("Failed to update location:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">🧑‍✈️ Driver Dashboard</h2>

      <div className="mb-4 border p-4 rounded">
        <h3 className="font-bold mb-2">Update Location & Status</h3>
        <input
          type="number"
          placeholder="Latitude"
          value={location.lat}
          onChange={(e) => setLocation({ ...location, lat: e.target.value })}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="number"
          placeholder="Longitude"
          value={location.long}
          onChange={(e) => setLocation({ ...location, long: e.target.value })}
          className="border p-2 mr-2 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded mr-2"
        >
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="BUSY">BUSY</option>
        </select>
        <button onClick={handleUpdateLocation} className="bg-blue-600 text-white p-2 rounded">
          Update
        </button>
      </div>

      <div>
        <h3 className="font-bold mb-2">Assigned Rides</h3>
        {rides.length === 0 ? (
          <p>No rides assigned</p>
        ) : (
          <ul className="list-disc pl-5">
            {rides.map((ride) => (
              <li key={ride.id}>
                Ride #{ride.id}: {ride.pickupLat},{ride.pickupLong} → {ride.dropLat},{ride.dropLong} | Status: {ride.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// import React from "react";

// export default function DriverDashboard() {
//   return <h2 className="p-4">🧑‍✈️ Driver Dashboard</h2>;
// }

// import { useEffect, useState, useContext } from "react";
// import { getAssignedRides, updateLocation, updateRideStatus } from "../../api/driver.api";
// import { AuthContext } from "../../context/AuthContext";

// const DriverDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const [rides, setRides] = useState([]);
//   const [status, setStatus] = useState("AVAILABLE");

//   // Load rides on mount
//   useEffect(() => {
//     loadRides();
//     updateDriverLocation();
//     const interval = setInterval(updateDriverLocation, 30000); // auto-update location
//     return () => clearInterval(interval);
//   }, []);

//   const loadRides = async () => {
//     try {
//       const data = await getAssignedRides();
//       setRides(data);
//     } catch (err) {
//       console.error("Failed to load rides:", err);
//     }
//   };

//   const updateDriverLocation = async () => {
//     if (!navigator.geolocation) return;
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       try {
//         await updateLocation({
//           currentLat: position.coords.latitude,
//           currentLong: position.coords.longitude,
//           status,
//         });
//       } catch (err) {
//         console.error("Location update failed:", err);
//       }
//     });
//   };

//   const handleStatusChange = async (e) => {
//     setStatus(e.target.value);
//     await updateDriverLocation();
//   };

//   const handleRideComplete = async (rideId) => {
//     try {
//       await updateRideStatus(rideId, "COMPLETED");
//       loadRides();
//     } catch (err) {
//       console.error("Failed to update ride status:", err);
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome, {user?.name}</h1>
//       <label>
//         Status:
//         <select value={status} onChange={handleStatusChange}>
//           <option value="AVAILABLE">AVAILABLE</option>
//           <option value="BUSY">BUSY</option>
//         </select>
//       </label>

//       <h2>Assigned Rides</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Ride ID</th>
//             <th>Pickup</th>
//             <th>Drop</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rides.map((ride) => (
//             <tr key={ride.id}>
//               <td>{ride.id}</td>
//               <td>{ride.pickupLat}, {ride.pickupLong}</td>
//               <td>{ride.dropLat}, {ride.dropLong}</td>
//               <td>{ride.status}</td>
//               <td>
//                 {ride.status !== "COMPLETED" && (
//                   <button onClick={() => handleRideComplete(ride.id)}>Mark Completed</button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DriverDashboard;
