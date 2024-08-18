const FilePreviewContent = ({ type, pathToFile, fileName }) => {
  switch (type) {
    case "image":
      return <img src={pathToFile} alt={fileName} />;
    case "audio":
      return <audio src={pathToFile} controls></audio>;
    case "video":
      return <video src={pathToFile} controls></video>;
    default:
      return null;
  }
};

export default FilePreviewContent;
