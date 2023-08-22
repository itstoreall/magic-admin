import { useGlobalContext } from '../../context/GlobalContext';
import s from './Dashboard.module.scss';
import MasterAdminPanel from './MasterAdmin/MasterPanel';

const masterKey = process.env.REACT_APP_MASTER_KEY;

const Dashboard = () => {
  const { access } = useGlobalContext();

  return (
    <div className={s.dashboard}>
      <section className={s.content}>
        {access?.author === masterKey && <MasterAdminPanel />}
      </section>
    </div>
  );
};

export default Dashboard;
