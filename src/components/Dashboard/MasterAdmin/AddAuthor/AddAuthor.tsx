import { useState } from 'react';
import { useMutation } from '@apollo/client';
import ADD_NEW_AUTHOR from '../../../../gql/addNewAuthor';
import InputSelect from '../../../FormHandler/InputSelect';
import { ISelectOption as ISO } from '../../../../interfaces/login';
import setUpperFirstChar from '../../../../utils/setUpperFirstChar';
import Input from '../../../FormHandler/Input/Input';
import Button from '../../../Button';
import FormHandler from '../../../FormHandler';
import Spinner from '../../../Loading/Spinner';
import { useGlobalContext } from '../../../../context/GlobalContext';

const opts = process.env.REACT_APP_OPTIONS;
const adm = process.env.REACT_APP_ADMIN_ACCESS;

const options = opts
  ? opts.split(' ').map(el => ({ value: el, label: setUpperFirstChar(el) }))
  : [];

const AddAuthor = () => {
  const [blog, setBlog] = useState<ISO | null>(null);
  const [authorName, setAuthorName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [masterKey, setMasterKey] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const { access } = useGlobalContext();

  const [addAdmin, { loading, error }] = useMutation(ADD_NEW_AUTHOR);

  // console.log('------->', access, ls.token);
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
        login,
        password,
        token: ls.token || '',
      };

      if (Object.values(AddAuthorInput).some(value => !value)) {
        setIsError(true);
        return setTimeout(() => setIsError(false), 3000);
      }

      // /*
      if (!isError) {
        try {
          console.log(1, 'handleSubmit try');
          const { data } = await addAdmin({
            variables: { input: AddAuthorInput },
          });

          console.log(1, 'sent data', AddAuthorInput);

          const { author, blog } = data.addAdmin;

          if (data) {
            // localStorage.setItem(adm, JSON.stringify({ token, blog: blog }));

            console.log(1, 'got data:', data);

            // setAccess({ isAdmin: true, author: author, blog: blog });
            // clearStates();
          }
        } catch (e) {
          console.error(e);
        }
      }
      // */
    }
  };

  if (loading) return <Spinner />;

  return (
    <FormHandler
      handleSubmit={handleSubmit}
      isError={isError}
      title={'New author'}
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
        Add
      </Button>
    </FormHandler>
  );
};

export default AddAuthor;
