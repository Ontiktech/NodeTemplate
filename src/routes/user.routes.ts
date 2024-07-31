import express from 'express';
import {
  createCompany,
  getCompany,
  getUser,
} from '../controllers/user.controller';
import { verifyToken } from '../utils/jwt.utils';

const router = express.Router();

// Define routes
router.get('/', getUser);

router.post('/company', createCompany);
router.get('/company', getCompany);

export { router };
