import useChat from "../../hooks/useChat.js";

import MessageList from "./MessageList/MessageList.js";
import MessageInput from "./MessageInput/MessageInput.js";
import UserList from "./UserList/UserList.js";

const Room = () => {
  const { users, messages, log, sendMessage, removeMessage } = useChat();
  console.log('ROOM!!!', users)

  return (
    <div className="container chat">
      <div className="container message">
        <MessageList
          log={log}
          messages={messages}
          removeMessage={removeMessage}
        />
        <MessageInput sendMessage={sendMessage} />
      </div>
      <UserList users={users} />
    </div>
  );
};

export default Room;
