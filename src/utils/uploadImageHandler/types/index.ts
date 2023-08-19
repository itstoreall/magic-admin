export type SetImageData = (data: string) => void;

export type CreateDataURL = (
  // setImageData: SetImageData,
  croppedCanvas: HTMLCanvasElement
) => string;
