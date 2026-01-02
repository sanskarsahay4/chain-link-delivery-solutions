import express from 'express';
import { requireLogin } from '../middleware/auth.middleware.js';
import { updateDriverLocation } from '../controllers/driver.controller.js';

const router = express.Router();

router.put('/location', requireLogin, updateDriverLocation);

export default router;
