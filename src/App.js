import React from "react";
import ImageDetection from "./image-detection";
import ImageIdentification from "./image-identification";
import ImageToText from "./image-to-text";

function App() {
  return (
    <div className="App">
      <ImageDetection />
      <ImageIdentification />
      <ImageToText />
    </div>
  );
}

export default App;
