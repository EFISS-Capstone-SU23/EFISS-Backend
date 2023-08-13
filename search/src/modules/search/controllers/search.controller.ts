/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { RequestValidator } from '../../../common/error-handler';
import { SearchImageRequestDto } from '.././dtos/search.dto';
import { plainToInstance } from 'class-transformer';
import { searchService } from '../services/search.service';
import { sendResponse } from '../../../common/helpers';
import { searchLimiter } from '../middlewares/limit.middleware';
import { SearchSortBy } from '../../../loaders/enums';

export const searchRouter = Router();

// Search using image
searchRouter.post(
  '/image',
  RequestValidator.validate(SearchImageRequestDto),
  // searchLimiter,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const searchImageRequest = plainToInstance(SearchImageRequestDto, req.body);

    const searchImageResult = await searchService.searchByImage(searchImageRequest);

    sendResponse(searchImageResult, res, next);
  },
);

// Todo: Search using text endpoint
searchRouter.get(
  '/text',
  // searchLimiter,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const query = req.query?.q as string;
    const pageNumber = parseInt(req.query?.pageNumber as string) || 1;
    const pageSize = parseInt(req.query?.pageSize as string) || 10;
    const minPrice = parseInt(req.query?.minPrice as string) ?? undefined;
    const maxPrice = parseInt(req.query?.maxPrice as string) ?? undefined;
    const categories = req.query?.categories as string[] | undefined;
    const sortBy = <SearchSortBy>req.query?.sortBy ?? SearchSortBy.DEFAULT;

    const searchResults = await searchService.searchByText({
      query,
      pageNumber,
      pageSize,
      minPrice,
      maxPrice,
      categories,
      sortBy,
    });

    sendResponse(searchResults, res, next);
  },
);
