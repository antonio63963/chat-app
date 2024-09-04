import mongoConnection from "./mongoConnection.js";

async function runDB() {
  await mongoConnection();
};

export default runDB;
