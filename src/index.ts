/* eslint-disable no-console */
import express, { Application, Request, Response } from "express";
import routes from "./routes";
import dotenv from "dotenv";
import helmet from "helmet";
import errorMiddleware from "./middlewares/errors";
dotenv.config();
const app: Application = express();
app.use(express.json());

app.use("/api", routes);
app.use(helmet());
app.get("/", (req: Request, res: Response) => {
  res.send("Main API endpoint");
});

app.use(errorMiddleware);
app.use((_req: Request, res: Response) => {
  res
    .status(404)
    .send("Error: The route you're trying to access doesn't exist");
});
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
export default app;
