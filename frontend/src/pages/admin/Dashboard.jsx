import React, { useEffect, useState } from "react";
import { listAllRides, createRide } from "../../api/ride.api";

export default function AdminDashboard() {
  const [rides, setRides] = useState([]);
  const [rideData, setRideData] = useState({ pickupLat: "", pickupLong: "", dropLat: "", dropLong: "" });

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const data = await listAllRides();
      setRides(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateRide = async () => {
    try {
      await createRide(rideData);
      alert("Ride created!");
      fetchRides();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">👨‍💼 Admin Dashboard</h2>

      <div className="mb-4 border p-4 rounded">
        <h3 className="font-bold mb-2">Create Ride</h3>
        <input type="number" placeholder="Pickup Lat" className="border p-2 rounded mr-2"
          value={rideData.pickupLat} onChange={(e)=>setRideData({...rideData, pickupLat:e.target.value})} />
        <input type="number" placeholder="Pickup Long" className="border p-2 rounded mr-2"
          value={rideData.pickupLong} onChange={(e)=>setRideData({...rideData, pickupLong:e.target.value})} />
        <input type="number" placeholder="Drop Lat" className="border p-2 rounded mr-2"
          value={rideData.dropLat} onChange={(e)=>setRideData({...rideData, dropLat:e.target.value})} />
        <input type="number" placeholder="Drop Long" className="border p-2 rounded mr-2"
          value={rideData.dropLong} onChange={(e)=>setRideData({...rideData, dropLong:e.target.value})} />
        <button onClick={handleCreateRide} className="bg-green-600 text-white p-2 rounded">Create Ride</button>
      </div>

      <div>
        <h3 className="font-bold mb-2">All Rides</h3>
        <ul className="list-disc pl-5">
          {rides.map(r => (
            <li key={r.id}>Ride #{r.id}: {r.pickupLat},{r.pickupLong} → {r.dropLat},{r.dropLong} | Status: {r.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
// import React from "react";

// export default function AdminDashboard() {
//   return <h2 className="p-4">👨‍💼 Admin Dashboard</h2>;
// }

// import { useEffect, useState } from "react";
// import { listUsers, updateUserRole, deleteUser } from "../../api/user.api";
// import { listRides, assignRide, updateRideStatus } from "../../api/ride.api";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [rides, setRides] = useState([]);

//   useEffect(() => {
//     loadUsers();
//     loadRides();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       const data = await listUsers();
//       setUsers(data);
//     } catch (err) { console.error(err); }
//   };

//   const loadRides = async () => {
//     try {
//       const data = await listRides();
//       setRides(data);
//     } catch (err) { console.error(err); }
//   };

//   const handleRoleChange = async (userId, newRole) => {
//     try {
//       await updateUserRole(userId, newRole);
//       loadUsers();
//     } catch (err) { console.error(err); }
//   };

//   const handleAssignRide = async (rideId) => {
//     try {
//       await assignRide(rideId);
//       loadRides();
//     } catch (err) { console.error(err); }
//   };

//   const handleRideStatus = async (rideId, status) => {
//     try {
//       await updateRideStatus(rideId, status);
//       loadRides();
//     } catch (err) { console.error(err); }
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>

//       <h2>Users</h2>
//       <table>
//         <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
//         <tbody>
//           {users.map(u => (
//             <tr key={u.id}>
//               <td>{u.id}</td>
//               <td>{u.name}</td>
//               <td>{u.email}</td>
//               <td>{u.role}</td>
//               <td>
//                 <select onChange={(e) => handleRoleChange(u.id, e.target.value)} value={u.role}>
//                   <option value="DRIVER">DRIVER</option>
//                   <option value="ADMIN">ADMIN</option>
//                   <option value="ORGANIZATION">ORGANIZATION</option>
//                   <option value="SUPERADMIN">SUPERADMIN</option>
//                 </select>
//                 <button onClick={() => deleteUser(u.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>Rides</h2>
//       <table>
//         <thead><tr><th>ID</th><th>Pickup</th><th>Drop</th><th>Status</th><th>Action</th></tr></thead>
//         <tbody>
//           {rides.map(r => (
//             <tr key={r.id}>
//               <td>{r.id}</td>
//               <td>{r.pickupLat}, {r.pickupLong}</td>
//               <td>{r.dropLat}, {r.dropLong}</td>
//               <td>{r.status}</td>
//               <td>
//                 <button onClick={() => handleAssignRide(r.id)}>Assign Ride</button>
//                 <button onClick={() => handleRideStatus(r.id, "IN_PROGRESS")}>In Progress</button>
//                 <button onClick={() => handleRideStatus(r.id, "COMPLETED")}>Completed</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDashboard;
