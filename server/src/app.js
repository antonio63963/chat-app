import express from "express";
import cors from "cors";
import "dotenv/config";

import { Server } from "socket.io";

import appRouter from "./routes/index.js";

import onError from "./utils/onError.js";
import onConnection from "./socket_io/onConnection.js";
import runDB from "./db/index.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
  })
);

app.use(appRouter);

app.use(onError);

runDB();

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: process.env.ALLOWED_ORIGIN,
//   serveClient: false,
// });

// io.on("connection", (socket) => onConnection(io, socket));

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, (err) => {
//   if (err) {
//     console.error("Server launch ERROR: ", err);
//   } else {
//     console.log(`Server has launched on port: ${PORT}`);
//   }
// });

export default app;
