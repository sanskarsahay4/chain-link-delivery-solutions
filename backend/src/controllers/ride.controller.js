// src/controllers/ride.controller.js
import { Ride, User } from '../models/index.js';

// Haversine distance (km)
const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (x) => x * Math.PI / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// CREATE RIDE
export const createRide = async (req, res) => {
  try {
    const { pickupLat, pickupLong, dropLat, dropLong, organizationId } = req.body;
    const orgId = organizationId || req.user?.organizationId || null;

    const ride = await Ride.create({
      pickupLat,
      pickupLong,
      dropLat,
      dropLong,
      organizationId: orgId,
      status: 'PENDING', // default
    });

    res.json(ride);
  } catch (err) {
    console.error('createRide', err);
    res.status(500).json({ message: 'Create ride failed', error: err.message });
  }
};

// ASSIGN NEAREST DRIVER
export const assignRide = async (req, res) => {
  try {
    const ride = await Ride.findByPk(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    // Get only available drivers
    const drivers = await User.findAll({ where: { role: 'DRIVER', status: 'AVAILABLE' } });

    if (!drivers || drivers.length === 0)
      return res.status(400).json({ message: 'No available drivers nearby' });

    // Find nearest driver
    let nearest = null;
    let minD = Infinity;

    for (const d of drivers) {
      if (d.currentLat == null || d.currentLong == null) continue; // skip drivers without location
      const dist = haversine(d.currentLat, d.currentLong, ride.pickupLat, ride.pickupLong);
      if (dist < minD) {
        minD = dist;
        nearest = d;
      }
    }

    if (!nearest) return res.status(400).json({ message: 'No driver with location found' });

    // Assign driver & update status
    ride.driverId = nearest.id;
    ride.status = 'ASSIGNED';
    await ride.save();

    nearest.status = 'BUSY';
    await nearest.save();

    res.json({
      ride,
      driver: { id: nearest.id, name: nearest.name, currentLat: nearest.currentLat, currentLong: nearest.currentLong },
    });
  } catch (err) {
    console.error('assignRide', err);
    res.status(500).json({ message: 'Assign ride failed', error: err.message });
  }
};

// UPDATE RIDE STATUS
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const ride = await Ride.findByPk(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    ride.status = status;
    await ride.save();

    // If ride completed, mark driver available again
    if (ride.driverId && status === 'COMPLETED') {
      const driver = await User.findByPk(ride.driverId);
      if (driver) {
        driver.status = 'AVAILABLE';
        await driver.save();
      }
    }

    res.json(ride);
  } catch (err) {
    console.error('updateStatus', err);
    res.status(500).json({ message: 'Update status failed', error: err.message });
  }
};

// GET ALL RIDES
export const getAll = async (req, res) => {
  try {
    const rides = await Ride.findAll();
    res.json(rides);
  } catch (err) {
    console.error('getAll', err);
    res.status(500).json({ message: 'Failed', error: err.message });
  }
};

// // src/controllers/ride.controller.js import { Ride, User } from '../models/index.js'; // helper distance (approx) const distance = (lat1, lon1, lat2, lon2) => { return Math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2); }; export const createRide = async (req, res) => { try { const { pickupLat, pickupLong, dropLat, dropLong, organizationId } = req.body; const orgId = organizationId || req.user?.organizationId || null; const ride = await Ride.create({ pickupLat, pickupLong, dropLat, dropLong, organizationId: orgId }); res.json(ride); } catch (err) { console.error('createRide', err); res.status(500).json({ message: 'Create ride failed', error: err.message }); } }; export const assignRide = async (req, res) => { try { const ride = await Ride.findByPk(req.params.id); if (!ride) return res.status(404).json({ message: 'Ride not found' }); // find available drivers (simple: users with role DRIVER) const drivers = await User.findAll({ where: { role: 'DRIVER' } }); if (!drivers || drivers.length === 0) return res.status(400).json({ message: 'No available drivers' }); // find nearest driver let nearest = null; let minD = Infinity; for (const d of drivers) { const dLat = d.currentLat || 0; const dLong = d.currentLong || 0; const dist = distance(dLat, dLong, ride.pickupLat, ride.pickupLong); if (dist < minD) { minD = dist; nearest = d; } } if (!nearest) return res.status(400).json({ message: 'No driver found' }); ride.driverId = nearest.id; ride.status = 'ASSIGNED'; await ride.save(); res.json({ ride, driver: { id: nearest.id, name: nearest.name } }); } catch (err) { console.error('assignRide', err); res.status(500).json({ message: 'Assign ride failed', error: err.message }); } }; export const updateStatus = async (req, res) => { try { const { status } = req.body; const ride = await Ride.findByPk(req.params.id); if (!ride) return res.status(404).json({ message: 'Ride not found' }); ride.status = status; await ride.save(); res.json(ride); } catch (err) { console.error('updateStatus', err); res.status(500).json({ message: 'Update status failed', error: err.message }); } }; export const getAll = async (req, res) => { try { const rides = await Ride.findAll(); res.json(rides); } catch (err) { res.status(500).json({ message: 'Failed', error: err.message }); } };