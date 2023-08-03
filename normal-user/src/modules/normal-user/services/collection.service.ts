import { Repository } from 'typeorm';
import { CollectionEntity } from '../entities/collection.entity';
import { dataSource } from '../../../database/data-source';
import { CollectionProductEntity } from '../entities/collection-product.entity';
import { productServiceGrpcClient } from '../../product/grpc/product.grpc-client';

export class CollectionService {
  private readonly collectionRepository: Repository<CollectionEntity>;
  private readonly collectionProductRepository: Repository<CollectionProductEntity>;
  constructor() {
    this.collectionRepository = dataSource.getRepository(CollectionEntity);
    this.collectionProductRepository = dataSource.getRepository(CollectionProductEntity);
  }

  async renameCollection(collectionId: number, newName: string) {
    await this.collectionRepository
      .createQueryBuilder('collections')
      .update()
      .set({ name: newName })
      .where('id = :id', { id: collectionId })
      .execute();
  }

  async deleteProductInCollection(productId: string, collectionId: number) {
    await this.collectionProductRepository
      .createQueryBuilder('collection_product')
      .delete()
      .where('collectionId = :collectionId', { collectionId: collectionId })
      .andWhere('productId = :productId', { productId: productId })
      .execute();
  }

  async viewProductsInCollection(opts: { collectionId: number; pageNumber: number; pageSize: number }) {
    const { collectionId, pageNumber = 1, pageSize = 10 } = opts;
    const collectionProducts = await this.collectionProductRepository
      .createQueryBuilder('collection_product')
      .where('collectionId = :collectionId', { collectionId: collectionId })
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getMany();

    const totalItems = await this.collectionProductRepository
      .createQueryBuilder('collection_product')
      .where('collectionId = :collectionId', { collectionId: collectionId })
      .getCount();
    const totalPages = Math.ceil(totalItems / pageSize);

    const productIds = collectionProducts.map((collectionProduct) => collectionProduct.productId);
    const products = await productServiceGrpcClient.getProductsByIds(productIds);
    return {
      products: products,
      totalPages: totalPages,
      pageSize: pageSize,
      totalItems: totalItems,
      pageNumber: pageNumber,
    };
  }

  async isCollectionExisted(collectionId: number, accountId: number) {
    const collection = await this.collectionRepository
      .createQueryBuilder('collections')
      .where('id = :id', { id: collectionId })
      .andWhere('accountId = :accountId', { accountId: accountId })
      .getOne();
    return collection ? true : false;
  }

  async deleteCollection(collectionId: number, accountId: number) {
    await this.collectionRepository
      .createQueryBuilder('collections')
      .delete()
      .where('id = :id', { id: collectionId })
      .andWhere('accountId = :accountId', { accountId: accountId })
      .execute();
  }

  async viewCollectionList(accountId: number): Promise<CollectionEntity[]> {
    return await this.collectionRepository
      .createQueryBuilder('collections')
      .where('accountId = :accountId', { accountId: accountId })
      .getMany();
  }

  async createCollection(collectionName: string, accountId: number) {
    const collection = new CollectionEntity();
    collection.name = collectionName;
    collection.accountId = accountId;
    await this.collectionRepository.save(collection);
  }

  async isCollectionNameAlreadyExisted(collectionName: string, accountId: number) {
    const collection = await this.collectionRepository
      .createQueryBuilder('collections')
      .where('LOWER(name) = LOWER(:name)', { name: collectionName })
      .andWhere('accountId = :accountId', { accountId: accountId })
      .getOne();
    return collection ? true : false;
  }

  async isProductAlreadyInCollection(productId: string, collectionId: number): Promise<boolean> {
    const collectionProduct = await this.collectionProductRepository
      .createQueryBuilder('collection_product')
      .where('collectionId = :collectionId', { collectionId: collectionId })
      .andWhere('productId = :productId', { productId: productId })
      .getOne();
    return collectionProduct ? true : false;
  }

  async getCollectionById(id: number): Promise<CollectionEntity | null> {
    return await this.collectionRepository.createQueryBuilder('collections').where('id = :id', { id: id }).getOne();
  }

  async addProductToCollection(productId: string, collectionId: number, accountId: number): Promise<void> {
    const collection = await this.collectionRepository
      .createQueryBuilder('collections')
      .where('id = :id', { id: collectionId })
      .andWhere('accountId = :accountId', { accountId: accountId })
      .getOne();
    if (!collection) {
      throw new Error('Collection not found');
    }

    // Add product to collection
    const collectionProduct = new CollectionProductEntity();
    collectionProduct.collection = collection;
    collectionProduct.productId = productId;
    this.collectionProductRepository.save(collectionProduct);
  }
}

export const collectionService = new CollectionService();
