import { ChangeEvent, FC, ReactElement, ReactNode } from 'react';
import { IArticleElement } from '../interfaces';

export type SelectOption = { value: string; label: string };

export type Button = (props: {
  type?: 'button' | 'submit' | 'reset';
  fn?: () => void;
  style?: { [key: string]: string | number };
  hover?: { [key: string]: string | number };
  disabled?: boolean;
  children: ReactNode;
}) => ReactElement;

export type TitleType = FC<{
  tag?: keyof JSX.IntrinsicElements;
  text: string;
  styles?: string;
}>;

// ----------------- Add article

export type MoveElement = (
  array: IArticleElement[],
  fromIndex: number,
  toIndex: number
) => void;

export type ChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => void;

export type ChangeTextareaValue = (
  event: ChangeEvent<HTMLTextAreaElement>
) => void;
