import { useState } from 'react';
import { IArticle } from '../../interfaces';
import { useGlobalContext } from '../../context/GlobalContext';
import MasterAdminPanel from './MasterPanel';
import AuthorPanel from './AuthorPanel';
import ArticleList from './Articles/List';
import ArticleHandler from './Articles/ArticleHandler';
import s from './Dashboard.module.scss';

const masterKey = process.env.REACT_APP_MASTER_KEY;

const Dashboard = () => {
  const [details, setDetails] = useState<IArticle | null>(null);

  const handleOpenDetails = (art: IArticle) => setDetails(art);

  const { label, access, isPreview } = useGlobalContext();

  const DashboardPanels = () => {
    return (
      <>
        {!isPreview && (
          <>
            {access?.author === masterKey && <MasterAdminPanel />}

            <AuthorPanel />
          </>
        )}
      </>
    );
  };

  return (
    <div className={s.dashboard}>
      {access && (
        <section className={s.mainSection}>
          <DashboardPanels />

          {label === 'list' ? (
            <ArticleList handleOpenDetails={handleOpenDetails} />
          ) : (
            <ArticleHandler article={details ? details : null} />
          )}
        </section>
      )}
    </div>
  );
};

export default Dashboard;
