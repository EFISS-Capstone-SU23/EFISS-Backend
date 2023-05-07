import { config, validateEnvironmentVars } from "./config/configuration";
import { MongodbHelper } from "./database/mongodb.db";
import { RedisService } from "./modules/redis/redis.service";
import express from "express";
import { searchRouter } from "./modules/search/search.controller";
import bodyParser from "body-parser";

async function main() {
  // validateEnvironmentVars();
  // const mongodbHelper = new MongodbHelper(
  //   config.mongodb.host,
  //   config.mongodb.database,
  //   config.mongodb.username,
  //   config.mongodb.password
  // );
  // await mongodbHelper.connect();
  // const redisService = await RedisService.init(
  //   config.redis.host,
  //   config.redis.port
  // );

  const app = express();
  app.use(
    bodyParser.urlencoded({
      parameterLimit: 100000,
      limit: "50mb",
      extended: true,
    })
  );
  app.get("/", (req, res) => {
    res.send("Welcome to EFISS Backend");
  });

  app.use("/search", searchRouter);

  app.listen(config.server.listenPort, "0.0.0.0", () => {
    console.log(
      `EFISS Backend is running on port ${config.server.listenPort}!`
    );
  });
}

main();
