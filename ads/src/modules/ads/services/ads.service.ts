import { Repository } from 'typeorm';
import { msg200 } from '../../../common/helpers';
import { IResponse } from '../../../common/response';
import { AdsEntity } from '../entities/ads.entity';
import { dataSource } from '../../../database/data-source';
import { AdStatus, AdType } from '../../../loaders/enums';
import { productServiceGrpcClient } from '../../product/grpc/product.grpc-client';
import { GetProductAdsForSearchResultsDto } from '../dtos/ads.dto';
import { SearchAdsEntity } from '../entities/search-ads.entity';
import { MAX_BANNER_ADS_PER_QUERY } from '../../../loaders/constants';

export class AdsService {
  private adsRepository: Repository<AdsEntity>;
  private searchAdsRepository: Repository<SearchAdsEntity>;
  constructor() {
    this.adsRepository = dataSource.getRepository(AdsEntity);
    this.searchAdsRepository = dataSource.getRepository(SearchAdsEntity);
  }

  async getBannerAdsResponse(): Promise<IResponse> {
    const ads = await this.adsRepository
      .createQueryBuilder('ads')
      .where('ads.adType = :adType', { adType: AdType.BANNER })
      .andWhere('ads.status = :status', { status: AdStatus.ACTIVE })
      .leftJoinAndSelect('ads.bannerAds', 'banner_ads')
      .limit(MAX_BANNER_ADS_PER_QUERY)
      .orderBy('viewCount', 'ASC')
      .getMany();

    // To do: If ads length is 0, show default

    // Update view count
    this.adsRepository.update(
      ads.map((ad) => ad.id),
      { viewCount: () => 'viewCount + 1' },
    );

    return msg200({
      ads: ads,
    });
  }

  async getCollectionAdsResponse(): Promise<IResponse> {
    const ads = await this.adsRepository
      .createQueryBuilder('ads')
      .where('ads.adType = :adType', { adType: AdType.COLLECTION })
      .andWhere('ads.status = :status', { status: AdStatus.ACTIVE })
      .leftJoinAndSelect('ads.collectionAds', 'collection_ads')
      .orderBy('viewCount', 'ASC')
      .getOne();

    if (ads !== null) {
      const products = await productServiceGrpcClient.getProductsByIds(ads.collectionAds.productIds);
      ads.collectionAds['products'] = (products as any)?.productsList;

      // Update view count
      this.adsRepository.update(ads.id, { viewCount: () => 'viewCount + 1' });
    }

    // Get collection info
    return msg200({
      ads: ads,
    });
  }

  async getProductAdsForSearchResultsResponse(
    getProductAdsForSearchResultsDto: GetProductAdsForSearchResultsDto,
  ): Promise<IResponse> {
    // Get all shop names
    const shopNames = this._getShopNameFromImageUrls(getProductAdsForSearchResultsDto.imageUrls);

    // Get advertising shop names
    const adShops = await this.searchAdsRepository
      .createQueryBuilder('search_ads')
      .innerJoinAndSelect('search_ads.shop', 'shop')
      .where('shop.shopName IN (:...shopNames)', { shopNames: shopNames })
      .getMany();
    const advertisingShops = adShops.map((adShop) => adShop.shop.shopName);

    // Get productIds that are advertising
    const productIds = new Set<string>();
    for (const imageUrl of getProductAdsForSearchResultsDto.imageUrls) {
      const shopName = this._getShopNameFromImageUrl(imageUrl);
      if (advertisingShops.includes(shopName)) {
        const productId = this._getProductIdFromImageUrl(imageUrl);
        productIds.add(productId);
      }
    }

    const products = ((await productServiceGrpcClient.getProductsByIds(Array.from(productIds))) as any).productsList;

    // Move search image url results of product to the top of the list
    for (let i = 0; i < products.length; i++) {
      products[i].images = products[i].images?.sort(function (a, b) {
        let index1 = getProductAdsForSearchResultsDto?.imageUrls?.findIndex((imageUrl) =>
          imageUrl.includes(a.split('/').pop() as string),
        );
        let index2 = getProductAdsForSearchResultsDto?.imageUrls?.findIndex((imageUrl) =>
          imageUrl.includes(b.split('/').pop() as string),
        );
        if (index1 === -1) index1 = 999;
        if (index2 === -1) index2 = 999;
        return index1 - index2;
      });
    }

    return msg200({
      ads: products,
    });
  }

  private _getShopNameFromImageUrls(imageUrls: string[]): string[] {
    const groups = new Set<string>();
    for (const imageUrl of imageUrls) {
      groups.add(imageUrl.split('/')[3]);
    }
    return Array.from(groups);
  }

  private _getShopNameFromImageUrl(imageUrl: string): string {
    const group = imageUrl.split('/')[3];
    return group;
  }

  private _getProductIdFromImageUrl(imageUrl: string): string {
    const fileName = imageUrl?.split('/')?.pop();
    const productId = fileName?.split('_')?.[0] as string;
    return productId;
  }
}

export const adsService = new AdsService();
