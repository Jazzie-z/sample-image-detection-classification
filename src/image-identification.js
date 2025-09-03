import React, { useState, useEffect } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";

const ImageIdentification = () => {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [results, setResults] = useState([]);
  const imageRef = React.createRef();

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

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

  const identify = async () => {
    const output = await model.classify(imageRef.current);
    setResults(output);
  };

  useEffect(() => {
    loadModel();
  }, []);

  if (isModelLoading) return <h3>Model Loading...</h3>;

  return (
    <div className="container">
      <h3>Image Identification</h3>
      <div>
        {imageURL && (
          <div>
            <img
              src={imageURL}
              width="500"
              crossOrigin="anonymous"
              alt="Upload Preview"
              ref={imageRef}
              onClick={identify}
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
        {results.length > 0 && (
          <div className="result-container">
            <h3>Results:</h3>
            {results.map((result, index) => {
              return (
                <div key={index} className="classification">
                  <b>{result.className}</b>
                  <div>
                    Confidence level: {Math.floor(result.probability * 100)}%
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageIdentification;
