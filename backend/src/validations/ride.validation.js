// src/validations/ride.validation.js
import Joi from 'joi';

// Create ride schema
export const createRideSchema = Joi.object({
  pickupLat: Joi.number().required(),
  pickupLong: Joi.number().required(),
  dropLat: Joi.number().required(),
  dropLong: Joi.number().required(),
  organizationId: Joi.number().optional()
});

// Update ride status schema
export const updateRideStatusSchema = Joi.object({
  status: Joi.string().valid('PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED').required()
});
