import { IArticle } from '.';

export interface IArticleListProps {
  handleOpenDetails(art: IArticle): void;
}

export interface IImageHandlerProps {
  cid: string;
  alt: string;
  grayscale: number;
}
