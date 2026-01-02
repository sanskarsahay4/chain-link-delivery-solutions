import { useState, useEffect } from "react";
import { submitRide, listPartnerRides } from "../../api/partner.api";

const ORG_API_KEY = "YOUR_ORG_API_KEY"; // Replace with real API key

const OrganizationDashboard = () => {
  const [rides, setRides] = useState([]);
  const [pickupLat, setPickupLat] = useState("");
  const [pickupLong, setPickupLong] = useState("");
  const [dropLat, setDropLat] = useState("");
  const [dropLong, setDropLong] = useState("");

  useEffect(() => { loadRides(); }, []);

  const loadRides = async () => {
    try {
      const data = await listPartnerRides(ORG_API_KEY);
      setRides(data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitRide({ pickupLat, pickupLong, dropLat, dropLong }, ORG_API_KEY);
      loadRides();
      setPickupLat(""); setPickupLong(""); setDropLat(""); setDropLong("");
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h1>Organization Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Pickup Lat" value={pickupLat} onChange={e=>setPickupLat(e.target.value)} required/>
        <input placeholder="Pickup Long" value={pickupLong} onChange={e=>setPickupLong(e.target.value)} required/>
        <input placeholder="Drop Lat" value={dropLat} onChange={e=>setDropLat(e.target.value)} required/>
        <input placeholder="Drop Long" value={dropLong} onChange={e=>setDropLong(e.target.value)} required/>
        <button type="submit">Submit Ride</button>
      </form>

      <h2>Submitted Rides</h2>
      <table>
        <thead><tr><th>ID</th><th>Pickup</th><th>Drop</th><th>Status</th></tr></thead>
        <tbody>
          {rides.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.pickupLat}, {r.pickupLong}</td>
              <td>{r.dropLat}, {r.dropLong}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrganizationDashboard;
