import { createContext } from "react";

const AppContext = createContext({
  file: null,
  showPreview: false,
  showEmoji: false,
  setFile: (file) => {},
  setNewFile: (newFile) => {
    if (this.file) {
      URL.revokeObjectURL(this.file);
    }
    this.setFile(newFile);
  },
  setShowPreview: (showPreview) => {},
  setShowEmoji: (showEmoji) => {},
});

export default AppContext;
