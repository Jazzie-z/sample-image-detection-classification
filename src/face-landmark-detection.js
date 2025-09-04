import React from "react";
import Webcam from "react-webcam";
import * as facemesh from "@tensorflow-models/facemesh";
import { drawMesh } from "./util";

const FaceLandmarkDetection = () => {
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });

    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces(video);
      console.log(face);

      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);
    }
  };

  React.useEffect(() => {
    runFacemesh();
  }, []);

  return (
    <div className="container">
      <h3>Face Mesh</h3>
      <div className="video-container">
        <header className="video-header">
          <Webcam
            ref={webcamRef}
            muted={true}
            style={{
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 8,
              width: 640,
              height: 480,
            }}
          />
        </header>
      </div>
    </div>
  );
};

export default FaceLandmarkDetection;
