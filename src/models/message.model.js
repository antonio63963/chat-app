import mongoose from "mongoose";
import path from "node:path";

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

  timestamps: true,
});

const fileName = path.basename(__filename, ".js");
export default mongoose.model(fileName, generalSchema);
