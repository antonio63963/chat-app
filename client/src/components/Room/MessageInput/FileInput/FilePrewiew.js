import { useEffect, useState, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";

import AppContext from "../../../../context/AppContext";

import FilePreviewContent from "./FilePreviewContent";

const FilePreview = () => {
  const { file, setNewFile } = useContext(AppContext);
  const [src, setSrc] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    if (file) {
      setSrc(URL.createObjectURL(file));
      setType(file.type.split("/")[0]);
    }
  }, [file]);

  return (
    <div className="container preview">
      <FilePreviewContent type={type} fileName={file.name} pathToFile={src} />
      <button className="btn close" onClick={() => setNewFile(null)}>
        <AiOutlineClose className="icon close" />
      </button>
    </div>
  );
};

export default FilePreview;
