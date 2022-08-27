import mongoose, { Schema } from 'mongoose';
import IHosting from '../interfaces/IHosting';

const Hosting: Schema = new Schema<IHosting>(
  {
    hostname: { type: String, required: true },
    active: { type: Boolean, required: true, default: false },
    ipAddress: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

Hosting.index({ hostname: 1, active: 1 });

export default mongoose.model('hosting', Hosting);