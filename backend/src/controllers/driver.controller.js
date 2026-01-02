// src/controllers/driver.controller.js
import User from '../models/user.model.js';

export const updateDriverLocation = async (req, res) => {
  try {
    const { currentLat, currentLong, status } = req.body;

    const driver = await User.findByPk(req.user.id);

    if (!driver || driver.role !== 'DRIVER') {
      return res.status(403).json({ message: 'Only drivers can update location' });
    }

    driver.currentLat = currentLat ?? driver.currentLat;
    driver.currentLong = currentLong ?? driver.currentLong;
    driver.status = status ?? driver.status;

    await driver.save();

    res.json({ message: 'Location updated successfully', driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update location', error: error.message });
  }
};
