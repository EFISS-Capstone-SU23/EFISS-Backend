import mongoose from 'mongoose';

export interface IProductEntity {
  title: string;
  url: string;
  price: number;
  description?: string;
  images: string[];
  metadata: any;
  categories?: string[];
  group?: string;
  active?: boolean;
  activeImageMap?: boolean[];
  crawlId?: string;
}

export const productSchema = new mongoose.Schema<IProductEntity>(
  {
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
    categories: {
      type: [String],
    },
    group: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    activeImageMap: {
      type: [Boolean],
    },
    crawlId: {
      type: String,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const ProductEntity = mongoose.model<IProductEntity>('Product', productSchema);
