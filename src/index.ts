import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import errorMiddleware from "./middlewares/errors";
const PORT = 3000;
const app: Application = express();

app.use(express.json());
app.use(helmet());
app.get("/", (req: Request, res: Response) => {
  res.send("I am tired");
});
app.use(errorMiddleware);
app.use((_req: Request, res: Response) => {
  res
    .status(404)
    .send("Error: The route you're trying to access doesn't exist");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;
