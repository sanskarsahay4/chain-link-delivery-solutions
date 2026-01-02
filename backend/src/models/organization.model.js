import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Organization = sequelize.define('Organization', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  contactEmail: { type: DataTypes.STRING, allowNull: true },
  apiKey: { type: DataTypes.STRING, unique: true, allowNull: true },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'organizations',
  timestamps: true
});

export default Organization;
