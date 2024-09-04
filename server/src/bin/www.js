import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";
import createAppServer from "./createAppServer.js";

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  createAppServer();
  console.log(`Worker ${process.pid} started`);
}
