import { GlobalContent } from '../interfaces';
import { createContext, useContext } from 'react';

export const GlobalContext = createContext<GlobalContent>({
  articles: [],
  setArticles: () => {},
  access: null,
  setAccess: () => null,
  theme: 'light',
  setTheme: () => 'light',
  isLoading: false,
  setIsLoading: () => false,
});

export const useGlobalContext = () => useContext(GlobalContext);
