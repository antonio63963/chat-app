import { GiSpeaker } from "react-icons/gi";

const MessageContent =({message, pathToFile}) => {
  switch (message.messageType) {
    case "text":
      return (
        <>
          <button className="btn" onClick={() => {}}>
            <GiSpeaker className="icon speak" />
          </button>
          <p>{message.textOrPathToFile}</p>
        </>
      );
    case "image":
      return <img src={pathToFile} alt="" />;
    case 'audio':
      return <audio src={pathToFile} controls></audio>;
    case "video":
      return <video src={pathToFile} controls></video>;
    default:
      return null;
  }
};

export default MessageContent;
