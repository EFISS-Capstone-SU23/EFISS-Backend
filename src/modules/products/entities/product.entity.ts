import mongoose from 'mongoose';

export interface IProductEntity {
  title: string;
  url: string;
  price: number;
  description?: string;
  images: string[];
  metadata: any;
}

export const productSchema = new mongoose.Schema<IProductEntity>({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  metadata: {
    type: Object,
  },
});

export const ProductEntity = mongoose.model<IProductEntity>('Product', productSchema);
