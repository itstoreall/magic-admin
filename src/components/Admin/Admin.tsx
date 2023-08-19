import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useGlobalContext } from '../../context/GlobalContext';
import IS_ADMIN from '../../gql/isAdmin';
import Login from '../Login';
import Spinner from '../Loading/Spinner';
import Dashboard from '../Dashboard/Dashboard';

const adm = process.env.REACT_APP_ADMIN_ACCESS;

const AdminPage = () => {
  const [isAdmin] = useLazyQuery(IS_ADMIN);
  const { access, setAccess } = useGlobalContext();
  let isFetching = false;

  const fetchIsAdmin = async (ls: { token: string; blog: string }) => {
    const { token, blog } = ls;
    isFetching = true;

    try {
      console.log('fetchIsAdmin - token blog', token, blog);

      const { data } = await isAdmin({ variables: { token, blog } });

      console.log(1, 'data', data);

      setAccess({
        isAdmin: data.isAdmin.isAdmin,
        author: data.isAdmin.author,
        blog: data.isAdmin.blog,
      });

      isFetching = false;
    } catch (e) {
      console.error(`Error in fetchIsAdmin: ${e}`);
    }
  };

  useEffect(() => {
    if (!access && adm) {
      const ls = JSON.parse(localStorage.getItem(adm) || 'null');

      if (isFetching) return;

      console.log('ls', ls);

      ls
        ? fetchIsAdmin(ls)
        : setAccess({ isAdmin: false, author: '', blog: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access]);

  access && console.log('access', access);

  if (!access) return <Spinner />;

  return <section>{access.isAdmin ? <Dashboard /> : <Login />}</section>;
};

export default AdminPage;
