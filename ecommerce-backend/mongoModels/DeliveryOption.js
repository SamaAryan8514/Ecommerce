import mongoose from 'mongoose';

const deliveryOptionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  deliveryDays: { type: Number, required: true },
  priceCents: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
}, {
  versionKey: false
});

export const DeliveryOption = mongoose.models.DeliveryOption || mongoose.model('DeliveryOption', deliveryOptionSchema);
