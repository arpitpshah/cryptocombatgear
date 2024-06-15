// blockchairRoutes.js
import express from 'express';
import { getBalance } from '../controllers/blockchainController.js';

const router = express.Router();

router.get('/balance/:address', getBalance);

export default router;
