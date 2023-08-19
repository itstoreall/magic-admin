import * as constants from '../constants';

const defaultImage = constants.DEFAULT_PUBLIC_IMAGE;
const web3StorageIpfs = constants.IPFS_WEB3_STORAGE;

const setImageSrc = (cid: string) =>
  cid ? `https://${cid}.${web3StorageIpfs}` : defaultImage;

export default setImageSrc;
