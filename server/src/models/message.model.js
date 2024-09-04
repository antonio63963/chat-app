import mongoose from "mongoose";
import path from "node:path";
import * as URL from 'url';

const __filename =  URL.fileURLToPath(import.meta.url);
const fileExt = path.extname(__filename);


const { Schema } = mongoose;

const generalSchema = new Schema({
  messageId: {
    type: String,
    required: true,
    unique: true,
  },
  messageType: {
    type: String,
    required: true,
  },
  textOrPathToFile: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    required: true,
  },

  
}, {timestamps: true});

const fileName = path.basename(__filename, fileExt);
export default mongoose.model(fileName, generalSchema);
