import { SetStateAction } from 'react';
import { SelectOption } from '../../../../../../types';

export type TagsProps = {
  blogTags: string[] | null;
  articleTags: string[] | null;
  localTags: string[] | null;
  setLocalTags: (s: string[]) => void;
  isReset: number | null;
  handleClickReset: (v: number | null) => void;
};

export type OptionsType = SetStateAction<SelectOption[] | null>;

export type UpdateOptionsArgs = {
  label: string;
  tags: string[];
  selectedTag: string;
};

export type UpdateOptions = (args: UpdateOptionsArgs) => void;
