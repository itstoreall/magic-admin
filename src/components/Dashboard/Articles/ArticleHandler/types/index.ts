import * as apollo from '@apollo/client';
import {
  IArticle,
  IArticleElement,
  IArticleInput
} from '../../../../../interfaces';

export type UpdateArticleGql = (options?: GqlFunctionOptions) => GqlQueryResult;
export type DelArticlesGql = (options?: GqlFunctionOptions) => GqlFetchResult;
export type GetArticlesGql = (variables?: GqlVars) => GqlQueryResult;

export type GqlQueryResult = Promise<apollo.ApolloQueryResult<any>>;
export type GqlFetchResult = Promise<apollo.FetchResult<any>>;

export type GqlVars = Partial<apollo.OperationVariables>;
export type GqlFunctionOptions = apollo.MutationFunctionOptions<
  any,
  apollo.OperationVariables,
  apollo.DefaultContext,
  apollo.ApolloCache<any>
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
  tags: string[];
  author: string;
  setSubmitError(s: string): void;
  label: string;
  article: IArticle | null;
  addArticle: any;
  editArticle: any;
}
