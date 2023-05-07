import axios from "axios";
import {
  FindRelevantImagesRequestDto,
  FindRelevantImagesResponseDto,
} from "./dtos/ai.dto";
import { config } from "../../config/configuration";

export class AIService {
  constructor() {}

  async findRelevantImages(
    findRelevantImagesRequestDto: FindRelevantImagesRequestDto
  ): Promise<FindRelevantImagesResponseDto> {
    try {
      const response = (
        await axios.post(
          `${config.ai.baseApi}/predictions/image-retrieval-v1.0`,
          findRelevantImagesRequestDto
        )
      ).data;
      const findRelevantImagesResponseDto = new FindRelevantImagesResponseDto();
      findRelevantImagesResponseDto.index_database_version =
        response.index_database_version;
      findRelevantImagesResponseDto.relevant = response.relevant;
      if (response?.distances) {
        findRelevantImagesResponseDto.distances = response.distances;
      }
      return findRelevantImagesResponseDto;
    } catch (err) {
      return null;
    }
  }
}
