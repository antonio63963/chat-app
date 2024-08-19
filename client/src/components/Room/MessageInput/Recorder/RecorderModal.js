import { useState, useRef, useContext } from "react";
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillStopFill,
} from "react-icons/bs";

import AppContext from "../../../../context/AppContext.js";
import {
  isRecordingStarted,
  pauseRecording,
  resumeRecording,
  startRecording,
  stopRecording,
} from "../../../../utils/recording";

const RecordingModal = ({ setShowModal }) => {
  const { setNewFile } = useContext(AppContext);
  const [selectedMediaType, setSelectedMediaType] = useState("audio");
  const [isPaused, setIsPaused] = useState(false);
  const selectRecordType = useRef();
  const videoRef = useRef();

  const onChange = ({ target: { value } }) => {
    // audio or video
    setSelectedMediaType(value);
  };

  const pauseResume = () => {
    if (isPaused) {
      pauseRecording();
    } else {
      resumeRecording();
    }
    setIsPaused(!isPaused);
  };

  const start = async () => {
    if (isRecordingStarted()) {
      return pauseResume();
    }

    const stream = await startRecording(selectedMediaType);
    selectRecordType.current.style.display = "none";

    // if videoRecord:
    if (selectedMediaType === "video" && stream) {
      videoRef.current.style.display = "block";
      videoRef.current.src = stream;
    }
  };

  const stop = () => {
    const file = stopRecording();
    setIsPaused(false);
    setNewFile(file);
    setShowModal(false);
  };

  return (
    <div
      className="overlay"
      onClick={({ target }) => {
        if (target.className !== "overlay") return;
        setShowModal(false);
      }}
    >
      <div className="modal">
        <div ref={selectRecordType}>
          <h2>Select Type</h2>
          <select onChange={onChange}>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
        </div>
        {isRecordingStarted() && <p>{isPaused ? "Paused" : "Recording"}</p>}
        <video ref={videoRef} autoPlay muted />
        <div className="controls">
          <button className="btn play" onClick={start}>
            {isPaused ? (
              <BsFillPauseFill className="icon" />
            ) : (
              <BsFillPlayFill className="icon" />
            )}
          </button>
          {isRecordingStarted() && (
            <button className="btn stop" onClick={stop}>
              <BsFillStopFill className="icon" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordingModal;
