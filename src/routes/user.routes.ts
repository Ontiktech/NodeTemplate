import express from 'express';
import {
  getUser,
} from '../controllers/user.controller';

const router = express.Router();

// Define routes
router.get('/', getUser);

export { router };
