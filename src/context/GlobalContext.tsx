import { GlobalContent } from '../interfaces';
import { createContext, useContext } from 'react';

export const GlobalContext = createContext<GlobalContent>({
  articles: [],
  setArticles: () => {},
  access: null,
  setAccess: () => null,
  isLoading: false,
  setIsLoading: () => false,

  // ------- ArticleHandler:
  label: 'list',
  setLabel: () => 'list',
  isDeletedArt: false,
  setIsDeletedArt: () => false,
  isUpdatedArt: false,
  setIsUpdatedArt: () => false,
  isPreview: false,
  setIsPreview: () => false,
});

export const useGlobalContext = () => useContext(GlobalContext);
