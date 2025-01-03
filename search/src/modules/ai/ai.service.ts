import axios from 'axios';
import { type FindRelevantImagesRequestDto, FindRelevantImagesResponseDto } from './dtos/ai.dto';
import { config } from '../../config/configuration';

export class AIService {
  constructor() {}

  async findRelevantImages(
    findRelevantImagesRequestDto: FindRelevantImagesRequestDto,
  ): Promise<FindRelevantImagesResponseDto | Error> {
    try {
      const formData = new FormData();
      formData.append(
        'data',
        new Blob([JSON.stringify(findRelevantImagesRequestDto)], {
          type: 'application/json',
        }),
      );
      const response = (await axios.post(`${config.ai.baseApi}${config.ai.searcherRoute}`, formData)).data;
      const findRelevantImagesResponseDto = new FindRelevantImagesResponseDto();
      findRelevantImagesResponseDto.index_database_version = response.index_database_version;
      findRelevantImagesResponseDto.relevant = response.relevant;
      findRelevantImagesResponseDto.croppedImage = response.cropped_image;

      if (response?.distances) {
        findRelevantImagesResponseDto.distances = response.distances;
      }
      return findRelevantImagesResponseDto;
    } catch (err) {
      return err as Error;
    }
  }
}

export const aiService = new AIService();
