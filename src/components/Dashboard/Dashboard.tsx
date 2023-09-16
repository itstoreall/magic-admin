import { useGlobalContext } from '../../context/GlobalContext';
import MasterAdminPanel from './MasterPanel';
import AuthorPanel from './AuthorPanel';
import ArticleList from './Articles/ArticleList';
import s from './Dashboard.module.scss';

const masterKey = process.env.REACT_APP_MASTER_KEY;

const Dashboard = () => {
  const { access } = useGlobalContext();

  return (
    <div className={s.dashboard}>
      <section className={s.content}>
        {access?.author === masterKey && <MasterAdminPanel />}
        {access && <AuthorPanel />}
        {access && <ArticleList />}
      </section>
    </div>
  );
};

export default Dashboard;
