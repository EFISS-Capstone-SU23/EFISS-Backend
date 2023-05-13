import { Router, Request, Response } from "express";
import { ImageSearchRequestDto } from "./dtos/search.dto";
import { validate } from "class-validator";
import { AIService } from "../ai/ai.service";
import { IProductEntity } from "../products/entities/product.entity";
import { HydratedDocument } from "mongoose";
import { ProductService } from "../products/product.service";

export const searchRouter = Router();

// Search using image
searchRouter.post("/image", async (req: Request, res: Response) => {
  // Validate input parameter(s)
  const imageSearchRequestDto = new ImageSearchRequestDto();
  imageSearchRequestDto.encodedImage = req.body.encodedImage;
  imageSearchRequestDto.limit = req.body?.limit || 10;
  imageSearchRequestDto.skip = req.body?.skip || 0;
  imageSearchRequestDto.debug = req.body?.debug || false;
  const errors = await validate(imageSearchRequestDto);
  if (errors.length > 0) {
    res.send({
      status: false,
      errors: errors,
    });
    return;
  }

  // To do: check if encodedImage is valid
  //

  // Get relevant images by encodedImage (from AI model)
  const aiService = new AIService();
  const aiResults = await aiService.findRelevantImages({
    topk: imageSearchRequestDto.limit + imageSearchRequestDto.skip,
    image: imageSearchRequestDto.encodedImage,
    debug: imageSearchRequestDto.debug,
  });
  if (aiResults instanceof Error) {
    if (aiResults.stack.includes("ECONNREFUSED")) {
      res.send({
        status: false,
        error: "Failed to connect to AI Model API",
      });
    } else {
      res.send({
        status: false,
        error: aiResults.message,
      });
    }
    return;
  }
  aiResults.relevant.splice(0, imageSearchRequestDto.skip);
  if (aiResults?.distances) {
    aiResults.distances.splice(0, imageSearchRequestDto.skip);
  }

  // Get product list by imageUrls
  // Question??? 1 sản phẩm có thể có nhiều ảnh, vậy khi search 1 ảnh, có nên limit 1 sản phẩm chỉ hiện tối đa bao nhiêu ảnh của nó. Hay chỉ hiện ảnh thôi, vì có thể 3 ảnh khác nhau nhưng cùng link tới 1 product
  // Hiện tại, chỉ chứa tối đa 1 sản phẩm
  // Sort by relevancy by default
  const searchResults: HydratedDocument<IProductEntity>[] = [];
  // Find product entity by its image url
  const productService = new ProductService();
  for (const imageUrl of aiResults.relevant) {
    const product = await productService.getProductByImageUrl(imageUrl);
    if (
      product &&
      !searchResults.some((result) => result?._id == product?._id)
    ) {
      searchResults.push(product);
    }
  }

  // To do: sort by price, cloth categories,...
  //

  res.send({
    status: true,
    searchResults,
  });
});

// Todo: Search using text endpoint
//
