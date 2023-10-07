import fns, { DEFAULT_PUBLIC_IMAGE } from '../constants';

const defaultImage = DEFAULT_PUBLIC_IMAGE;
// const web3StorageIpfs = constants.IPFS_WEB3_STORAGE;

const setImageSrc = (blog: string, cid: string) =>
  cid ? `https://${cid}.${fns.getIpfsUrl(blog)}` : defaultImage;

export default setImageSrc;
