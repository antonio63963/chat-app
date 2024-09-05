const users = {};

function userHandlers(io, socket) {
  const { roomId, userName } = socket;

  if (!users[roomId]) {
    users[roomId] = [];
  }

  const updateUserList = () => {
    io.to(roomId).emit("user_list:update", users[roomId]);
  };

  socket.on("user:add", async (user) => {
    console.log("USER:ADD: ", user);
    socket.to(roomId).emit("log", `User ${userName} connected`);
    user.sockedId = socket.id;
    const isUserAdded = users[roomId].some((u) => u.userName === user.userName);
    if (!isUserAdded) {
      users[roomId].push(user);
      updateUserList();
    }
  });

  socket.on("disconnect", () => {
    if (!users[roomId]) return;
    socket.to(roomId).emit("log", `User ${userName} disconnected`);
    updateUserList();
  });
}

export default userHandlers;
