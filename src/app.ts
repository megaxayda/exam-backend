import chalk from "chalk";
import express, { Router } from "express";
import helmet from "helmet";
import morgan from "morgan";
import configPassport from "./configPassport";
import createRoutes from "./routes";

export async function app(port: string = "3000") {
  const app = express();
  app.use(
    morgan(
      ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :total-time'
    )
  );

  app.use(helmet());
  app.use(express.json());

  configPassport(app);

  app.use((req, res, next) => {
    console.log("Time:", Date.now());
    next();
  });

  const rootRouter = Router();
  app.use("/api", rootRouter);

  createRoutes(rootRouter);

  const server = app.listen(port, () => {
    console.log(chalk.green(`Listening at http://localhost:${port}`));
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      console.log("HTTP server closed");
    });
  });

  return server;
}

export default app;
