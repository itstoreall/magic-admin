import { IImageHandlerProps } from '../../../../interfaces/articleList';
import fns from '../../../../constants';
import defaultImage from '../../../../assets/images/defaultImage.jpg';
import { useGlobalContext } from '../../../../context/GlobalContext';

// const ipfs = IPFS_WEB3_STORAGE;

const ImageHandler = ({ cid, alt, grayscale }: IImageHandlerProps) => {
  const { access } = useGlobalContext();

  const setImageSrc = (cid: string) =>
    cid
      ? `https://${cid}.${fns.getIpfsUrl(access?.blog ? access?.blog : '')}`
      : defaultImage;

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
