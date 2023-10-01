import {
  IArticle,
  IArticleElement,
  IArticleInput,
} from '../../../../../interfaces';
import * as constants from '../../../../../constants';
import {
  ApolloCache,
  ApolloQueryResult,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client';

const fls_add = constants.ARTICLE_HEADER_FIELDS_ADD;
const art_add = constants.ARTICLE_ELEMENTS_ADD;
const fls_edit = constants.ARTICLE_HEADER_FIELDS_EDIT;
const art_edit = constants.ARTICLE_ELEMENTS_EDIT;

export type UpdateArticleGql = (options?: GqlFunctionOptions) => GqlQueryResult;
export type DelArticlesGql = (options?: GqlFunctionOptions) => GqlFetchResult;
export type GetArticlesGql = (variables?: GqlVars) => GqlQueryResult;

export type GqlQueryResult = Promise<ApolloQueryResult<any>>;
export type GqlFetchResult = Promise<FetchResult<any>>;

export type GqlVars = Partial<OperationVariables>;
export type GqlFunctionOptions = MutationFunctionOptions<
  any,
  OperationVariables,
  DefaultContext,
  ApolloCache<any>
>;

export interface IUpdate {
  getArticles: GetArticlesGql;
  setArticles: (articles: IArticle[]) => void;
}

export interface IOne extends IUpdate {
  setIsUpdatedArt(b: boolean): void;
  clearStates(): void;
}

export interface IAdd extends IOne {
  articleInput: IArticleInput;
  addArticle: UpdateArticleGql;
}

export interface IEdit extends IOne {
  articleInput: IArticleInput;
  article: IArticle | null;
  editArticle: UpdateArticleGql;
}

export interface IDel {
  article: IArticle | null;
  deleteArticle: DelArticlesGql;
  setIsDeletedArt(b: boolean): void;
  getArticles: GetArticlesGql;
  setArticles: (articles: IArticle[]) => void;
}

export interface ISubmit extends IOne {
  articleElements: IArticleElement[];
  imageData: string;
  ipfs: string;
  title: string;
  description: string;
  author: string;
  setSubmitError(s: string): void;
  label: string;
  article: IArticle | null;
  addArticle: any;
  editArticle: any;
}

export const updateArticles = async (args: IUpdate) => {
  const updatedArticles = await args.getArticles();
  const { articles } = updatedArticles.data;
  articles && args.setArticles(articles);
};

export const addArticleRequest = async (blog: string, args: IAdd) => {
  // /*
  const { data } = await args.addArticle({
    variables: { blog, input: args.articleInput },
  });

  const { title } = data.addArticle;

  console.log('addArticle:', title);

  if (title) {
    args.setIsUpdatedArt(true);
    args.clearStates();
    updateArticles({
      getArticles: args.getArticles,
      setArticles: args.setArticles,
    });
    localStorage.removeItem(fls_add);
    localStorage.removeItem(art_add);
  }
  // */
};

export const editArticleRequest = async (args: IEdit) => {
  const id = args.article ? args.article.id : null;

  if (args.articleInput.image.includes('https')) {
    args.articleInput.image = '';
  }

  // /*
  const { data } = await args.editArticle({
    variables: { id, articleInput: args.articleInput },
  });

  console.log('Article edited:', data.editArticle);

  if (data.editArticle) {
    args.setIsUpdatedArt(true);
    args.clearStates();
    updateArticles({
      getArticles: args.getArticles,
      setArticles: args.setArticles,
    });
    localStorage.removeItem(fls_edit);
    localStorage.removeItem(art_edit);
  }
  // */
};

export const deleteArticleRequest = async (blog: string, args: IDel) => {
  if (!args.article) return;

  try {
    const { data } = await args.deleteArticle({
      variables: {
        blog,
        id: args.article.id,
      },
    });

    const deleted = data?.deleteArticle;

    console.log('deleteArticle:', deleted);

    args.setIsDeletedArt(deleted);
    updateArticles({
      getArticles: args.getArticles,
      setArticles: args.setArticles,
    });
  } catch (e) {
    console.error(e);
  }
};

export const handleSubmit = async (blog: string, args: ISubmit) => {
  const {
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
  } = args;

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

  const isSubmitError = Object.entries(articleInput).find(el => {
    if (el[0] !== 'ipfs' && !el[1]) return true;
    if (el[1].includes('Elements') && !el[1].includes('paragraph')) return true;
    if (!articleElements?.length) return true;
    return false;
  });

  if (!isSubmitError) {
    setSubmitError('');
  } else return setSubmitError('Check that it is filled in correctly');

  // console.log('isSubmitError', isSubmitError);
  // console.log('');

  // /*
  try {
    if (label === 'add')
      addArticleRequest(blog, {
        articleInput,
        addArticle,
        setIsUpdatedArt,
        clearStates,
        getArticles,
        setArticles,
      });

    if (label === 'edit')
      editArticleRequest({
        articleInput,
        article,
        editArticle,
        setIsUpdatedArt,
        clearStates,
        getArticles,
        setArticles,
      });
  } catch (e) {
    console.error(e);
  }
  // */
};
