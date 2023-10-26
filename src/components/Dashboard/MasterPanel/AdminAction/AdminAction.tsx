import { useEffect, useLayoutEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import GET_ALL_ADMINS from '../../../../gql/getAllAdmins';
import GET_ALL_BLOGS from '../../../../gql/getAllBlogs';
import GET_BLOG_TAGS from '../../../../gql/getBlogTags';
import ADD_NEW_AUTHOR from '../../../../gql/addNewAuthor';
import DELETE_AUTHOR_FROM_BLOG from '../../../../gql/deleteAuthorFromBlog';
import ADD_AUTHOR_TO_BLOG from '../../../../gql/addAuthorToBlog';
import { ISelectOption as ISO } from '../../../../interfaces';
import setUpperFirstChar from '../../../../utils/setUpperFirstChar';
// import Spinner from '../../../Loading/Spinner';
import cfg from '../config/masterPanel.config';
import AddNewAuthor from './Actions/AddNewAuthor';
import DelAuthorFromBlog from './Actions/DelAuthorFromBlog';
import AddAuthorToBlog from './Actions/AddAuthorToBlog';
import UpdateBlogTags from './Actions/UpdateBlogTags';
import { removeDataTypename } from '../../../../utils/removeDataTypename';
import getLocalStorageItem from '../../../../utils/getLocalStorageItem';
import s from './AdminAction.module.scss';

const GAA = GET_ALL_ADMINS;
const GAB = GET_ALL_BLOGS;
const GBT = GET_BLOG_TAGS;
const ANA = ADD_NEW_AUTHOR;
const DAFB = DELETE_AUTHOR_FROM_BLOG;
const AATB = ADD_AUTHOR_TO_BLOG;

// export type AddAuthorToBlog = ISO;

export type BlogTags = string[];

export interface IDelAuthorFromBlog {
  admins: ISO[];
  blogs: { [key: string]: ISO[] };
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

// export interface IDataTypename {
//   [x: string]: any;
//   __typename: string;
// }

const opts = process.env.REACT_APP_OPTIONS;
const adm = process.env.REACT_APP_ADMIN_ACCESS;

const AdminAction = ({ formContent, title, closeForm }: IAdminActionProps) => {
  const [blog, setBlog] = useState<ISO | null>(null);
  const [authorName, setAuthorName] = useState<string>('');
  const [blogSelect, setBlogSelect] = useState<ISO | null>(null);
  const [authorSelect, setAuthorSelect] = useState<ISO | null>(null);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitError, setIsSubmitError] = useState<boolean>(false);

  const [allAdmins, setAllAdmins] = useState<IAllAdmsRes[] | null>(null);
  const [allBlogs, setAllBlogs] = useState<IAllBlogsRes[] | null>(null);
  const [blogTags, setBlogTags] = useState<BlogTags>([]);

  const [getAllAdmins] = useLazyQuery(GAA);
  const [getAllBlogs] = useLazyQuery(GAB);
  const [getBlogTags] = useLazyQuery(GBT);
  const [addAdmin, { error: createError }] = useMutation(ANA);
  const [deleteAuthorFromBlog, { error: delError }] = useMutation(DAFB);
  const [addAuthorToBlogGql, { error: addError }] = useMutation(AATB);

  const { addNewAuthor, delAuthorFromBlog, addAuthorToBlog, updateBlogTags } =
    cfg.content;

  const dAFB = cfg.content.delAuthorFromBlog;
  const aATB = cfg.content.addAuthorToBlog;
  const uBT = cfg.content.updateBlogTags;

  useLayoutEffect(() => {
    if (!adm) return;

    clearStates();

    if (formContent === dAFB || formContent === aATB) {
      const ls = JSON.parse(localStorage.getItem(adm) || 'null');
      ls && getAdmins(ls.token);
    }

    if (formContent === aATB || formContent === uBT) {
      const ls = JSON.parse(localStorage.getItem(adm) || 'null');
      ls && getBlogs(ls.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formContent]);

  useEffect(() => {
    if (!adm) return;

    if (formContent === uBT) {
      const ls = getLocalStorageItem(adm);
      ls && blogSelect && getTagsByBlog(ls.token, blogSelect.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogSelect]);

  const clearStates = () => {
    blogSelect && setBlogSelect(null);
    authorSelect && setAuthorSelect(null);
    blogTags?.length && setBlogTags([]);
  };

  const getAdmins = async (token: string) => {
    const { data } = await getAllAdmins({ variables: { token } });
    if (data) {
      const cleanedData = removeDataTypename(data.getAllAdmins);
      data && setAllAdmins(cleanedData as IAllAdmsRes[]);
    }
  };

  const getBlogs = async (token: string) => {
    const { data } = await getAllBlogs({ variables: { token } });

    if (data) {
      const cleanedData = removeDataTypename(data.getAllBlogs);
      data && setAllBlogs(cleanedData as IAllBlogsRes[]);
    }
  };

  const getTagsByBlog = async (token: string, blog: string) => {
    const { data } = await getBlogTags({
      variables: { token, blog }
    });

    // console.log('data', data, blogSelect);

    if (data) {
      // console.log('data ->>>>', data.getBlogTags.tags);
      setBlogTags(data.getBlogTags.tags);
    }
  };

  const createAdmin = async (AddAuthorInput: any) => {
    try {
      const { data } = await addAdmin({
        variables: { input: AddAuthorInput }
      });

      console.log(1, 'sent data', AddAuthorInput);

      if (data) {
        console.log(1, 'got addNewAuthor data:', data);

        const { name, blogs, coauthors } = data.addNewAuthor;

        if (
          authorName === name &&
          blogs.includes(blog?.value) &&
          coauthors.includes(name)
        ) {
          setIsSuccess(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeAuthor = async (DelAuthorInput: any) => {
    try {
      const { data } = await deleteAuthorFromBlog({
        variables: { input: DelAuthorInput }
      });

      console.log(1, 'sent data', DelAuthorInput);

      if (data) {
        console.log(1, 'got delAuthorFromBlog res:', data.deleteAuthorFromBlog);

        data.deleteAuthorFromBlog && setIsSuccess(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addAuthor = async (AddAuthorInput: any) => {
    try {
      const { data } = await addAuthorToBlogGql({
        variables: { input: AddAuthorInput }
      });

      console.log(1, 'sent data', AddAuthorInput);

      if (data) {
        console.log(1, 'got addAuthorToBlog res:', data.addAuthorToBlog);

        data.addAuthorToBlog && setIsSuccess(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleInput = (event: any) => {
    const { name, value } = event.target;

    name === 'authorName' && setAuthorName(value);
    name === 'login' && setLogin(value);
    name === 'password' && setPassword(value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (adm) {
      const ls = JSON.parse(localStorage.getItem(adm) || 'null');

      const AddAdminInput = {
        blog: blog?.value,
        author: authorName,
        credentials: { login, password },
        token: ls.token || ''
      };

      const DelAuthorInput = {
        blog: blogSelect?.value,
        author: authorSelect?.value,
        token: ls.token || ''
      };

      const AddAuthorInput = {
        blog: blogSelect?.value,
        author: authorSelect?.value,
        token: ls.token || ''
      };

      const curInput =
        formContent === addNewAuthor
          ? AddAdminInput
          : formContent === delAuthorFromBlog
          ? DelAuthorInput
          : AddAuthorInput;

      if (Object.values(curInput).some(value => !value)) {
        setIsSubmitError(true);
        return setTimeout(() => setIsSubmitError(false), 3000);
      }

      // /*
      if (!isSubmitError) {
        formContent === addNewAuthor && createAdmin(curInput);
        formContent === delAuthorFromBlog && removeAuthor(curInput);
        formContent === addAuthorToBlog && addAuthor(curInput);
      }
      // */
    }
  };

  // console.log(1, 'isSuccess:', isSuccess);

  const setSelectOptions = () => {
    if (formContent === addNewAuthor && opts) {
      return opts
        .split(' ')
        .map(el => ({ value: el, label: setUpperFirstChar(el) }));
    }

    if (formContent === delAuthorFromBlog) {
      return allAdmins?.reduce(
        (acc: IDelAuthorFromBlog, adm) => {
          acc.admins = [...acc.admins, { value: adm.name, label: adm.name }];

          const blogs = adm.blogs.map(blog => {
            return { value: blog, label: setUpperFirstChar(blog) };
          });

          acc.blogs = { ...acc.blogs, [adm.name]: blogs };
          return acc;
        },
        { admins: [], blogs: {} }
      );
    }

    if (formContent === addAuthorToBlog) {
      const admins = allAdmins?.reduce((acc: ISO[], adm) => {
        acc = [...acc, { value: adm.name, label: adm.name }];
        return acc;
      }, []);

      const blogs = allBlogs?.reduce((acc: ISO[], adm) => {
        const optionTitle = setUpperFirstChar(adm.title);
        acc = [...acc, { value: adm.title, label: optionTitle }];
        return acc;
      }, []);

      return { admins, blogs };
    }

    if (formContent === updateBlogTags) {
      const blogs = allBlogs?.reduce((acc: ISO[], adm) => {
        const optionTitle = setUpperFirstChar(adm.title);
        acc = [...acc, { value: adm.title, label: optionTitle }];
        return acc;
      }, []);

      return { blogs };
    }
  };

  // if (addLoading) return <Spinner />;

  return (
    <div className={s.actionsWrap}>
      {formContent === addNewAuthor ? (
        <AddNewAuthor
          handleSubmit={handleSubmit}
          title={title}
          closeForm={closeForm}
          isSubmitError={isSubmitError}
          apolloError={createError || null}
          isSuccess={isSuccess}
          options={setSelectOptions()}
          blog={blog}
          setBlog={setBlog}
          authorName={authorName}
          handleInput={handleInput}
          login={login}
          password={password}
        />
      ) : formContent === delAuthorFromBlog ? (
        <DelAuthorFromBlog
          handleSubmit={handleSubmit}
          title={title}
          closeForm={closeForm}
          isSubmitError={isSubmitError}
          apolloError={delError}
          isSuccess={isSuccess}
          options={setSelectOptions()}
          blogSelect={blogSelect}
          setBlogSelect={setBlogSelect}
          authorSelect={authorSelect}
          setAuthorSelect={setAuthorSelect}
        />
      ) : formContent === addAuthorToBlog ? (
        <AddAuthorToBlog
          handleSubmit={handleSubmit}
          title={title}
          closeForm={closeForm}
          isSubmitError={isSubmitError}
          apolloError={addError}
          isSuccess={isSuccess}
          options={setSelectOptions()}
          blogSelect={blogSelect}
          setBlogSelect={setBlogSelect}
          authorSelect={authorSelect}
          setAuthorSelect={setAuthorSelect}
        />
      ) : formContent === updateBlogTags ? (
        <UpdateBlogTags
          handleSubmit={handleSubmit}
          title={title}
          closeForm={closeForm}
          isSubmitError={isSubmitError}
          apolloError={addError}
          isSuccess={isSuccess}
          options={setSelectOptions()}
          blogSelect={blogSelect}
          setBlogSelect={setBlogSelect}
          blogTags={blogTags}
        />
      ) : null}
    </div>
  );
};

export default AdminAction;
