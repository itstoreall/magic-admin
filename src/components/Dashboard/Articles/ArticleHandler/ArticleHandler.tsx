/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { IEditArticleProps } from '../../../../interfaces/editArticles';
import { IArticleElement } from '../../../../interfaces';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { ArticleHandlerContext } from '../../../../context/ArticleHandlerContext';
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
import * as utils from './utils';

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
  const [articleElements, setArticleElements] = useState<IArticleElement[]>([]);
  const [submitError, setSubmitError] = useState<string>('');

  const [isReset, setIsReset] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const {
    label,
    setArticles,
    access,
    isDeletedArt,
    setIsDeletedArt,
    isUpdatedArt,
    setIsUpdatedArt,
    isPreview,
    setIsPreview,
  } = useGlobalContext();

  const handleClickReset = () => setIsReset(!isReset);
  const handleClickDelete = () => setIsDelete(!isDelete);

  const [addArticle, { loading: addLoad, error: addErr }] =
    useMutation(ADD_ARTICLE);
  const [editArticle, { loading: editLoad, error: editErr }] =
    useMutation(EDIT_ARTICLE);
  const [deleteArticle, { loading: delLoad, error: delErr }] =
    useMutation(DELETE_ARTICLE);

  const { refetch: getArticles } = useQuery(GET_ARTICLES, {
    variables: { blog: access?.blog },
  });

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
    localStorage.removeItem(fls_edit);
    localStorage.removeItem(art_edit);
    clearStates();

    if (label === 'add') {
      const lsFields = JSON.parse(localStorage.getItem(fls_add) || 'null');
      const lsElements = JSON.parse(localStorage.getItem(art_add) || 'null');

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

      if (articleElements?.length) {
        localStorage.setItem(art_add, JSON.stringify({ articleElements }));
      }

      access && !author && setAuthor(access?.author);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, articleElements]);

  useEffect(() => {
    if (label === 'add') {
      localStorage.removeItem(fls_add);
      localStorage.removeItem(art_add);
      clearStates();
      access && !author && setAuthor(access?.author);
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
      if (isPreview) {
        localStorage.setItem(fls_edit, JSON.stringify({ title, description }));
        localStorage.setItem(art_edit, JSON.stringify({ articleElements }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPreview]);

  return (
    <ArticleHandlerContext.Provider
      value={{
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
        articleElements,
        setArticleElements,
        submitError,
        setSubmitError,
      }}
    >
      {!isDeletedArt ? (
        <div className={`${s.articleHandlerWrap} ${s['dark']}`}>
          {!isPreview && !isUpdatedArt && (
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
                        <Button
                          fn={() =>
                            utils.deleteArticleRequest({
                              article,
                              deleteArticle,
                              setIsDeletedArt,
                              getArticles,
                              setArticles,
                            })
                          }
                        >
                          Delete
                        </Button>
                        <Button fn={handleClickDelete}>Cancel</Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {!isUpdatedArt ? (
            <>
              <div className={s.articleHandler}>
                {!isPreview ? (
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
                  onClick={() =>
                    utils.handleSubmit({
                      articleElements,
                      imageData,
                      ipfs,
                      title,
                      description,
                      author,
                      setSubmitError,
                      label,
                      article,
                      addArticle,
                      editArticle,
                      setIsUpdatedArt,
                      clearStates,
                      getArticles,
                      setArticles,
                    })
                  }
                  disabled={addLoad || editLoad || delLoad}
                  // style={{ backgroundColor: 'teal' }}
                  // hover={{ backgroundColor: 'tomato' }}
                >
                  Publish
                </button>

                <button onClick={() => setIsPreview(!isPreview)}>
                  {isPreview ? 'Editor' : 'Preview'}
                </button>
              </div>
              <div className={s.submitErrors}>
                {submitError && <p>{submitError}</p>}
                {addErr && <p>Error: {addErr.message}</p>}
                {editErr && <p>Error: {editErr.message}</p>}
                {delErr && <p>Error: {delErr.message}</p>}
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
    </ArticleHandlerContext.Provider>
  );
};

export default ArticleHandler;
