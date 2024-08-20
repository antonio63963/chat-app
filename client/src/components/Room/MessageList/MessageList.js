import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem.js";

const MessageList = ({ log, messages, removeMessage }) => {
  const logRef = useRef(null);
  const bottomRef = useRef(null);

  //scroll to bottom last sms

  useEffect(() => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (log) {
      logRef.current.style.opacity = 0.8;
      logRef.current.style.zIndex = 1;

      const timerId = setTimeout(() => {
        logRef.current.style.opacity = 0;
        logRef.current.style.opacity = -1;

        clearTimeout(timerId);
      }, 1500);
    }
  }, [log]);

  return (
    <div className="container message">
      <h2>Messages</h2>
      <div className="list message">
        {messages.map((m) => (
          <MessageItem
            key={m.messageId}
            message={m.message}
            removeMessage={removeMessage}
          />
        ))}

        <p ref={bottomRef}></p>
        <p ref={logRef} className="log">
          {log}
        </p>
      </div>
    </div>
  );
};

export default MessageList;
