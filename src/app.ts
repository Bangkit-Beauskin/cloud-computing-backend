import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import ApiError from "./utils/ApiError";
import httpStatus from "http-status";
import { errorConverter, errorHandler } from "./utils/error";
import routes from "./routes";

export const app: Express = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/version", async (req, res) => {
  res.status(200).send("v1.0.0");
});

app.use("/api/v1", routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);
