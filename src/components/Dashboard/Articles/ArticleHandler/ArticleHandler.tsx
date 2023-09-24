/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { IEditArticleProps } from '../../../../interfaces/editArticles';
import { IArticleElement, IArticleInput } from '../../../../interfaces';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { AddArticleContext } from '../../../../context/AddArticleContext';
import ADD_ARTICLE from '../../../../gql/addArticle';
import EDIT_ARTICLE from '../../../../gql/editArticle';
import GET_ARTICLES from '../../../../gql/getArticles';
import DELETE_ARTICLE from '../../../../gql/deleteArticle';
import * as constants from '../../../../constants';
import setImageSrc from '../../../../utils/setImageSrc';
import s from './ArticleHandler.module.scss';
import Button from '../../../Button';
import Delete from '../../../../assets/icons/Delete';
import { middleDark, colorGreen } from '../../../../theme';
import Reset from '../../../../assets/icons/Reset';
import HeaderFields from './HeaderFields';
import ArticleEditor from './ArticleEditor';
import ArticleDetails from './ArticleDetails';
import Success from '../../../../assets/icons/Success';

const fls_add = constants.ARTICLE_HEADER_FIELDS_ADD;
const art_add = constants.ARTICLE_ELEMENTS_ADD;
const fls_edit = constants.ARTICLE_HEADER_FIELDS_EDIT;
const art_edit = constants.ARTICLE_ELEMENTS_EDIT;

const ArticleHandler = ({ article }: IEditArticleProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [imageData, setImageData] = useState<string>('');
  const [ipfs, setIpfs] = useState<string>('');

  const [textareaValue, setTextareaValue] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isDisplayArticle, setIsDisplayArticle] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [articleElements, setArticleElements] = useState<IArticleElement[]>([]);
  const [submitError, setSubmitError] = useState<string>('');

  // ---

  const [isReset, setIsReset] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  console.log('articleElements', articleElements);

  const {
    label,
    setArticles,
    access,
    isDeletedArt,
    setIsDeletedArt,
    isCreatedArt,
    setIsCreatedArt,
  } = useGlobalContext();

  const handleClickReset = () => setIsReset(!isReset);
  const handleClickDelete = () => setIsDelete(!isDelete);

  const [addArticle, { loading, error }] = useMutation(ADD_ARTICLE);
  const [editArticle, { loading: editLoading, error: editError }] =
    useMutation(EDIT_ARTICLE);

  const { refetch: getArticles } = useQuery(GET_ARTICLES);
  const [DeleteArticle] = useMutation(DELETE_ARTICLE);

  const clearStates = () => {
    setImageData('');
    setIpfs('');
    setTitle('');
    setDescription('');
    setAuthor('');
    setEditIndex(null);
    setTextareaValue('');
    setArticleElements([]);
    isPreview && setIsPreview(false);
  };

  useEffect(() => {
    console.log('author =-=-=->>>', author);
  }, [author]);

  useEffect(() => {
    localStorage.removeItem(fls_edit);
    localStorage.removeItem(art_edit);
    clearStates();

    if (label === 'add') {
      const lsFields = JSON.parse(localStorage.getItem(fls_add) || 'null');
      const lsElements = JSON.parse(localStorage.getItem(art_add) || 'null');

      // console.log(2, 'label:', label);
      // console.log(2, 'lsFields:', lsFields);

      access && !author && setAuthor(access?.author);

      if (lsFields) {
        setTitle(lsFields.title);
        setDescription(lsFields.description);
      }

      if (lsElements) {
        setArticleElements(lsElements.articleElements);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  useEffect(() => {
    if (label === 'add') {
      if (title?.length || description?.length) {
        localStorage.setItem(
          fls_add,
          JSON.stringify({ title, description, author })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description]);

  useEffect(() => {
    if (label === 'add' && isReset) {
      localStorage.removeItem(fls_add);
      localStorage.removeItem(art_add);
      clearStates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReset]);

  useEffect(() => {
    if (label === 'edit' && article) {
      const { articleElements } = JSON.parse(article.text);

      if (articleElements) {
        setTitle(article.title);
        setDescription(article.description);
        setImageData(article.ipfs ? setImageSrc(article.ipfs) : '');
        setIpfs(article.ipfs);
        setArticleElements(articleElements);
        setAuthor(article?.author);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  useEffect(() => {
    if (label === 'edit') {
      if (isDisplayArticle) {
        setIsPreview(true);
        localStorage.setItem(fls_edit, JSON.stringify({ title, description }));
        localStorage.setItem(art_edit, JSON.stringify({ articleElements }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisplayArticle]);

  const updateArticles = async () => {
    const updatedArticles = await getArticles();
    const { articles } = updatedArticles.data;
    articles && setArticles(articles);
  };

  const addArticleRequest = async (articleInput: IArticleInput) => {
    console.log('articleInput for add -->', articleInput);

    // /*
    const { data } = await addArticle({ variables: { input: articleInput } });

    const { title } = data.addArticle;

    console.log('addArticle:', title);

    if (title) {
      setIsCreatedArt(true);
      clearStates();
      updateArticles();
    }
    // */
  };

  const editArticleRequest = async (articleInput: IArticleInput) => {
    const id = article ? article.id : null;

    if (articleInput.image.includes('https')) {
      articleInput.image = '';
    }

    console.log('articleInput for edit -->', articleInput);

    // /*
    const { data } = await editArticle({ variables: { id, articleInput } });

    console.log('Article edited:', data.editArticle);

    if (data.editArticle) {
      setIsCreatedArt(true);
      clearStates();
      updateArticles();
    }
    // */
  };

  const handleSubmit = async () => {
    const text = JSON.stringify({ articleElements });

    const articleInput = {
      image: imageData,
      ipfs: ipfs,
      title: title,
      description: description,
      author: author,
      text: text,
      tags: ['magic'],
    };

    let isSubmitError: boolean = false;

    // eslint-disable-next-line array-callback-return
    Object.entries(articleInput).find(el => {
      if (el[0] !== 'ipfs' && !el[1]) isSubmitError = true;
      console.log(el[0]);
      console.log(el[0] !== 'ipfs', !el[1]);

      if (el[1].includes('articleElements')) {
        if (!articleElements) isSubmitError = true;
      }
    });

    if (!isSubmitError) {
      setSubmitError('');
    } else return setSubmitError('Check that it is filled in correctly');

    console.log('isSubmitError', isSubmitError);
    console.log('');

    // /*
    try {
      label === 'add'
        ? addArticleRequest(articleInput)
        : label === 'edit'
        ? editArticleRequest(articleInput)
        : null;
    } catch (e) {
      console.error(e);
    }
    // */
  };

  const handleDelete = async () => {
    if (!article) return;

    try {
      const { data } = await DeleteArticle({
        variables: {
          id: article.id,
        },
      });

      const deleted = data?.deleteArticle;

      console.log('deleteArticle:', deleted);

      setIsDeletedArt(deleted);
      updateArticles();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AddArticleContext.Provider
      value={{
        // isArticle,
        // setIsArticle,
        imageData,
        setImageData,
        title,
        setTitle,
        description,
        setDescription,
        author,
        setAuthor,
        textareaValue,
        setTextareaValue,
        editIndex,
        setEditIndex,
        isDisplayArticle,
        setIsDisplayArticle,
        isPreview,
        setIsPreview,
        articleElements,
        setArticleElements,
        submitError,
        setSubmitError,
      }}
    >
      {!isDeletedArt ? (
        <div className={`${s.articleHandlerWrap} ${s['dark']}`}>
          {!isDisplayArticle && !isCreatedArt && (
            <>
              {label === 'add' ? (
                <div
                  className={`${s.actionButton} ${isReset ? s.isReset : ''}`}
                  onClick={handleClickReset}
                >
                  <Reset fill={middleDark} />
                </div>
              ) : (
                <div
                  className={`${s.actionButton} ${isDelete ? s.isDelete : ''}`}
                  onClick={handleClickDelete}
                >
                  {!isDelete ? (
                    <Delete fill={middleDark} el={'article'} />
                  ) : (
                    <div>
                      <p className={s.deleteText}>Delete this article?</p>
                      <div className={s.deleteButtonWrap}>
                        <Button fn={() => handleDelete()}>Delete</Button>
                        <Button fn={handleClickDelete}>Cancel</Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {!isCreatedArt ? (
            <>
              <div className={s.articleHandler}>
                {!isDisplayArticle ? (
                  <>
                    <HeaderFields label={label} />
                    <ArticleEditor />
                  </>
                ) : (
                  <div className={s.articlePreview}>
                    <ArticleDetails
                      imageData={imageData}
                      title={title}
                      description={description}
                      author={author}
                      articleElements={articleElements}
                      timestamp={article ? article.timestamp : null}
                    />
                  </div>
                )}
              </div>

              <div className={s.mainButtons}>
                <button
                  type='button'
                  onClick={() => handleSubmit()}
                  disabled={loading || editLoading}
                  // style={{ backgroundColor: 'teal' }}
                  // hover={{ backgroundColor: 'tomato' }}
                >
                  Publish
                </button>

                <button onClick={() => setIsDisplayArticle(!isDisplayArticle)}>
                  {isDisplayArticle ? 'Editor' : 'Preview'}
                </button>
              </div>
              <div className={s.submitErrors}>
                {submitError && <p>{submitError}</p>}
                {error && <p>Error: {error.message}</p>}
                {editError && <p>Error: {editError.message}</p>}
              </div>
            </>
          ) : (
            <div className={s.successPopup}>
              <div className={s.successContent}>
                <Success fill={colorGreen} />
                <span className={s.successMessage}>
                  {label === 'add'
                    ? 'Article successfully created!'
                    : label === 'edit'
                    ? 'Article successfully modified!'
                    : null}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={s.successPopup}>
          <div className={s.successContent}>
            <Success fill={colorGreen} />
            <span className={s.successMessage}>
              Article successfully deleted!
            </span>
          </div>
        </div>
      )}
    </AddArticleContext.Provider>
  );
};

export default ArticleHandler;
