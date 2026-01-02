import sequelize from '../config/db.js';

// import models
import User from './user.model.js';
import Organization from './organization.model.js';
import Ride from './ride.model.js';

// Initialize associations
Organization.hasMany(User, { foreignKey: 'organizationId' });
User.belongsTo(Organization, { foreignKey: 'organizationId' });

Organization.hasMany(Ride, { foreignKey: 'organizationId' });
Ride.belongsTo(Organization, { foreignKey: 'organizationId' });

User.hasMany(Ride, { foreignKey: 'driverId' });
Ride.belongsTo(User, { as: 'driver', foreignKey: 'driverId' });

export { sequelize, User, Organization, Ride };
