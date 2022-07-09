import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const unauthorizedError = (next: NextFunction) => {
  const error = new Error("Unable to log in, try again later");
  next(error);
};

const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get("Authorization");

    if (authHeader) {
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      if (token && bearer === "Bearer") {
        const decode = jwt.verify(
          token,
          process.env.TOKEN_SECRET as unknown as string
        );
        if (decode) {
          next();
        } else {
          unauthorizedError(next);
        }
      } else {
        unauthorizedError(next);
      }
    } else {
      unauthorizedError(next);
    }
  } catch (error) {
    unauthorizedError(next);
  }
};
export default validateTokenMiddleware;
