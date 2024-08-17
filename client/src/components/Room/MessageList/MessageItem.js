import { SERVER_URL, USER_KEY } from "../../../constants.js";
import { FaRegTrashAlt } from "react-icons/fa";
import TimeAgo from "react-timeago";

import MessageContent from "./MessageContent.js";

import storage from "../../../utils/storage.js";

const MessageItem = ({ message, removeMessage }) => {
  const user = storage.getUser(USER_KEY);
  const pathToFile = `${SERVER_URL}/files${message.textOrPathToFile}`;
  const isMyMessage = user.userId === message.userId;

  return (
    <div className={`item message ${isMyMessage ? "me" : null}`}>
      <p className="userName">{isMyMessage ? "Me" : message.userName}</p>
      <div className="inner">
        <MessageContent pathToFile={pathToFile} message={message} />
        {isMyMessage && (
          <button className="btn" onClick={() => removeMessage(message)}>
            <FaRegTrashAlt className="icon remove" />
          </button>
        )}
      </div>

      <p className="dateTime">
        <TimeAgo date={message.createdAt} />
      </p>
    </div>
  );
};

export default MessageItem;
