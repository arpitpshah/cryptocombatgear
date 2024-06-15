import express from 'express';
import { stripePayment } from '../controllers/orderController.js';

const router = express.Router();

router.post('/create-payment-intent', stripePayment);

export default router;