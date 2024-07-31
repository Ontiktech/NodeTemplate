import express from 'express';
import { authenticate } from '../controllers/auth.controller';
import { validateRequestBody } from '../utils/validatiion.utils';
import {
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
