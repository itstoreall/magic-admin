import { IImageHandlerProps } from '../../../../interfaces/articleList';
import { IPFS_WEB3_STORAGE } from '../../../../constants';
import defaultImage from '../../../../assets/images/defaultImage.jpg';

const ipfs = IPFS_WEB3_STORAGE;

const ImageHandler = ({ cid, alt, grayscale }: IImageHandlerProps) => {
  const setImageSrc = (cid: string) =>
    cid ? `https://${cid}.${ipfs}` : defaultImage;

  return (
    <img
      src={setImageSrc(cid)}
      alt={alt}
      width={900}
      height={450}
      style={{
        width: '100%',
        height: 'auto',
        filter: `grayscale(${grayscale}%)`,
      }}
    />
  );
};

export default ImageHandler;
