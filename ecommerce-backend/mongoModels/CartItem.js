import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  deliveryOptionId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
}, {
  versionKey: false
});

cartItemSchema.index({ productId: 1 }, { unique: true });

export const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema);
