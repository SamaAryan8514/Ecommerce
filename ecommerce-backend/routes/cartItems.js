import express from 'express';
import { CartItem } from '../mongoModels/CartItem.js';
import { Product } from '../mongoModels/Product.js';
import { DeliveryOption } from '../mongoModels/DeliveryOption.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const expand = req.query.expand;
  let cartItems = await CartItem.find().sort({ createdAt: 1 }).lean();

  if (expand === 'product') {
    cartItems = await Promise.all(cartItems.map(async (item) => {
      const product = await Product.findOne({ id: item.productId }).lean();
      return {
        ...item,
        product
      };
    }));
  }

  res.json(cartItems);
});

router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findOne({ id: productId });
  if (!product) {
    return res.status(400).json({ error: 'Product not found' });
  }

  if (typeof quantity !== 'number' || quantity < 1 || quantity > 10) {
    return res.status(400).json({ error: 'Quantity must be a number between 1 and 10' });
  }

  let cartItem = await CartItem.findOne({ productId });
  if (cartItem) {
    cartItem.quantity += quantity;
    cartItem.updatedAt = new Date();
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({
      productId,
      quantity,
      deliveryOptionId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  res.status(201).json(cartItem);
});

router.put('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { quantity, deliveryOptionId } = req.body;

  const cartItem = await CartItem.findOne({ productId });
  if (!cartItem) {
    return res.status(404).json({ error: 'Cart item not found' });
  }

  if (quantity !== undefined) {
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be a number greater than 0' });
    }
    cartItem.quantity = quantity;
  }

  if (deliveryOptionId !== undefined) {
    const deliveryOption = await DeliveryOption.findOne({ id: deliveryOptionId });
    if (!deliveryOption) {
      return res.status(400).json({ error: 'Invalid delivery option' });
    }
    cartItem.deliveryOptionId = deliveryOptionId;
  }

  cartItem.updatedAt = new Date();
  await cartItem.save();
  res.json(cartItem);
});

router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;

  const cartItem = await CartItem.findOne({ productId });
  if (!cartItem) {
    return res.status(404).json({ error: 'Cart item not found' });
  }

  await cartItem.deleteOne();
  res.status(204).send();
});

export default router;
