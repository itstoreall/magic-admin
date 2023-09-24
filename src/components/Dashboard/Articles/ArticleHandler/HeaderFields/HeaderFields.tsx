import { IArticleHandler } from '../../../../../interfaces';
import { useAddArticleContext } from '../../../../../context/AddArticleContext';
import s from './HeaderFields.module.scss';
import ImageUploader from '../ImageUploader';
import { useGlobalContext } from '../../../../../context/GlobalContext';

const HeaderFields = ({ label }: IArticleHandler) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    submitError,
    setSubmitError,
  } = useAddArticleContext();

  const { isCreatedArt, setIsCreatedArt } = useGlobalContext();

  const handleInput = (event: any) => {
    submitError && setSubmitError('');

    isCreatedArt && setIsCreatedArt(false);
    const { name, value } = event.target;

    name === 'title' && setTitle(value);
    name === 'description' && setDescription(value);
  };

  return (
    <div className={`${s.headerFields}`}>
      {isCreatedArt ? (
        <p className={`${s.infoText}`}>{'Article successfully created!'}</p>
      ) : (
        <p className={`${s.infoText}`}>
          {label === 'add'
            ? 'Fill in all fields and add an image'
            : label === 'edit'
            ? 'Title and description'
            : 'Report a bug to the developer'}
        </p>
      )}

      {!isCreatedArt && (
        <div className={`${s.fields}`}>
          <input
            className={`${s.field} ${s.input}`}
            type='text'
            value={title}
            onChange={e => handleInput(e)}
            name='title'
            placeholder='Article title'
          />
          <textarea
            className={`${s.field} ${s.textarea}`}
            maxLength={525}
            value={description}
            onChange={e => handleInput(e)}
            name='description'
            placeholder='Description'
          />
        </div>
      )}

      <ImageUploader />
    </div>
  );
};

export default HeaderFields;
