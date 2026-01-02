// src/routes/ride.routes.js
import express from 'express';
import { createRide, assignRide, updateStatus, getAll } from '../controllers/ride.controller.js';
import { requireLogin } from '../middleware/auth.middleware.js';
import checkAccess from '../middleware/role.guard.js';
import validate from '../middleware/validate.middleware.js'; // import validate middleware
import { createRideSchema, updateRideStatusSchema } from '../validations/ride.validation.js'; // import schemas

const router = express.Router();

// Create ride with validation
router.post(
  '/',
  requireLogin,
  checkAccess('ride', 'create'),
  validate(createRideSchema),   // <-- validate request body
  createRide
);

// Assign ride
router.post(
  '/:id/assign',
  requireLogin,
  checkAccess('ride', 'assign'),
  assignRide
);

// Update ride status with validation
router.put(
  '/:id/status',
  requireLogin,
  checkAccess('ride', 'updateStatus'),
  validate(updateRideStatusSchema),  // <-- validate status payload
  updateStatus
);

// View all rides
router.get(
  '/',
  requireLogin,
  checkAccess('ride', 'viewAll'),
  getAll
);

export default router;

// // src/routes/ride.routes.js
// import express from 'express';
// import { createRide, assignRide, updateStatus, getAll } from '../controllers/ride.controller.js';
// import { requireLogin } from '../middleware/auth.middleware.js';
// import checkAccess from '../middleware/role.guard.js';

// const router = express.Router();

// router.post('/', requireLogin, checkAccess('ride', 'create'), createRide);
// router.post('/:id/assign', requireLogin, checkAccess('ride', 'assign'), assignRide);
// router.put('/:id/status', requireLogin, checkAccess('ride', 'updateStatus'), updateStatus);
// router.get('/', requireLogin, checkAccess('ride', 'viewAll'), getAll);

// export default router;
