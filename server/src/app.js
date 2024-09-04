import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

import { getFilePath } from "./utils/file.js";
import onError from "./utils/onError.js";
import { uploadFile } from "./utils/upload.js";
import onConnection from "./socket_io/onConnection.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
  })
);

app.use("/upload", uploadFile.single("file"), (req, res) => {
  if (!req.file) return res.sendStatus(400);
  const relativeFilePath = req.file.path
    .replace(/\\/g, "/")
    .split("server/files")[1];

  res.status(200).json(relativeFilePath);
});

app.use("/files", (req, res) => {
  const filePath = getFilePath(req.url);
  res.status(200).sendFile(filePath);
});

app.use(onError);

try {
  await mongoose.connect(process.env.MONGODB_APP, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB was connected...");
} catch (error) {
  onError(error);
}

const server = http.createServer(app);

const io = new Server(server, {
  cors: process.env.ALLOWED_ORIGIN,
  serveClient: false
});

io.on('connection', (socket) => onConnection(io, socket));


const PORT = process.env.PORT || 5000;
server.listen(PORT, (err) => {
  if (err) {
    console.error("Server launch ERROR: ", err);
  } else {
    console.log(`Server has launched on port: ${PORT}`);
  }
});
