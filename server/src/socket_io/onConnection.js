import userHandlers from './handlers/user.handler.js';
import messageHandlers from './handlers/message.handlers.js';

const onConnection =(io, socket) => {
  const {roomId, userName} = socket.handshake.query;

  socket.roomId = roomId;
  socket.userName = userName;

  socket.join(roomId);

  userHandlers(io, socket);
  messageHandlers(io, socket);
};

export default onConnection;
