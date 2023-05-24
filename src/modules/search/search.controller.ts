/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response } from 'express'
import { ImageSearchRequestDto } from './dtos/search.dto'
import { validate } from 'class-validator'
import { AIService } from '../ai/ai.service'
import { ProductService } from '../products/product.service'
import { getErrorString } from '../../helpers/helpers'
import isBase64 from 'is-base64'
import { config } from '../../config/configuration'
import { ProductCategory, SearchSortBy } from '../../loaders/enums'

export const searchRouter = Router()

// Search using image
searchRouter.post('/image', async (req: Request, res: Response): Promise<void> => {
	// Validate input parameter(s)
	const imageSearchRequestDto = new ImageSearchRequestDto()
	imageSearchRequestDto.encodedImage = req.body.encodedImage
	imageSearchRequestDto.limit = req.body?.limit || 10
	imageSearchRequestDto.sortBy = req.body?.sortBy || SearchSortBy.RELEVANCE
	imageSearchRequestDto.category = req.body?.category || ProductCategory.ALL
	const errors = await validate(imageSearchRequestDto)
	if (errors.length > 0) {
		res.send({
			status: false,
			error: getErrorString(errors)
		})
		return
	}

	// Validate encodedImage
	if (!isBase64(imageSearchRequestDto.encodedImage)) {
		res.send({
			status: false,
			error: 'encodedImage is not a valid base64 string'
		})
		return
	}

	// Get relevant images by encodedImage (from AI model)
	const aiService = AIService.getInstance()
	const imageUrlsFromAi = await aiService.findRelevantImages({
		topk: config.search.maximumResults,
		image: imageSearchRequestDto.encodedImage
	})
	if (imageUrlsFromAi instanceof Error) {
		if (imageUrlsFromAi?.stack?.includes('ECONNREFUSED')) {
			res.send({
				status: false,
				error: '[AI Model API] Failed to connect to AI Model API'
			})
		} else {
			res.send({
				status: false,
				error: `[AI Model API] ${imageUrlsFromAi.message}`
			})
		}
		return
	}

	// Get product list by imageUrls
	const productService = ProductService.getInstance()
	let results: any
	if (imageSearchRequestDto.sortBy === SearchSortBy.RELEVANCE) {
		results = await productService.getProductsSortedByRelevance({
			imageUrls: imageUrlsFromAi.relevant,
			limit: imageSearchRequestDto.limit ?? 10,
			category: imageSearchRequestDto.category ?? ProductCategory.ALL
		})
	} else if (
		imageSearchRequestDto.sortBy === SearchSortBy.PRICE_ASC ||
		imageSearchRequestDto.sortBy === SearchSortBy.PRICE_DESC
	) {
		results = await productService.getProductsSortedByPrice({
			imageUrls: imageUrlsFromAi.relevant,
			limit: imageSearchRequestDto.limit ?? 10,
			sortBy: imageSearchRequestDto.sortBy,
			category: imageSearchRequestDto.category ?? ProductCategory.ALL
		})
	}

	res.send({
		status: true,
		searchResults: results.detailedResults,
		restIdResults: results.restIdResults
	})
})

// Todo: Search using text endpoint
//
