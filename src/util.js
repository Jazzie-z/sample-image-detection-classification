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
