type CropImage = (canvas: HTMLCanvasElement) => HTMLCanvasElement;

const cropImage: CropImage = canvas => {
  const cropWidth = 900;
  const cropHeight = 450;

  const croppedCanvas = document.createElement('canvas');
  const croppedContext = croppedCanvas.getContext('2d');

  if (!croppedContext) {
    console.error(
      'Error in base64Converter: Cropped canvas context is not supported'
    );

    return croppedCanvas;
  }

  const centerX = (canvas.width - cropWidth) / 2;
  const centerY = (canvas.height - cropHeight) / 2;

  croppedCanvas.width = cropWidth;
  croppedCanvas.height = cropHeight;

  croppedContext.drawImage(
    canvas,
    centerX,
    centerY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  return croppedCanvas;
};

export default cropImage;
