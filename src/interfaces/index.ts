import { Dispatch, ReactNode, SetStateAction } from 'react'; // FormEvent

export interface IAccess {
  isAdmin: boolean;
  author: string;
  blog: string;
}

export interface IArticleInput {
  image: string;
  ipfs: string;
  title: string;
  description: string;
  author: string;
  text: string;
  tags: string[];
}

export interface IArticleHandlerInput extends IArticleInput {
  image: string;
}

export interface IArticle extends IArticleInput {
  id: string;
  views: string | null;
  timestamp: string;
}

export type GlobalContent = {
  label: string;
  setLabel: (str: string) => void;
  access: IAccess | null;
  setAccess: (access: IAccess | null) => void;
  articles: any[];
  setArticles: (articles: any[]) => void;
  theme: string;
  setTheme: (theme: string) => void;
  isLoading: boolean;
  setIsLoading: (b: boolean) => void;
};

export interface IContainerProps {
  parent: string;
  children: ReactNode;
}

export interface IChld {
  children: ReactNode;
}

// ----------------- gql

export interface IDataTypename {
  [x: string]: string | number | string[];
  __typename: string;
}

// ----------------- Form (React-Select)

export interface ISelectOption {
  value: string;
  label: string;
}

// ----------------- Themes

// export interface ITheme {
//   background: string;
//   backgroundBlur: string;
//   backgroundHover: string;
//   secondaryBackground: string;
//   contrastBackground: string;
//   contrastBackgroundHover: string;
//   text: string;
//   textInvert: string;
//   button: string;
//   buttonHover: string;
// }

// ----------------- Article Handler

export interface IArticleHandler {
  article?: IArticle | null;
  label: string;
}

export interface IArticleElement {
  name: string;
  text: string;
}

export interface IAddArticleContext {
  isArticle: boolean;
  setIsArticle: (b: boolean) => void;
  imageData: string;
  setImageData: (s: string) => void;
  title: string;
  setTitle: (s: string) => void;
  description: string;
  setDescription: (s: string) => void;
  author: string;
  setAuthor: (s: string) => void;
  textareaValue: string;
  setTextareaValue: (s: string) => void;
  editIndex: number | null;
  setEditIndex: (n: number | null) => void;
  isDisplayArticle: boolean;
  setIsDisplayArticle: (b: boolean) => void;
  isPreview: boolean;
  setIsPreview: (b: boolean) => void;
  articleElements: IArticleElement[];
  setArticleElements: Dispatch<SetStateAction<IArticleElement[]>>;
  submitError: string;
  setSubmitError: (s: string) => void;
}
