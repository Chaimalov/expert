export function generateAvatar(
  text: string,
  foregroundColor = "white",
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) throw new Error("Unable to get canvas context");

  canvas.width = 200;
  canvas.height = 200;

  // Draw background
  context.fillStyle = `hsl(${text.charCodeAt(0) * 2}, 50%, 50%)`;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.font = "bold 100px arial";
  context.fillStyle = foregroundColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text.toUpperCase(), canvas.width / 2.1, canvas.height / 1.9);

  return canvas.toDataURL("image/png");
}
