import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useAddArticleContext } from '../../../../../context/AddArticleContext';
import useProportion from '../../../../../hooks/useProportion';
import s from './ImageUploader.module.scss';
import base64Converter from '../../../../../utils/uploadImageHandler';
import { useEffect } from 'react';

const ImageUploader = () => {
  const { theme } = useGlobalContext();
  const { width, height } = useProportion(900, 450, 64);

  const { imageData, setImageData, submitError, setSubmitError } =
    useAddArticleContext();

  useEffect(() => {
    submitError && setSubmitError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData]);

  return (
    <div className={`${s.imageUploader} ${s[theme]}`}>
      {imageData && (
        <div className={s.thumb}>
          <img
            src={imageData}
            alt='Загружаемое изображение'
            width={width}
            height={height}
          />
        </div>
      )}

      <label>
        {imageData ? 'Изменить изображение' : 'Выбрать изображение'}
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
