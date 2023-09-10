import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import GET_ALL_ADMINS from '../../../../gql/getAllAdmins';
import GET_ALL_BLOGS from '../../../../gql/getAllBlogs';
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
import { removeDataTypename } from '../../../../utils/removeDataTypename';

const GAA = GET_ALL_ADMINS;
const GAB = GET_ALL_BLOGS;
const ANA = ADD_NEW_AUTHOR;
const DAFB = DELETE_AUTHOR_FROM_BLOG;
const AATB = ADD_AUTHOR_TO_BLOG;

// export type AddAuthorToBlog = ISO;

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

export interface IAddAuthorProps {
  formContent: string;
  title: string;
}

// export interface IDataTypename {
//   [x: string]: any;
//   __typename: string;
// }

const opts = process.env.REACT_APP_OPTIONS;
const adm = process.env.REACT_APP_ADMIN_ACCESS;

const AdminAction = ({ formContent, title }: IAddAuthorProps) => {
  // const [content, setContent] = useState<string>('');
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

  const [getAllAdmins] = useLazyQuery(GAA);
  const [getAllBlogs] = useLazyQuery(GAB);
  const [addAdmin, { error: createError }] = useMutation(ANA);
  const [deleteAuthorFromBlog, { error: delError }] = useMutation(DAFB);
  const [addAuthorToBlogGql, { error: addError }] = useMutation(AATB);

  const { addNewAuthor, delAuthorFromBlog, addAuthorToBlog } = cfg.content;

  useEffect(() => {
    const dAFB = cfg.content.delAuthorFromBlog;
    const aATB = cfg.content.addAuthorToBlog;

    if ((formContent === dAFB || formContent === aATB) && adm) {
      const ls = JSON.parse(localStorage.getItem(adm) || 'null');
      ls && getAdmins(ls.token);
    }

    if (formContent === aATB && adm) {
      const ls = JSON.parse(localStorage.getItem(adm) || 'null');
      ls && getBlogs(ls.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formContent]);

  const getAdmins = async (token: string) => {
    const { data } = await getAllAdmins({ variables: { token } });
    if (data) {
      const cleanedData = removeDataTypename(data.getAllAdmins);
      data && setAllAdmins(cleanedData as IAllAdmsRes[]);
    }
  };

  const getBlogs = async (token: string) => {
    console.log(4);

    const { data } = await getAllBlogs({ variables: { token } });

    console.log(44);

    if (data) {
      const cleanedData = removeDataTypename(data.getAllBlogs);
      data && setAllBlogs(cleanedData as IAllBlogsRes[]);
    }
  };

  const createAdmin = async (AddAuthorInput: any) => {
    try {
      const { data } = await addAdmin({
        variables: { input: AddAuthorInput },
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
        variables: { input: DelAuthorInput },
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
        variables: { input: AddAuthorInput },
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
        token: ls.token || '',
      };

      const DelAuthorInput = {
        blog: blogSelect?.value,
        author: authorSelect?.value,
        token: ls.token || '',
      };

      const AddAuthorInput = {
        blog: blogSelect?.value,
        author: authorSelect?.value,
        token: ls.token || '',
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
        acc = [...acc, { value: adm.title, label: adm.title }];
        return acc;
      }, []);

      return { admins, blogs };
    }
  };

  // if (addLoading) return <Spinner />;

  return (
    <>
      {formContent === addNewAuthor ? (
        <AddNewAuthor
          handleSubmit={handleSubmit}
          title={title}
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
          isSubmitError={isSubmitError}
          apolloError={delError}
          isSuccess={isSuccess}
          options={setSelectOptions()}
          blogSelect={blogSelect}
          setBlogSelect={setBlogSelect}
          authorSelect={authorSelect}
          setAuthorSelect={setAuthorSelect}
        />
      ) : (
        <AddAuthorToBlog
          handleSubmit={handleSubmit}
          title={title}
          isSubmitError={isSubmitError}
          apolloError={addError}
          isSuccess={isSuccess}
          options={setSelectOptions()}
          blogSelect={blogSelect}
          setBlogSelect={setBlogSelect}
          authorSelect={authorSelect}
          setAuthorSelect={setAuthorSelect}
        />
      )}
    </>
  );
};

export default AdminAction;
