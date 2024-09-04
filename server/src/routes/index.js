import express from 'express';

import {uploadFile} from '../utils/upload.js';

const route = express.Router();

route.use("/upload", uploadFile.single("file"), (req, res) => {
  if (!req.file) return res.sendStatus(400);
  const relativeFilePath = req.file.path
    .replace(/\\/g, "/")
    .split("server/files")[1];

  res.status(200).json(relativeFilePath);
});

route.use("/files", (req, res) => {
  const filePath = getFilePath(req.url);
  res.status(200).sendFile(filePath);
});

export default route;
