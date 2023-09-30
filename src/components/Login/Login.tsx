import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ISelectOption as ISO } from '../../interfaces';
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

    const AccessInput = {
      credentials: {
        login,
        password,
      },
      blog: blog?.value,
    };
    // const AccessInput = { login, password, blog: blog?.value };

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

        const { token, name, blogs } = data.updateAdmin;

        if (data && adm) {
          if (blogs.includes(blog?.value)) {
            const curBlog = blogs[blogs.indexOf(blog?.value)];

            localStorage.setItem(adm, JSON.stringify({ token, blog: curBlog }));

            setAccess({ isAdmin: true, author: name, blog: curBlog });
            clearStates();
          }
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
        <span className={s.title}>Login</span>

        <form className={s.loginForm} onSubmit={handleSubmit}>
          <InputSelect
            options={options}
            selectedValue={blog}
            setSelectedValue={setBlog}
            placeholder={'Blog'}
          />

          <input
            type='text'
            value={login}
            onChange={e => handleInput(e)}
            name='login'
            placeholder='Login'
          />

          <input
            type='text'
            value={password}
            onChange={e => handleInput(e)}
            name='password'
            placeholder='Password'
          />

          <Button type={'submit'} disabled={loading}>
            Submit
          </Button>
        </form>
      </div>

      {isError && <p className={s.loginError}>All fields are required</p>}

      {error && (
        <p className={s.loginError}>
          {error.message === 'Access denied!'
            ? 'Invalid login or password'
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
