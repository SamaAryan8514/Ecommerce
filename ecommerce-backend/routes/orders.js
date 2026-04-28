import express from 'express';
import { Order } from '../mongoModels/Order.js';
import { Product } from '../mongoModels/Product.js';
import { DeliveryOption } from '../mongoModels/DeliveryOption.js';
import { CartItem } from '../mongoModels/CartItem.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const expand = req.query.expand;
  let orders = await Order.find().sort({ orderTimeMs: -1 }).lean();

  if (expand === 'products') {
    orders = await Promise.all(orders.map(async (order) => {
      const products = await Promise.all(order.products.map(async (product) => {
        const productDetails = await Product.findOne({ id: product.productId }).lean();
        return {
          ...product,
          product: productDetails
        };
      }));
      return {
        ...order,
        products
      };
    }));
  }

  res.json(orders);
});

router.post('/', async (req, res) => {
  const cartItems = await CartItem.find().lean();

  if (cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  let totalCostCents = 0;
  const products = await Promise.all(cartItems.map(async (item) => {
    const product = await Product.findOne({ id: item.productId }).lean();
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }
    const deliveryOption = await DeliveryOption.findOne({ id: item.deliveryOptionId }).lean();
    if (!deliveryOption) {
      throw new Error(`Invalid delivery option: ${item.deliveryOptionId}`);
    }

    const productCost = product.priceCents * item.quantity;
    const shippingCost = deliveryOption.priceCents;
    totalCostCents += productCost + shippingCost;

    return {
      productId: item.productId,
      quantity: item.quantity,
      estimatedDeliveryTimeMs: Date.now() + deliveryOption.deliveryDays * 24 * 60 * 60 * 1000
    };
  }));

  totalCostCents = Math.round(totalCostCents * 1.1);

  const order = await Order.create({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    orderTimeMs: Date.now(),
    totalCostCents,
    products,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  await CartItem.deleteMany({});

  res.status(201).json(order);
});

router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const expand = req.query.expand;

  let order = await Order.findOne({ id: orderId }).lean();
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  if (expand === 'products') {
    const products = await Promise.all(order.products.map(async (product) => {
      const productDetails = await Product.findOne({ id: product.productId }).lean();
      return {
        ...product,
        product: productDetails
      };
    }));
    order = {
      ...order,
      products
    };
  }

  res.json(order);
});

export default router;
