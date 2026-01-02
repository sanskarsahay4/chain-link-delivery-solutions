const { Ride, User } = require('../models/index');

const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (x) => x * Math.PI / 180;
  const R = 6371; 
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

exports.createRide = async (data, user) => {
  const ride = await Ride.create({
    pickupLat: data.pickupLat,
    pickupLong: data.pickupLong,
    dropLat: data.dropLat,
    dropLong: data.dropLong,
    organizationId: data.organizationId || user.organizationId || null
  });
  return ride;
};

exports.assignRide = async (rideId) => {
  const ride = await Ride.findByPk(rideId);
  if (!ride) throw new Error('Ride not found');

  const drivers = await User.findAll({ where: { role: 'DRIVER', status: 'AVAILABLE' } });
  if (!drivers.length) throw new Error('No available drivers');

  let nearest = null;
  let minD = Infinity;
  for (const d of drivers) {
    const dist = haversine(d.currentLat, d.currentLong, ride.pickupLat, ride.pickupLong);
    if (dist < minD) { minD = dist; nearest = d; }
  }

  if (!nearest) throw new Error('No nearby drivers found');

  ride.driverId = nearest.id;
  ride.status = 'ASSIGNED';
  await ride.save();

  nearest.status = 'BUSY';
  await nearest.save();

  return { ride, driver: nearest };
};
