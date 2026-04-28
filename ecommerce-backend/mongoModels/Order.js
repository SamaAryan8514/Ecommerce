import mongoose from 'mongoose';

const orderProductSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  estimatedDeliveryTimeMs: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  orderTimeMs: { type: Number, required: true },
  totalCostCents: { type: Number, required: true },
  products: { type: [orderProductSchema], required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
}, {
  versionKey: false
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
