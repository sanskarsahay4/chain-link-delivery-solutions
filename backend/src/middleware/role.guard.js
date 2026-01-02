import PERMISSIONS from '../config/permissions.config.js';

/**
 * checkAccess(resource, action)
 * Usage: router.post('/', requireLogin, checkAccess('ride','create'), controller.create)
 */
const checkAccess = (resource, action) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const resourcePerms = PERMISSIONS[resource];
    if (!resourcePerms) return res.status(500).json({ message: 'Resource permissions not defined' });

    const allowedRoles = resourcePerms[action];
    if (!allowedRoles) return res.status(500).json({ message: 'Action permission not defined' });

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }

    next();
  };
};

export default checkAccess;
