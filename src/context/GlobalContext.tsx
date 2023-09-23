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
});

export const useGlobalContext = () => useContext(GlobalContext);
