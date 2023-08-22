import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ISelectOption as ISO } from '../../interfaces/login';
import { useGlobalContext } from '../../context/GlobalContext';
import setUpperFirstChar from '../../utils/setUpperFirstChar';
import UPDATE_ADMIN from '../../gql/updateAdmin';
import s from './Login.module.scss';
import InputSelect from '../FormHandler/InputSelect';
import Button from '../Button';
import Spinner from '../Loading/Spinner';

const adm = process.env.REACT_APP_ADMIN_ACCESS;
const opts = process.env.REACT_APP_OPTIONS;

const options = opts
  ? opts.split(' ').map(el => ({ value: el, label: setUpperFirstChar(el) }))
  : [];

// console.log('options', options);

const Login = () => {
  const [blog, setBlog] = useState<ISO | null>(null);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const [updateAdmin, { loading, error }] = useMutation(UPDATE_ADMIN);
  const { setAccess } = useGlobalContext();

  const clearStates = () => {
    setLogin('');
    setPassword('');
  };

  const handleInput = (event: any) => {
    const { name, value } = event.target;

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
        const { data } = await updateAdmin({
          variables: { input: AccessInput },
        });

        console.log(1, 'sent data', AccessInput);

        const { token, author, blog } = data.updateAdmin;

        if (data && adm) {
          localStorage.setItem(adm, JSON.stringify({ token, blog: blog }));

          console.log(1, 'got data:', data);

          setAccess({ isAdmin: true, author: author, blog: blog });
          clearStates();
        }
      } catch (e) {
        console.error(e);
      }
    }
    // */
  };

  if (loading) return <Spinner />;

  return (
    <div className={s.loginWrap}>
      <div className={`${s.login} ${s['dark']}`}>
        <span className={s.title}>Вход</span>

        <form className={s.loginForm} onSubmit={handleSubmit}>
          <InputSelect
            options={options}
            selectedValue={blog}
            setSelectedValue={setBlog}
            placeholder={'Блог'}
          />

          <input
            type='text'
            value={login}
            onChange={e => handleInput(e)}
            name='login'
            placeholder='Логин'
          />

          <input
            type='text'
            value={password}
            onChange={e => handleInput(e)}
            name='password'
            placeholder='Пароль'
          />

          <Button type={'submit'} disabled={loading}>
            Отправить
          </Button>
        </form>
      </div>

      {isError && <p className={s.loginError}>Все поля обязательны</p>}

      {error && (
        <p className={s.loginError}>
          {error.message === 'Access denied!'
            ? 'Неверный логин или пароль'
            : `${error.message}`}
        </p>
      )}
    </div>
  );
};

export default Login;

/* 
{updateError && (
  <p className={s.loginError}>
    {updateError.message} Check your login and password
  </p>
)} 
*/
