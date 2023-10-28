import { ISelectOption } from '../../../../interfaces';

export type BlogTagsType = string[];

export interface IDelAuthorFromBlog {
  admins: ISelectOption[];
  blogs: { [key: string]: ISelectOption[] };
}

export interface IAllAdmsRes {
  name: string;
  blogs: string[];
}

export interface IAllBlogsRes {
  id: string;
  title: string;
  authors: string[];
}

export interface IAdminActionProps {
  formContent: string;
  title: string;
  closeForm: (s: string) => void;
}
