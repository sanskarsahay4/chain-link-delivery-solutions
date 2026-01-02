import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Ride = sequelize.define('Ride', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  organizationId: { type: DataTypes.INTEGER, allowNull: true },
  driverId: { type: DataTypes.INTEGER, allowNull: true },
  pickupLat: { type: DataTypes.FLOAT, allowNull: false },
  pickupLong: { type: DataTypes.FLOAT, allowNull: false },
  dropLat: { type: DataTypes.FLOAT, allowNull: false },
  dropLong: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.ENUM('PENDING','ASSIGNED','IN_PROGRESS','COMPLETED'), defaultValue: 'PENDING' }
}, {
  tableName: 'rides',
  timestamps: true
});

export default Ride;
