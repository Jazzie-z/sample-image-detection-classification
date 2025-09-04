export const drawRect = (detections, context) => {
  detections.forEach((detection) => {
    const [x, y, width, height] = detection["bbox"];
    const text = detection["class"];

    const color = "Red";
    context.strokeStyle = color;
    context.font = "18px Arial";
    context.fillStype = color;

    context.beginPath();
    context.fillText(text, x, y);
    context.rect(x, y, width, height);
    context.stroke();
  });
};

export const drawMesh = (predictions, context) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const keypoints = prediction.scaledMesh;

      for (let i = 0; i < keypoints.length; i++) {
        const [x, y] = keypoints[i];
        context.beginPath();
        context.arc(x, y, 1 /* radius */, 0, 3 * Math.PI);
        context.fillStyle = "aqua";
        context.fill();
      }
    });
  }
};
