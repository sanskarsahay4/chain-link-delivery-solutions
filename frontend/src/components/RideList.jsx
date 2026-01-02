import React, { useEffect, useState } from 'react';
import { getRides, assignRide, updateRideStatus } from '../services/api';

const RideList = () => {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        const res = await getRides();
        setRides(res.data);
    };

    const handleAssign = async (rideId) => {
        await assignRide(rideId);
        fetchRides();
    };

    const handleComplete = async (rideId) => {
        await updateRideStatus(rideId, 'COMPLETED');
        fetchRides();
    };

    return (
        <div>
            <h2>Rides</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>Status</th><th>Driver</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rides.map(ride => (
                        <tr key={ride.id}>
                            <td>{ride.id}</td>
                            <td>{ride.status}</td>
                            <td>{ride.driverId || '-'}</td>
                            <td>
                                {ride.status === 'PENDING' && <button onClick={() => handleAssign(ride.id)}>Assign</button>}
                                {ride.status === 'ASSIGNED' && <button onClick={() => handleComplete(ride.id)}>Complete</button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RideList;
