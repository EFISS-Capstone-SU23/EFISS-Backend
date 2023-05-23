import axios from 'axios'
import {
	type FindRelevantImagesRequestDto,
	FindRelevantImagesResponseDto
} from './dtos/ai.dto'
import { config } from '../../config/configuration'

export class AIService {
	private static instance: AIService

	private constructor () {}

	public static getInstance (): AIService {
		if (!AIService.instance) {
			AIService.instance = new AIService()
		}
		return AIService.instance
	}

	async findRelevantImages (
		findRelevantImagesRequestDto: FindRelevantImagesRequestDto
	): Promise<FindRelevantImagesResponseDto | Error> {
		try {
			const formData = new FormData()
			formData.append(
				'data',
				new Blob([JSON.stringify(findRelevantImagesRequestDto)], {
					type: 'application/json'
				})
			)
			const response = (
				await axios.post(
					`${config.ai.baseApi}${config.ai.searcherRoute}`,
					formData
				)
			).data
			const findRelevantImagesResponseDto = new FindRelevantImagesResponseDto()
			findRelevantImagesResponseDto.index_database_version =
        response.index_database_version
			findRelevantImagesResponseDto.relevant = response.relevant
			if (response?.distances) {
				findRelevantImagesResponseDto.distances = response.distances
			}
			return findRelevantImagesResponseDto
		} catch (err) {
			return err as Error
		}
	}
}
