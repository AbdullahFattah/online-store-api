import { Response, Request } from "express";
interface Error {
  name?: string;
  stack?: string;
  message?: string;
  status?: number;
}
const errorMiddleware = (error: Error, req: Request, res: Response) => {
  const status = error.status || 500;
  const message = error.message || "An error occured.";
  res.status(status).json({ status, message });
};
export default errorMiddleware;
