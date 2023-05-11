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
      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(findRelevantImagesRequestDto)], {
          type: "application/json",
        })
      );
      const response = (
        await axios.post(
          `${config.ai.baseApi}${config.ai.searcherRoute}`,
          formData
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
      console.log((err as any).response.data);
      return null;
    }
  }
}
