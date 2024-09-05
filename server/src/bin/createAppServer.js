import http from "http";
import { Server } from "socket.io";

import "dotenv/config";
import onConnection from "../socket_io/onConnection.js";

import app from "../app.js";

function createAppServer() {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: process.env.ALLOWED_ORIGIN_APP,
    serveClient: false,
  });

  io.sockets.setMaxListeners(12);

  io.on("connection", (socket) => {
    return onConnection(io, socket);
  });

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, (err) => {
    if (err) {
      console.error("Server launch ERROR: ", err);
    } else {
      console.log(`Server has launched on port: ${PORT}`);
    }
  });
}

export default createAppServer;
