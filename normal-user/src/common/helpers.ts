import { NextFunction, Response } from 'express';
import { IResponse } from './response';
import { BadRequestError, ResourceNotFoundError, UnauthorizedError } from './error-handler';

export function msg400(message: string): IResponse {
  return {
    status: false,
    statusCode: 400,
    message: message,
  };
}

export function msg404(message: string): IResponse {
  return {
    status: false,
    statusCode: 404,
    message: message,
  };
}

export function msg401(message: string): IResponse {
  return {
    status: false,
    statusCode: 401,
    message: message,
  };
}

export function msg403(message: string): IResponse {
  return {
    status: false,
    statusCode: 403,
    message: message,
  };
}

export function msg200(data: any): IResponse {
  return {
    status: true,
    statusCode: 200,
    ...data,
  };
}

export function sendResponse(result: IResponse, response: Response, next: NextFunction): void {
  switch (result.statusCode) {
    case 200: {
      response.status(200).send(result);
      break;
    }
    case 400: {
      next(new BadRequestError(result.message));
      break;
    }
    case 401: {
      next(new UnauthorizedError(result.message));
      break;
    }
    case 404: {
      next(new ResourceNotFoundError(result.message));
      break;
    }
  }
}
