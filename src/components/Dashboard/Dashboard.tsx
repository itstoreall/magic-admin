import s from './Dashboard.module.scss';
import MasterAdminPanel from './MasterAdmin/MasterAdminPanel';

const Dashboard = () => {
  return (
    <div className={s.dashboard}>
      <section className={s.content}>
        <MasterAdminPanel />
      </section>
    </div>
  );
};

export default Dashboard;
