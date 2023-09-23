import { IArticleHandler } from '../../../../../interfaces';
import { useAddArticleContext } from '../../../../../context/AddArticleContext';
import s from './HeaderFields.module.scss';
import ImageUploader from '../ImageUploader';

const HeaderFields = ({ article, label }: IArticleHandler) => {
  const {
    isArticle,
    setIsArticle,
    title,
    setTitle,
    description,
    setDescription,
    submitError,
    setSubmitError,
  } = useAddArticleContext();

  const handleInput = (event: any) => {
    submitError && setSubmitError('');

    isArticle && setIsArticle(false);
    const { name, value } = event.target;

    name === 'title' && setTitle(value);
    name === 'description' && setDescription(value);
  };

  return (
    <div className={`${s.headerFields}`}>
      {isArticle ? (
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

      {!isArticle && (
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
