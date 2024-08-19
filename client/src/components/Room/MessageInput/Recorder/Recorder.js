import { useState, useContext } from "react";

import { RiRecordCircleLine } from "react-icons/ri";

import AppContext from "../../../../context/AppContext.js";

import RecordingModal from "./RecorderModal.js";

const Recorder = () => {
  const { showPreview } = useContext(AppContext);
  const [isShownModal, setIsShownModal] = useState(false);

  return (
    <div className="container recorder">
      <button
        className="btn"
        onClick={() => setIsShownModal(true)}
        disabled={showPreview}
      >
        <RiRecordCircleLine className="icon" />
      </button>

      {isShownModal && <RecordingModal setShowModal={setIsShownModal} />}
    </div>
  );
};

export default Recorder;
