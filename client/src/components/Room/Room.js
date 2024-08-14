import useChat from "hooks/useChat";

import MessageList from "./MessageList/MessageList.js";
import MessageInput from "./MessageInput/MessageInput.js";
import UserList from "./UserList/UserList.js";

const Room = () => {
  const { users, messages, log, sendMessage, removeMessage } = useChat();

  return (
    <div className="container chat">
      <div className="container messge">
        <MessageList />
      </div>
    </div>
  );
};

export default Room;
