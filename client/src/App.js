import { BrowserRouter } from "react-router-dom";

import AppContext from "./context/AppContext";
import "./App.css";
import AppRoutes from "./routes/app.routes";
import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  return (
    <BrowserRouter>
      <AppContext.Provider
        file={file}
        setFile={setFile}
        showEmoji={showEmoji}
        setShowEmoji={setShowEmoji}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
      >
        <AppRoutes />
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
