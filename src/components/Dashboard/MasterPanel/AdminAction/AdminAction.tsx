import { useEffect, useLayoutEffect, useState } from 'react';
import useAdminActions from '../../../../hooks/useAdminActions';
import { ISelectOption as ISO } from '../../../../interfaces';
import setUpperFirstChar from '../../../../utils/setUpperFirstChar';
// import Spinner from '../../../Loading/Spinner';
import cfg from '../config/masterPanel.config';
import AddNewAuthor from './Actions/AddNewAuthor';
import DelAuthorFromBlog from './Actions/DelAuthorFromBlog';
import AddAuthorToBlog from './Actions/AddAuthorToBlog';
import UpdateBlogTags from './Actions/UpdateBlogTags';
// import { removeDataTypename } from '../../../../utils/removeDataTypename';
import getLocalStorageItem from '../../../../utils/getLocalStorageItem';
import s from './AdminAction.module.scss';
import * as t from '../types';

const actionLabels = {
  getAllAdmins: 'get_all_admins',
  getAllBlogs: 'get_all_blogs',
  getBlogTags: 'get_blog_tags',
  addAdmin: 'add_admin',
  delAuthor: 'delete_author',
  addAuthor: 'add_author',
  updateTags: 'update_tags'
};

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

  const [blogTags, setBlogTags] = useState<string[]>([]);
  const [localTags, setLocalTags] = useState<string[]>([]);

  const { action, refetch, error: apolloError, loading } = useAdminActions();

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
      // ls && blogSelect && refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogSelect]);

  useEffect(() => {
    apolloError && setErrMessage(apolloError);
  }, [apolloError]);

  // ------ actions:

  const getAdmins = async (token: string) => {
    const data = await action(actionLabels.getAllAdmins, { token });
    data && setAllAdmins(data.getAllAdmins as t.IAllAdmsRes[]);
  };

  const getBlogs = async (token: string) => {
    const data = await action(actionLabels.getAllBlogs, { token });
    data && setAllBlogs(data.getAllBlogs as t.IAllBlogsRes[]);
  };

  const getTagsByBlog = async (token: string, blog: string) => {
    const data = await action(actionLabels.getBlogTags, { token, blog });
    console.log('data', data);
    data && setBlogTags(data.getBlogTags as string[]);
  };

  const createAdmin = async (input: any) => {
    const data = await action(actionLabels.addAdmin, { input });
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
  };

  const removeAuthor = async (input: any) => {
    const data = await action(actionLabels.delAuthor, { input });
    if (data) {
      console.log(1, 'got delAuthorFromBlog res:', data.deleteAuthorFromBlog);
      data.deleteAuthorFromBlog && setIsSuccess(true);
    }
  };

  const addAuthor = async (input: any) => {
    const data = await action(actionLabels.addAuthor, { input });
    if (data) {
      console.log(1, 'got addAuthorToBlog res:', data.addAuthorToBlog);
      data.addAuthorToBlog && setIsSuccess(true);
    }
  };

  const updateTags = async (input: any) => {
    console.log('input', input);
    const data = await action(actionLabels.updateTags, { input });
    if (data) {
      console.log(1, 'got updateBlogTags res:', data.updateBlogTags);
      data.updateBlogTags && setIsSuccess(true);
      refetch();
    }
  };

  // useEffect(() => {
  //   addAdminErr && setErrMessage(addAdminErr.message);
  //   delAuthorErr && setErrMessage(delAuthorErr.message);
  //   addAuthorErr && setErrMessage(addAuthorErr.message);
  //   updateTagsErr && setErrMessage(updateTagsErr.message);
  // }, [addAdminErr, delAuthorErr, addAuthorErr, updateTagsErr]);

  const clearStates = () => {
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
            break;
          default:
            break;
        }
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
        // console.log(0, allBlogs, adm);
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
          apolloLoading={loading}
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
          apolloLoading={loading}
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
          apolloLoading={loading}
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
          apolloLoading={loading}
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
