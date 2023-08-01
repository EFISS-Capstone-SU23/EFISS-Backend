import { Router, type Request, type Response, NextFunction } from 'express';
import { sendResponse } from '../../../common/helpers';
import { adsService } from '../services/ads.service';
import { RequestValidator } from '../../../common/error-handler';
import { GetProductAdsForSearchResultsDto } from '../dtos/ads.dto';
import { plainToInstance } from 'class-transformer';

export const adsRouter = Router();

// BANNER ADS
adsRouter.get('/banner', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const bannerAdsResponse = await adsService.getBannerAdsResponse();
  sendResponse(bannerAdsResponse, res, next);
});

// COLLECTION ADS
adsRouter.get('/collection', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const collectionAdsResponse = await adsService.getCollectionAdsResponse();
  sendResponse(collectionAdsResponse, res, next);
});

// SEARCH ADS
adsRouter.post(
  '/search',
  RequestValidator.validate(GetProductAdsForSearchResultsDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const getProductAdsForSearchResultsDto = plainToInstance(GetProductAdsForSearchResultsDto, req.body);
    const productAdsForSearchResults = await adsService.getProductAdsForSearchResultsResponse(
      getProductAdsForSearchResultsDto,
    );
    sendResponse(productAdsForSearchResults, res, next);
  },
);
