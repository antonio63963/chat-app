import mongoose from "mongoose";
import { Logger } from "tslog";

const logger = new Logger();

const dbConfig = {
  url: process.env.MONGODB_APP,
  options: {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  },
};

async function mongoConnection() {
  // try {
  //   await mongoose.connect(process.env.MONGODB_APP, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   console.log("DB was connected...");
  // } catch (error) {
  //   onError(error);
  // }

  mongoose.connect(dbConfig.url, dbConfig.options);
  const db = mongoose.connection;
  db.once("open", () => logger.info("Mongo DB has ran successfully."));
  db.once("close", () => logger.warn("Mongo DB has closed."));
  db.on("error", (err) => logger.error(`Error MongoDB: ${err}`));
}

export default mongoConnection;
