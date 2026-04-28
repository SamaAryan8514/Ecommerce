import express from 'express';
import { CartItem } from '../mongoModels/CartItem.js';
import { Product } from '../mongoModels/Product.js';
import { DeliveryOption } from '../mongoModels/DeliveryOption.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const cartItems = await CartItem.find().lean();
  let totalItems = 0;
  let productCostCents = 0;
  let shippingCostCents = 0;

  for (const item of cartItems) {
    const product = await Product.findOne({ id: item.productId }).lean();
    const deliveryOption = await DeliveryOption.findOne({ id: item.deliveryOptionId }).lean();
    totalItems += item.quantity;
    productCostCents += (product?.priceCents || 0) * item.quantity;
    shippingCostCents += deliveryOption?.priceCents || 0;
  }

  const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
  const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
  const totalCostCents = totalCostBeforeTaxCents + taxCents;

  res.json({
    totalItems,
    productCostCents,
    shippingCostCents,
    totalCostBeforeTaxCents,
    taxCents,
    totalCostCents
  });
});

export default router;
