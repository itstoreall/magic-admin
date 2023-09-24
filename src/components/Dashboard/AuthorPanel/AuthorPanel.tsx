import { useGlobalContext } from '../../../context/GlobalContext';
import s from './AuthorPanel.module.scss';
import cfg from './config/authorPanel.config';

const AuthorPanel = () => {
  // const { addNewArticle } = cfg.content;
  const { addNewArticleBtn, articleListBtn } = cfg.button;
  // const { addNewArticleTitle } = cfg.title;

  const {
    setLabel,
    isUpdatedArt,
    setIsUpdatedArt,
    isDeletedArt,
    setIsDeletedArt,
  } = useGlobalContext();

  const handleLabel = (str: string) => {
    isUpdatedArt && setIsUpdatedArt(false);
    isDeletedArt && setIsDeletedArt(false);
    setLabel(str);
  };

  return (
    <div className={`${s.authorPanel} ${s['dark']}`}>
      <h3 className={s.title}>Dashboard</h3>

      <div className={s.formWrap}>
        <button className={s.button} onClick={() => handleLabel('add')}>
          {addNewArticleBtn}
        </button>

        <button className={s.button} onClick={() => handleLabel('list')}>
          {articleListBtn}
        </button>
      </div>
    </div>
  );
};

export default AuthorPanel;
