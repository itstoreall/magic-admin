import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import ADD_NEW_AUTHOR from '../../../../gql/addNewAuthor';
import DELETE_ADMIN from '../../../../gql/deleteAdmin';
import InputSelect from '../../../FormHandler/InputSelect';
import { ISelectOption as ISO } from '../../../../interfaces/login';
import setUpperFirstChar from '../../../../utils/setUpperFirstChar';
import Input from '../../../FormHandler/Input/Input';
import Button from '../../../Button';
import FormHandler from '../../../FormHandler';
import Spinner from '../../../Loading/Spinner';

export interface IAddAuthorProps {
  // isOpenForm: boolean;
  title: string;
  // formModalHandler: (v: boolean, c: string) => void;
}

const opts = process.env.REACT_APP_OPTIONS;
const adm = process.env.REACT_APP_ADMIN_ACCESS;

const options = opts
  ? opts.split(' ').map(el => ({ value: el, label: setUpperFirstChar(el) }))
  : [];

const AdminAction = ({ title }: IAddAuthorProps) => {
  const [content, setContent] = useState<string>('');
  const [blog, setBlog] = useState<ISO | null>(null);
  const [authorName, setAuthorName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitError, setIsSubmitError] = useState<boolean>(false);

  const [addAdmin, { loading: addLoading, error: addError }] =
    useMutation(ADD_NEW_AUTHOR);

  const [deleteAdmin, { loading: delLoading, error: delError }] =
    useMutation(DELETE_ADMIN);

  // ---

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
        Object.values(content === 'add' ? AddAuthorInput : DelAuthorInput).some(
          value => !value
        )
      ) {
        setIsSubmitError(true);
        return setTimeout(() => setIsSubmitError(false), 3000);
      }

      // /*
      if (!isSubmitError) {
        try {
          console.log(1, 'handleSubmit try');

          content === 'Add' && createAdmin(AddAuthorInput);
          content === 'Delete' && removeAdmin(DelAuthorInput);

          // const { data } = await addAdmin({
          //   variables: { input: AddAuthorInput },
          // });

          // console.log(1, 'sent data', AddAuthorInput);

          // if (data) {
          //   console.log(1, 'got data:', data);

          //   const { name, blogs, coauthors } = data.addAdmin;

          //   if (
          //     authorName === name &&
          //     blogs.includes(blog?.value) &&
          //     coauthors.includes(name)
          //   ) {
          //     console.log(111);
          //     setIsSuccess(true);
          //   }
          // }
        } catch (e) {
          console.error(e);
        }
      }
      // */
    }
  };
  // console.log(1, 'isSuccess:', isSuccess);

  if (addLoading) return <Spinner />;

  return (
    <FormHandler
      handleSubmit={handleSubmit}
      title={title}
      isSubmitError={isSubmitError}
      apolloError={addError ? addError : null}
      isSuccess={isSuccess}
    >
      <InputSelect
        options={options}
        selectedValue={blog}
        setSelectedValue={setBlog}
        placeholder={'Blog'}
      />

      <Input
        type={'text'}
        value={authorName}
        name={'authorName'}
        placeholder={'Author'}
        handleInput={handleInput}
      />

      <Input
        type={'text'}
        value={login}
        name={'login'}
        placeholder={'Login'}
        handleInput={handleInput}
      />

      <Input
        type={'text'}
        value={password}
        name={'password'}
        placeholder={'Password'}
        handleInput={handleInput}
      />

      <Button
        type={'submit'}
        // disabled={loading}
      >
        {content}
      </Button>
    </FormHandler>
  );
};

export default AdminAction;
