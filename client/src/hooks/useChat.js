import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { SERVER_URL, USER_KEY } from "../constants";
import storage from "../utils/storage";

const useChat = () => {
  const user = storage.get(USER_KEY);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [log, setLog] = useState(null);

  const { current: socket } = useRef(
    io(SERVER_URL, {
      query: {
        ...user,
      },
    })
  );

  useEffect(() => {
    socket.emit('user:add', user);
    socket.emit('message:get');
    socket.on(('log', (log) => setLog(log)));
    socket.on('user_list:update', (users) => setUsers(users));
    socket.on('message_list:update', (messages) => setMessages(messages));
    
  }, [socket, user]);
  
  const sendMessage = (message) => {
    socket.emit('message:add', message);
  };
  const removeMessage = (message) => {
    socket.emit('message:remove', message);
  }

  return {users, messages, log, sendMessage, removeMessage};
};

export default useChat;
