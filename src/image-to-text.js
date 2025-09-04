import React, { useEffect } from "react";
import { createWorker } from "tesseract.js";

const ImageToText = () => {
  const [imageURL, setImageURL] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [progressLabel, setProgressLabel] = React.useState("");
  const [results, setResults] = React.useState([]);
  const imageRef = React.createRef();

  const workerRef = React.useRef(null);

  useEffect(() => {
    async function initialize() {
      workerRef.current = await createWorker("eng");
    }
    initialize();
    return () => {
      workerRef.current.terminate();
      workerRef.current = null;
    };
  }, []);

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
    setResults([]);
  };

  const convertToText = async () => {
    setProgress(0);
    setProgressLabel("Starting");
    const worker = workerRef.current;
    if (!worker) return;
    await worker.load();

    const response = await worker.recognize(imageRef.current);
    setResults(response.data.text);
  };

  return (
    <div className="container">
      <h3>Image to Text</h3>
      <div>
        {imageURL && (
          <div>
            <img
              src={imageURL}
              width="500"
              crossOrigin="anonymous"
              alt="Upload Preview"
              ref={imageRef}
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          capture="camera"
          id="imageUpload"
          onChange={uploadImage}
        />
        {imageURL && workerRef.current && (
          <button onClick={convertToText}>Convert to Text</button>
        )}
        {progress > 0 && progress < 1 && (
          <div>
            <progress value={progress} max="1"></progress>
            <span>
              {Math.round(progress * 100)}% {progressLabel}
            </span>
          </div>
        )}
        {results.length > 0 && (
          <div className="result-container">
            <h5>Result:</h5>
            <p>{results}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToText;
