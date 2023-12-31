import { IArticleHandlerContext } from '../interfaces';
import { createContext, useContext } from 'react';

export const ArticleHandlerContext = createContext<IArticleHandlerContext>({
  imageData: '',
  setImageData: () => '',
  title: '',
  setTitle: () => '',
  description: '',
  setDescription: () => '',
  author: '',
  setAuthor: () => '',
  textareaValue: '',
  setTextareaValue: () => '',
  editIndex: null,
  setEditIndex: () => 0,
  articleElements: [],
  setArticleElements: () => {},
  submitError: '',
  setSubmitError: () => '',
});

export const useArticleHandlerContext = () => useContext(ArticleHandlerContext);
