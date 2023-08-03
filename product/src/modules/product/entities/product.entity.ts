import mongoose from 'mongoose';

export interface IProductEntity {
  title: string;
  url: string;
  price: number;
  description: string;
  images: string[];
  metadata: any;
  categories?: string[];
  shopName: string;
  active?: boolean;
  activeImageMap?: boolean[];
  crawlId?: string;
  originalImages?: string[];
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
    shopName: {
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
    },
    originalImages: {
      type: [String],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export const ProductEntity = mongoose.model<IProductEntity>('Product', productSchema);
