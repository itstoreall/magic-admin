type NormalizeImageSize = (
  img: HTMLImageElement | HTMLVideoElement
) => HTMLCanvasElement;

const normalizeImageSize: NormalizeImageSize = img => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    console.error(
      'Error in normalizeImageSize: Canvas context is not supported'
    );

    return canvas;
  }

  const maxWidth = 900;
  const maxHeight = 450;

  const scaleByWidth = maxWidth / img.width;
  const scaleByHeight = maxHeight / img.height;

  const scaleFactor =
    img.width > img.height
      ? img.width >= maxWidth
        ? scaleByWidth
        : (img.width * maxHeight) / img.height < maxWidth
        ? scaleByWidth
        : scaleByHeight
      : scaleByWidth;

  const newWidth = img.width * scaleFactor;
  const newHeight = img.height * scaleFactor;

  canvas.width = newWidth;
  canvas.height = newHeight;

  context.drawImage(img, 0, 0, newWidth, newHeight);

  return canvas;
};

export default normalizeImageSize;
