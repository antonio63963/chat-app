import Message from "../../models/message.model.js";
import { removeFile } from "../../utils/file.js";
import onError from "../../utils/onError.js";

const messages = {};

function messageHandlers(io, socket) {
  const { roomId } = socket;

  function updateMessageList() {
    io.to(roomId).emit("message_list:update", messages[roomId]);
  }

  socket.on("message:get", async () => {
    try {
      const _messages = await Message.find({ roomId });
      messages[roomId] = _messages;
      updateMessageList();
    } catch (error) {
      onError();
    }
  });

  socket.on("message:add", (message) => {
    Message.create(message).catch(onError);
    //переделать
    message.createdAt = Date.now();
    messages[roomId].push(message);
    updateMessageList();
  });

  socket.on("message:remove", (message) => {
    const { messageId, messageType, textOrPathToFile } = message;

    Message.deleteOne(messageId)
      .then(() => {
        if (messageType !== "text") {
          removeFile(textOrPathToFile);
        }
      })
      .catch(onError);

    messages[roomId] = messages[roomId].filter((m) => m.id !== messageId);
    updateMessageList();
  });
}

export default messageHandlers;
