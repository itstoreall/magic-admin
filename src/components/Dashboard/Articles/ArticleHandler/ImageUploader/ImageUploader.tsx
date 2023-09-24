import { useArticleHandlerContext } from '../../../../../context/ArticleHandlerContext';
import useProportion from '../../../../../hooks/useProportion';
import s from './ImageUploader.module.scss';
import base64Converter from '../../../../../utils/uploadImageHandler';
import { useEffect } from 'react';

const ImageUploader = () => {
  const { width, height } = useProportion(900, 450, 64);

  const { imageData, setImageData, submitError, setSubmitError } =
    useArticleHandlerContext();

  useEffect(() => {
    submitError && setSubmitError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData]);

  return (
    <div className={`${s.imageUploader}`}>
      {imageData && (
        <div className={s.thumb}>
          <img
            src={imageData}
            alt='Article preview'
            width={width}
            height={height}
          />
        </div>
      )}

      <label>
        {imageData ? 'Change the image' : 'Download image'}
        <input
          className={s.fileInput}
          type='file'
          accept='.jpg, .jpeg, .png'
          onChange={base64Converter(setImageData)}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
