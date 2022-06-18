import { config } from "dotenv";
import express, { Application } from "express";
import { loadControllers } from "awilix-express";
import loadContainer from "./container";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.APP_ENV || "development";

config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`,
});

const app: Application = express();

app.use(express.json());
loadContainer(app);

app.use(loadControllers("controllers/*.controller.ts", { cwd: __dirname }));

export default app;
