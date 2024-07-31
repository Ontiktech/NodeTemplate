import express, { Request, Response, NextFunction } from 'express';
import { authenticate } from '../controllers/auth.controller';
import { validateBody, validateRequestBody } from '../utils/validatiion.utils';
import {
  RegistrationRequestSchema,
  registrationReqeustSchema,
} from '../schema/user.schema';
const router = express.Router();

// Define routes
router.post(
  '/authenticate',
  validateRequestBody(registrationReqeustSchema),
  authenticate,
);

export { router };
