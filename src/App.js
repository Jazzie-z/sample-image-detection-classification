import React from "react";
import ImageDetection from "./image-detection";
import ImageIdentification from "./image-identification";
import ImageToText from "./image-to-text";
import FaceLandmarkDetection from "./face-landmark-detection";

function App() {
  return (
    <div className="App">
      <ImageDetection />
      <FaceLandmarkDetection />
      <ImageIdentification />
      <ImageToText />
    </div>
  );
}

export default App;
