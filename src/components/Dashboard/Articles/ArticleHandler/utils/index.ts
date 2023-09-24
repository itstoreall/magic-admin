import { IArticleInput } from '../../../../../interfaces';
import * as constants from '../../../../../constants';

const fls_add = constants.ARTICLE_HEADER_FIELDS_ADD;
const art_add = constants.ARTICLE_ELEMENTS_ADD;
const fls_edit = constants.ARTICLE_HEADER_FIELDS_EDIT;
const art_edit = constants.ARTICLE_ELEMENTS_EDIT;

export const updateArticles = async (getArticles: any, setArticles: any) => {
  const updatedArticles = await getArticles();
  const { articles } = updatedArticles.data;
  articles && setArticles(articles);
};

export const addArticleRequest = async (
  articleInput: IArticleInput,
  addArticle: any,
  setIsCreatedArt: any,
  clearStates: any,
  getArticles: any,
  setArticles: any
) => {
  // console.log('articleInput for add -->', articleInput);

  // /*
  const { data } = await addArticle({ variables: { input: articleInput } });

  const { title } = data.addArticle;

  console.log('addArticle:', title);

  if (title) {
    setIsCreatedArt(true);
    clearStates();
    updateArticles(getArticles, setArticles);
    localStorage.removeItem(fls_add);
    localStorage.removeItem(art_add);
  }
  // */
};

export const editArticleRequest = async (
  articleInput: IArticleInput,
  article: any,
  editArticle: any,
  setIsCreatedArt: any,
  clearStates: any,
  getArticles: any,
  setArticles: any
) => {
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
    updateArticles(getArticles, setArticles);
    localStorage.removeItem(fls_edit);
    localStorage.removeItem(art_edit);
  }
  // */
};

export const deleteArticleRequest = async (
  article: any,
  deleteArticle: any,
  setIsDeletedArt: any,
  getArticles: any,
  setArticles: any
) => {
  if (!article) return;

  try {
    const { data } = await deleteArticle({
      variables: {
        id: article.id,
      },
    });

    const deleted = data?.deleteArticle;

    console.log('deleteArticle:', deleted);

    setIsDeletedArt(deleted);
    updateArticles(getArticles, setArticles);
  } catch (e) {
    console.error(e);
  }
};

export const handleSubmit = async (
  articleElements: any,
  imageData: string,
  ipfs: string,
  title: string,
  description: string,
  author: string,
  setSubmitError: any,
  label: any,
  article: any,
  addArticle: any,
  editArticle: any,
  setIsCreatedArt: any,
  clearStates: any,
  getArticles: any,
  setArticles: any
) => {
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

  console.log('articleInput', articleInput);

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
    if (label === 'add')
      addArticleRequest(
        articleInput,
        addArticle,
        setIsCreatedArt,
        clearStates,
        getArticles,
        setArticles
      );

    if (label === 'edit')
      editArticleRequest(
        articleInput,
        article,
        editArticle,
        setIsCreatedArt,
        clearStates,
        getArticles,
        setArticles
      );
  } catch (e) {
    console.error(e);
  }
  // */
};
