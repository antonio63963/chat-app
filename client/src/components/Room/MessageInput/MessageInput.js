import { useContext } from "react";
import { nanoid } from "nanoid";
import { useEffect, useState, useRef } from "react";

import { IoIosSend } from "react-icons/io";

import fileApi from "../../../api/file.api.js";
import storage from "../../../utils/storage.js";

import EmojiMart from "./EmojiMart/EmojiMart.js";
import FileInput from "./FileInput/FileInput.js";
import Recorder from "./Recorder/Recorder.js";

import AppContext from "../../../context/AppContext";

const MessageInput = ({ sendMessage }) => {
  const [text, setText] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const inputRef = useRef(null);
  const user = storage.getUser();
  const context = useState(AppContext);

  const {
    file,
    setNewFile,
    setShowPreview,
    showEmoji,
    setShowEmoji,
    showPreview,
  } = context;

  useEffect(() => {
    setSubmitDisabled(!text.trim() && !file);
  }, [text, file]);

  useEffect(() => {
    setShowPreview(file);
  }, [file, setShowPreview]);

  const onSubmit = async (e) => {
    e.preverntDefault();
    if (submitDisabled) return;
    const message = {
      messageId: nanoid(),
      ...user,
    };
    if (!file) {
      message.messageType = "text";
      message.textOrPathToFile = text;
    } else {
      try {
        const path = await fileApi.upload({ file, roomId: user.roomId });
        const type = file.type.split("/")[0];

        message.messateType = type;
        message.textOrPathToFile = path;
      } catch (err) {
        console.error(err);
      }
    }
    if (showEmoji) {
      setShowEmoji(false);
    }

    sendMessage(message);
    setText("");
    setNewFile("");
  };

  return (
    <form onSubmit={onSubmit} className="form message">
      <EmojiMart setText={setText} messageInput={inputRef.current} />
      <FileInput />
      <Recorder />
      <input
        type="text"
        autoFocus
        placeholder="Message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
        disabled={showPreview}
      />
      <button className="btn" type="submit" disabled={submitDisabled}>
        <IoIosSend className="icon" />
      </button>
    </form>
  );
};

export default MessageInput;
