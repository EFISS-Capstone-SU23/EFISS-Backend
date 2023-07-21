import { Repository } from 'typeorm';
import { msg200 } from '../../../common/helpers';
import { IResponse } from '../../../common/response';
import { AdsEntity } from '../entities/ads.entity';
import { dataSource } from '../../../database/data-source';
import { AdStatus, AdType } from '../../../loaders/enums';
import { config } from '../../../config/configuration';
import { CollectionAdsEntity } from '../entities/collection-ads.entity';
import { productService } from '../../product/services/product.service';
import { GetProductAdsForSearchResultsDto } from '../dtos/ads.dto';
import { SearchAdsEntity } from '../entities/search-ads.entity';
import { MAX_BANNER_ADS_PER_QUERY } from '../../../loaders/constants';

export class AdsService {
  private adsRepository: Repository<AdsEntity>;
  private collectionAdsRepository: Repository<CollectionAdsEntity>;
  private searchAdsRepository: Repository<SearchAdsEntity>;
  constructor() {
    this.adsRepository = dataSource.getRepository(AdsEntity);
    this.collectionAdsRepository = dataSource.getRepository(CollectionAdsEntity);
    this.searchAdsRepository = dataSource.getRepository(SearchAdsEntity);
  }

  async getBannerAds(): Promise<IResponse> {
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

  async getCollectionAds(): Promise<IResponse> {
    const ads = await this.adsRepository
      .createQueryBuilder('ads')
      .where('ads.adType = :adType', { adType: AdType.COLLECTION })
      .andWhere('ads.status = :status', { status: AdStatus.ACTIVE })
      .leftJoinAndSelect('ads.collectionAds', 'collection_ads')
      .orderBy('viewCount', 'ASC')
      .getOne();

    if (ads !== null) {
      const products = await productService.getProductsByIds(ads.collectionAds.productIds);
      ads.collectionAds['products'] = (products as any)?.productsList;

      // Update view count
      this.adsRepository.update(ads.id, { viewCount: () => 'viewCount + 1' });
    }

    // Get collection info
    return msg200({
      ads: ads,
    });
  }

  async getProductAdsForSearchResults(
    getProductAdsForSearchResultsDto: GetProductAdsForSearchResultsDto,
  ): Promise<IResponse> {
    // Get all groups
    const groups = this._getGroupsFromImageUrls(getProductAdsForSearchResultsDto.imageUrls);

    // Get advertising group
    const adGroups = await this.searchAdsRepository
      .createQueryBuilder('search_ads')
      .where('search_ads.group IN (:...groups)', { groups: groups })
      .select('search_ads.group')
      .getMany();
    const advertisingGroups = adGroups.map((adGroup) => adGroup.group);

    // Get productIds that are advertising
    const productIds = new Set<string>();
    for (const imageUrl of getProductAdsForSearchResultsDto.imageUrls) {
      const group = this._getGroupFromImageUrl(imageUrl);
      if (advertisingGroups.includes(group)) {
        const productId = this._getProductIdFromImageUrl(imageUrl);
        productIds.add(productId);
      }
    }

    const products = ((await productService.getProductsByIds(Array.from(productIds))) as any).productsList;

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

  private _getGroupsFromImageUrls(imageUrls: string[]): string[] {
    const groups = new Set<string>();
    for (const imageUrl of imageUrls) {
      groups.add(imageUrl.split('/')[3]);
    }
    return Array.from(groups);
  }

  private _getGroupFromImageUrl(imageUrl: string): string {
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
