import fs, { mkdirSync } from "node:fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "node:url";

const _dirname = path.join(fileURLToPath(import.meta.url));

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: async (req, _, cb) => {
      const roomId = req.headers["x-room-id"];
      //files store by roomsId
      const dirPath = path.join(_dirname, "../files", roomId);

      if (!fs.existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }
      cb(null, dirPath);
    },
    filename: (_, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

export {
  uploadFile
};
