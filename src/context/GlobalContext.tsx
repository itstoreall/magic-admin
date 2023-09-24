import { GlobalContent } from '../interfaces';
import { createContext, useContext } from 'react';

export const GlobalContext = createContext<GlobalContent>({
  label: 'list',
  setLabel: () => 'list',
  articles: [],
  setArticles: () => {},
  access: null,
  setAccess: () => null,
  isLoading: false,
  setIsLoading: () => false,

  // ------- ArticleHandler:
  isDeletedArt: false,
  setIsDeletedArt: () => false,
  isCreatedArt: false,
  setIsCreatedArt: () => false,
});

export const useGlobalContext = () => useContext(GlobalContext);
