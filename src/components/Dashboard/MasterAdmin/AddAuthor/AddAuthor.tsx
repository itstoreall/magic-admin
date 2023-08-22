import { useState } from 'react';
import InputSelect from '../../../FormHandler/InputSelect';
import { ISelectOption as ISO } from '../../../../interfaces/login';
import setUpperFirstChar from '../../../../utils/setUpperFirstChar';
import Input from '../../../FormHandler/Input/Input';
import Button from '../../../Button';
import FormHandler from '../../../FormHandler';

const opts = process.env.REACT_APP_OPTIONS;

const options = opts
  ? opts.split(' ').map(el => ({ value: el, label: setUpperFirstChar(el) }))
  : [];

const AddAuthor = () => {
  const [blog, setBlog] = useState<ISO | null>(null);
  const [authorName, setAuthorName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  // const [updateAdmin, { loading, error }] = useMutation(UPDATE_ADMIN);

  const handleInput = (event: any) => {
    const { name, value } = event.target;

    name === 'authorName' && setAuthorName(value);
    name === 'login' && setLogin(value);
    name === 'password' && setPassword(value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const AccessInput = { login, password, blog: blog?.value };

    if (Object.values(AccessInput).some(value => !value)) {
      setIsError(true);
      return setTimeout(() => setIsError(false), 3000);
    }

    // /*
    if (!isError) {
      try {
        console.log(1, 'handleSubmit try');
        // const { data } = await updateAdmin({
        //   variables: { input: AccessInput },
        // });

        // console.log(1, 'sent data', AccessInput);

        // const { token, author, blog } = data.updateAdmin;

        // if (data && adm) {
        //   localStorage.setItem(adm, JSON.stringify({ token, blog: blog }));

        //   console.log(1, 'got data:', data);

        //   setAccess({ isAdmin: true, author: author, blog: blog });
        //   clearStates();
        // }
      } catch (e) {
        console.error(e);
      }
    }
    // */
  };

  // if (loading) return <Spinner />;

  return (
    <FormHandler handleSubmit={handleSubmit} isError={isError}>
      <InputSelect
        options={options}
        selectedValue={blog}
        setSelectedValue={setBlog}
      />

      <Input
        type={'text'}
        value={login}
        name={'login'}
        placeholder={'Логин'}
        handleInput={handleInput}
      />

      <Input
        type={'text'}
        value={password}
        name={'password'}
        placeholder={'Пароль'}
        handleInput={handleInput}
      />

      <Input
        type={'text'}
        value={authorName}
        name={'authorName'}
        placeholder={'Автор'}
        handleInput={handleInput}
      />

      <Button
        type={'submit'}
        // disabled={loading}
      >
        Отправить
      </Button>
    </FormHandler>
  );
};

export default AddAuthor;
