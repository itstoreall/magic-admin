import { CreateDataURL } from './types';

const createBase64: CreateDataURL = croppedCanvas =>
  croppedCanvas.toDataURL('image/jpeg', 0.7); // 0.8 - normal quality

export default createBase64;

/*

croppedCanvas.toDataURL(file.type, 0.7); // for file type instead jpeg

*/
