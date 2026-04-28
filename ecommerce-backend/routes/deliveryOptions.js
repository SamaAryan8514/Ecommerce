import express from 'express';
import { DeliveryOption } from '../mongoModels/DeliveryOption.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const expand = req.query.expand;
  const deliveryOptions = await DeliveryOption.find().sort({ createdAt: 1 }).lean();
  let response = deliveryOptions;

  if (expand === 'estimatedDeliveryTime') {
    response = deliveryOptions.map(option => {
      const deliveryTimeMs = Date.now() + option.deliveryDays * 24 * 60 * 60 * 1000;
      return {
        ...option,
        estimatedDeliveryTimeMs: deliveryTimeMs
      };
    });
  }

  res.json(response);
});

export default router;
