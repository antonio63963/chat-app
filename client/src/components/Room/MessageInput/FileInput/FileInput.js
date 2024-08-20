import { useState, useRef, useContext, useEffect } from "react";
import { MdAttachFile } from "react-icons/md";

import AppContext from "../../../../context/AppContext";

import FilePreview from "./FilePrewiew.js";

const FileInput = () => {
  const { file, setNewFile } = useContext(AppContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!file) {
      inputRef.current.value = "";
    }
  }, [file]);

  return (
    <div className="container file">
      <input
        type="file"
        accept="image/*, audio/*, video/*"
        onChange={(e) => setNewFile(e.target.files[0])}
        className="visually-hidden"
        ref={inputRef}
      />
      {/* make click on hidden input */}
      <button className="btn" onClick={() => inputRef.current.click()}>
        <MdAttachFile className="icon" />
      </button>

      {file && <FilePreview />}
    </div>
  );
};

export default FileInput;
