import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('DRIVER','ORGANIZATION','ADMIN','SUPERADMIN'), allowNull: false },
  organizationId: { type: DataTypes.INTEGER, allowNull: true },
  currentLat: { type: DataTypes.FLOAT, allowNull: true },
  currentLong: { type: DataTypes.FLOAT, allowNull: true },
  status: { type: DataTypes.ENUM('AVAILABLE','BUSY'), defaultValue: 'AVAILABLE' }
}, {
  tableName: 'users',
  timestamps: true
});

export default User;
