// src/config/permissions.config.js
import ROLES from './roles.config.js';

const PERMISSIONS = {
  ride: {
    create: [ROLES.ORGANIZATION, ROLES.ADMIN, ROLES.SUPERADMIN],
    assign: [ROLES.ADMIN, ROLES.SUPERADMIN],
    updateStatus: [ROLES.DRIVER, ROLES.ADMIN, ROLES.SUPERADMIN],
    viewAll: [ROLES.ADMIN, ROLES.SUPERADMIN],
    viewOwn: [ROLES.DRIVER, ROLES.ORGANIZATION],
  },
  driver: {
    create: [ROLES.ADMIN, ROLES.SUPERADMIN],
    update: [ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.DRIVER],
    viewAll: [ROLES.ADMIN, ROLES.SUPERADMIN],
    viewOwn: [ROLES.DRIVER],
  },
  organization: {
    onboard: [ROLES.SUPERADMIN],
    view: [ROLES.ADMIN, ROLES.SUPERADMIN],
  },
};

export default PERMISSIONS;
