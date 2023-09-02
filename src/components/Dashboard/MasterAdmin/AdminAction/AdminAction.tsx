import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import ADD_NEW_AUTHOR from '../../../../gql/addNewAuthor';
import DELETE_ADMIN from '../../../../gql/deleteAdmin';
import {
  ISelectOption as ISO,
  ISelectOption,
} from '../../../../interfaces/login';
import setUpperFirstChar from '../../../../utils/setUpperFirstChar';
import Spinner from '../../../Loading/Spinner';
import GET_ALL_ADMINS from '../../../../gql/getAllAdmins';
import cfg from '../config/masterPanel.config';
import AddNewAuthor from './Actions/AddNewAuthor';
import DelAuthorFromBlog from './Actions/DelAuthorFromBlog';

// export interface ISelectOption {
//   value: string;
//   label: string;
// }

export interface IDelAuthorFromBlog {
  admins: ISelectOption[];
  blogs: { [key: string]: ISelectOption[] };
}

// export interface IDelAuthorFromBlog {
//   admins: ISelectOption[];
//   blogs: { name: string; blogs: ISelectOption[] }[];
// }

export interface IAllAdmsRes {
  name: string;
  blogs: string[];
}

export interface IAddAuthorProps {
  // isOpenForm: boolean;
  formContent: string;
  title: string;
  // formModalHandler: (v: boolean, c: string) => void;
}

const opts = process.env.REACT_APP_OPTIONS;
const adm = process.env.REACT_APP_ADMIN_ACCESS;

// const options = opts
//   ? opts.split(' ').map(el => ({ value: el, label: setUpperFirstChar(el) }))
//   : [];

const AdminAction = ({ formContent, title }: IAddAuthorProps) => {
  const [content, setContent] = useState<string>('');
  const [blog, setBlog] = useState<ISO | null>(null);
  const [authorSelect, setAuthorSelect] = useState<ISO | null>(null);
  const [authorName, setAuthorName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitError, setIsSubmitError] = useState<boolean>(false);

  const [allAdmins, setAllAdmins] = useState<IAllAdmsRes[] | null>(null);

  const [getAllAdmins] = useLazyQuery(GET_ALL_ADMINS);

  const [addAdmin, { loading: addLoading, error: addError }] =
    useMutation(ADD_NEW_AUTHOR);

  const [deleteAdmin, { loading: delLoading, error: delError }] =
    useMutation(DELETE_ADMIN);

  const { addNewAuthor, delAuthorFromBlog } = cfg.content;

  // ---

  useEffect(() => {
    if (formContent === cfg.content.delAuthorFromBlog && adm) {
      const ls = JSON.parse(localStorage.getItem(adm) || 'null');
      ls && getAdmins(ls.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formContent]);

  const getAdmins = async (token: string) => {
    const { data } = await getAllAdmins({ variables: { token } });

    if (data) {
      const cleanedData = data.getAllAdmins.map((item: any) => {
        const { __typename, ...rest } = item;
        return rest;
      });

      data && setAllAdmins(cleanedData);
    }
  };

  const createAdmin = async (AddAuthorInput: any) => {
    const { data } = await addAdmin({
      variables: { input: AddAuthorInput },
    });

    console.log(1, 'sent data', AddAuthorInput);

    if (data) {
      console.log(1, 'got data:', data);

      const { name, blogs, coauthors } = data.addAdmin;

      if (
        authorName === name &&
        blogs.includes(blog?.value) &&
        coauthors.includes(name)
      ) {
        console.log(111);
        setIsSuccess(true);
      }
    }
  };

  const removeAdmin = async (DelAuthorInput: any) => {
    const { data } = await deleteAdmin({
      variables: { input: DelAuthorInput },
    });

    console.log(1, 'sent data', DelAuthorInput);

    if (data) {
      console.log(1, 'got data:', data);
    }
  };

  // ---

  // const clearStates = () => {
  //   setBlog(null);
  //   setAuthorName('');
  //   setLogin('');
  //   setPassword('');
  // };

  // useEffect(() => {
  //   !isOpenForm && clearStates();
  // }, [isOpenForm]);

  useEffect(() => {
    const incContent = (value: string) => title.includes(value);
    setContent(
      incContent('Create') ? 'Add' : incContent('Delete') ? 'Delete' : ''
    );
  }, [title]);

  console.log('content', content);

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

      const AddAuthorInput = {
        blog: blog?.value,
        author: authorName,
        credentials: { login, password },
        token: ls.token || '',
      };

      const DelAuthorInput = {
        blog: blog?.value,
        author: authorName,
        credentials: { login, password },
      };

      if (
        Object.values(
          formContent === addNewAuthor ? AddAuthorInput : DelAuthorInput
        ).some(value => !value)
      ) {
        setIsSubmitError(true);
        return setTimeout(() => setIsSubmitError(false), 3000);
      }

      // /*
      if (!isSubmitError) {
        try {
          console.log(1, 'handleSubmit try');
          formContent === addNewAuthor && createAdmin(AddAuthorInput);
          formContent === delAuthorFromBlog && removeAdmin(DelAuthorInput);
        } catch (e) {
          console.error(e);
        }
      }
      // */
    }
  };
  // console.log(1, 'isSuccess:', isSuccess);

  const setSelectOptions = () => {
    console.log('');
    console.log('formContent', formContent);
    console.log('allAdmins', allAdmins);

    // let options: { value: string; label: string }[] = [];

    if (formContent === addNewAuthor && opts) {
      return opts
        .split(' ')
        .map(el => ({ value: el, label: setUpperFirstChar(el) }));
    }

    if (formContent === delAuthorFromBlog) {
      return allAdmins?.reduce(
        (acc: IDelAuthorFromBlog, adm) => {
          console.log('acc', acc);

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

    /*
    if (formContent === delAuthorFromBlog) {
      return allAdmins?.reduce(
        (acc: IDelAuthorFromBlog, adm) => {
          console.log('acc', acc);

          acc.admins = [
            ...acc.admins,
            { value: adm.name, label: setUpperFirstChar(adm.name) },
          ];

          const blogs = adm.blogs.map(blog => {
            return { value: blog, label: setUpperFirstChar(blog) };
          });

          acc.blogs = [...acc.blogs, { name: adm.name, blogs: blogs }];

          return acc;
        },
        { admins: [], blogs: [] }
      );
    }
    */
  };

  if (addLoading) return <Spinner />;

  return (
    <>
      {formContent === addNewAuthor ? (
        <AddNewAuthor
          handleSubmit={handleSubmit}
          title={title}
          isSubmitError={isSubmitError}
          addError={addError ? addError : null}
          isSuccess={isSuccess}
          options={setSelectOptions()}
          blog={blog}
          setBlog={setBlog}
          authorName={authorName}
          handleInput={handleInput}
          login={login}
          password={password}
        />
      ) : (
        <DelAuthorFromBlog
          handleSubmit={handleSubmit}
          title={title}
          isSubmitError={isSubmitError}
          addError={addError ? addError : null}
          isSuccess={isSuccess}
          options={setSelectOptions()}
          blog={blog}
          setBlog={setBlog}
          authorSelect={authorSelect}
          setAuthorSelect={setAuthorSelect}
        />
      )}
    </>
  );
};

export default AdminAction;
