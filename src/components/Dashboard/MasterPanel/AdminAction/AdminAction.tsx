import { useEffect, useLayoutEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import GET_ALL_ADMINS from '../../../../gql/getAllAdmins';
import GET_ALL_BLOGS from '../../../../gql/getAllBlogs';
import GET_BLOG_TAGS from '../../../../gql/getBlogTags';
import ADD_NEW_AUTHOR from '../../../../gql/addNewAuthor';
import DELETE_AUTHOR_FROM_BLOG from '../../../../gql/deleteAuthorFromBlog';
import ADD_AUTHOR_TO_BLOG from '../../../../gql/addAuthorToBlog';
import UPDATE_BLOG_TAGS from '../../../../gql/updateBlogTags';
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
import * as t from '../types';

const GAA = GET_ALL_ADMINS;
const GAB = GET_ALL_BLOGS;
const GBT = GET_BLOG_TAGS;
const ANA = ADD_NEW_AUTHOR;
const DAFB = DELETE_AUTHOR_FROM_BLOG;
const AATB = ADD_AUTHOR_TO_BLOG;
const UBT = UPDATE_BLOG_TAGS;

const opts = process.env.REACT_APP_OPTIONS;
const adm = process.env.REACT_APP_ADMIN_ACCESS;

const AdminAction = ({
  formContent,
  title,
  closeForm
}: t.IAdminActionProps) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [blog, setBlog] = useState<ISO | null>(null);
  const [authorName, setAuthorName] = useState<string>('');
  const [blogSelect, setBlogSelect] = useState<ISO | null>(null);
  const [authorSelect, setAuthorSelect] = useState<ISO | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitError, setIsSubmitError] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>('');

  const [allAdmins, setAllAdmins] = useState<t.IAllAdmsRes[] | null>(null);
  const [allBlogs, setAllBlogs] = useState<t.IAllBlogsRes[] | null>(null);

  const [blogTags, setBlogTags] = useState<t.BlogTagsType>([]);
  const [localTags, setLocalTags] = useState<t.BlogTagsType>([]);

  /*
  console.log('');
  console.log(2, 'blog', blog);
  console.log(2, 'authorName', authorName);
  console.log(2, 'blogSelect', blogSelect);
  console.log(2, 'authorSelect', authorSelect);
  console.log(2, 'login', login);
  console.log(2, 'password', password);
  console.log(2, 'isSuccess', isSuccess);
  console.log(2, 'isSubmitError', isSubmitError);
  console.log(2, 'allAdmins', allAdmins);
  console.log(2, 'blogTags', blogTags);
  console.log(2, 'allBlogs', allBlogs);
  console.log(2, 'blogTags', blogTags);
  console.log(2, 'localTags', localTags);
  // */

  // ------ gql:

  const [getAllAdmins] = useLazyQuery(GAA);
  const [getAllBlogs] = useLazyQuery(GAB);
  const [getBlogTags] = useLazyQuery(GBT);

  const [addAdmin, { loading: addAdminLoad, error: addAdminErr }] =
    useMutation(ANA);

  const [delAuthor, { loading: delAuthorLoad, error: delAuthorErr }] =
    useMutation(DAFB);

  const [addAuthorGql, { loading: addAuthorLoad, error: addAuthorErr }] =
    useMutation(AATB);

  const [updTags, { loading: updateTagsLoad, error: updateTagsErr }] =
    useMutation(UBT);

  // ------ config:

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

    // if (!blogSelect && blogTags.length) clearStates();

    if (formContent === uBT) {
      const ls = getLocalStorageItem(adm);
      ls && blogSelect && getTagsByBlog(ls.token, blogSelect.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogSelect]);

  useEffect(() => {
    addAdminErr && setErrMessage(addAdminErr.message);
    delAuthorErr && setErrMessage(delAuthorErr.message);
    addAuthorErr && setErrMessage(addAuthorErr.message);
    updateTagsErr && setErrMessage(updateTagsErr.message);
  }, [addAdminErr, delAuthorErr, addAuthorErr, updateTagsErr]);

  const clearStates = () => {
    // console.log('');
    // console.log(1, blogSelect);
    // console.log(1, blogTags);

    login && setLogin('');
    password && setPassword('');
    blog && setBlog(null);
    authorName && setAuthorName('');
    blogSelect && setBlogSelect(null);
    authorSelect && setAuthorSelect(null);

    allAdmins && setAllAdmins(null);
    allBlogs && setAllBlogs(null);
    blogTags.length && setBlogTags([]);
    localTags.length && setLocalTags([]);
    isSuccess && setIsSuccess(false);

    errMessage && setErrMessage('');
  };

  // console.log(2, blogSelect);
  // console.log(2, blogTags);

  const getAdmins = async (token: string) => {
    const { data } = await getAllAdmins({ variables: { token } });
    if (data) {
      const cleanedData = removeDataTypename(data.getAllAdmins);
      data && setAllAdmins(cleanedData as t.IAllAdmsRes[]);
    }
  };

  const getBlogs = async (token: string) => {
    const { data } = await getAllBlogs({ variables: { token } });

    if (data) {
      const cleanedData = removeDataTypename(data.getAllBlogs);
      data && setAllBlogs(cleanedData as t.IAllBlogsRes[]);
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

  const createAdmin = async (input: any) => {
    try {
      const { data } = await addAdmin({
        variables: { input }
      });

      console.log(1, 'sent data', input);

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

  const removeAuthor = async (input: any) => {
    try {
      const { data } = await delAuthor({
        variables: { input }
      });

      console.log(1, 'sent data', input);

      if (data) {
        console.log(1, 'got delAuthorFromBlog res:', data.deleteAuthorFromBlog);

        data.deleteAuthorFromBlog && setIsSuccess(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addAuthor = async (input: any) => {
    try {
      const { data } = await addAuthorGql({
        variables: { input }
      });

      console.log(1, 'sent data', input);

      if (data) {
        console.log(1, 'got addAuthorToBlog res:', data.addAuthorToBlog);

        data.addAuthorToBlog && setIsSuccess(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateTags = async (input: any) => {
    try {
      const { data } = await updTags({
        variables: { input }
      });

      console.log(1, 'sent data', input);

      if (data) {
        console.log(1, 'got updateBlogTags res:', data.addAuthorToBlog);

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

    console.log(22, 'handleSubmit');

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

      const UpdateBlogTagsInput = {
        blog: blogSelect?.value,
        tags: localTags,
        token: ls.token || ''
      };

      const curInput =
        formContent === addNewAuthor
          ? AddAdminInput
          : formContent === delAuthorFromBlog
          ? DelAuthorInput
          : formContent === addAuthorToBlog
          ? AddAuthorInput
          : formContent === updateBlogTags
          ? UpdateBlogTagsInput
          : {};

      // updateBlogTags;

      if (Object.values(curInput).some(value => !value)) {
        setIsSubmitError(true);
        return setTimeout(() => setIsSubmitError(false), 3000);
      }

      // /*
      if (!isSubmitError) {
        switch (formContent) {
          case addNewAuthor:
            createAdmin(curInput);
            break;
          case delAuthorFromBlog:
            removeAuthor(curInput);
            break;
          case addAuthorToBlog:
            addAuthor(curInput);
            break;
          case updateBlogTags:
            updateTags(curInput);
            console.log('!!!!!!!');
            break;

          default:
            break;
        }

        // formContent === addNewAuthor && createAdmin(curInput);
        // formContent === delAuthorFromBlog && removeAuthor(curInput);
        // formContent === addAuthorToBlog && addAuthor(curInput);
        // formContent === addAuthorToBlog && addAuthor(curInput);
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
        (acc: t.IDelAuthorFromBlog, adm) => {
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

  // console.log('');
  // console.log('addAdminLoad', addAdminLoad);
  // console.log('addAdminLoad', addAdminLoad);
  // console.log('delAuthorLoad', delAuthorLoad);
  // console.log('addAuthorLoad', addAuthorLoad);

  return (
    <div className={s.actionsWrap}>
      {formContent === addNewAuthor ? (
        <AddNewAuthor
          handleSubmit={handleSubmit}
          title={title}
          closeForm={closeForm}
          isSubmitError={isSubmitError}
          apolloError={errMessage}
          apolloLoading={addAdminLoad}
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
          apolloError={errMessage}
          apolloLoading={delAuthorLoad}
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
          apolloError={errMessage}
          apolloLoading={addAuthorLoad}
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
          apolloError={errMessage}
          apolloLoading={updateTagsLoad}
          isSuccess={isSuccess}
          options={setSelectOptions()}
          blogSelect={blogSelect}
          setBlogSelect={setBlogSelect}
          blogTags={blogTags}
          localTags={localTags}
          setLocalTags={setLocalTags}
        />
      ) : null}
    </div>
  );
};

export default AdminAction;
