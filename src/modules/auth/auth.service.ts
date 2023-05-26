import { type NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response, next: NextFunction): void => {
  // Get JWT Token from Header
  const token = req.headers.auth as string;
  let jwtPayload;

  // Validate the token and get data
  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    res.locals = jwtPayload;
  } catch (err) {
    // If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }
  next();
};
