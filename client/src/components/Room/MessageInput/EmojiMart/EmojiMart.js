import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import AppContext from "../../../../context/AppContext";
import { useCallback, useContext, useEffect } from "react";
import { BsEmojiSmile } from "react-icons/bs";

const EmojiMart = ({ setText, messageInput }) => {
  const context = useContext(AppContext);
  const { showEmoji, setShowEmoji, showPreview } = context;

  const onKeydown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setShowEmoji(false);
      }
    },
    [setShowEmoji]
  );
  useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [onKeydown]);

  //add emoji to text message
  const onSelected = ({ native }) => {
    setText((text) => text + native);
    messageInput.focus();
  };

  return (
    <div className="container emoji">
      <button
        className="btn"
        type="button"
        onClick={() => setShowEmoji(!showEmoji)}
        disabled={showPreview}
      >
        <BsEmojiSmile className="icon" />
      </button>

      {showEmoji && (
        <Picker
          onSelect={onSelected}
          emojiSize={20}
          showPreview={false}
          perLine={6}
        />
      )}
    </div>
  );
};

export default EmojiMart;

