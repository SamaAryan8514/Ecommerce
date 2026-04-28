import express from 'express';
import { Product } from '../mongoModels/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const search = req.query.search;
  const category = req.query.category;
  const query = {};

  if (search) {
    const regex = new RegExp(search, 'i');
    query.$or = [
      { name: regex },
      { keywords: regex }
    ];
  }

  if (category) {
    // Map navbar categories to actual keywords in the data
    const categoryMappings = {
      'electronics': ['appliances', 'kitchen'], // toaster, water kettle, etc.
      'clothing': ['apparel'], // sweaters, t-shirts, shorts, etc.
      'accessories': ['accessories'] // sunglasses, etc.
    };

    const keywords = categoryMappings[category.toLowerCase()];
    if (keywords) {
      query.keywords = { $in: keywords };
    }
  }

  const products = await Product.find(query).sort({ createdAt: 1 }).lean();
  res.json(products);
});

export default router;