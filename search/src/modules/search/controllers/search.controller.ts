/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { RequestValidator } from '../../../common/error-handler';
import { SearchImageRequest } from '.././dtos/search.dto';
import { plainToInstance } from 'class-transformer';
import { searchService } from '../services/search.service';
import { sendResponse } from '../../../common/helpers';
import { searchLimiter } from '../middlewares/limit.middleware';

export const searchRouter = Router();

// Search using image
searchRouter.post(
  '/image',
  RequestValidator.validate(SearchImageRequest),
  searchLimiter,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const searchImageRequest = plainToInstance(SearchImageRequest, req.body);

    const searchImageResult = await searchService.searchByImage(searchImageRequest);

    sendResponse(searchImageResult, res, next);
  },
);

// Todo: Search using text endpoint
//
