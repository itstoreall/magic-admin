import s from './AuthorPanel.module.scss';
import cfg from './config/authorPanel.config';

const AuthorPanel = () => {
  const { addNewArticle } = cfg.content;
  const { addNewArticleBtn } = cfg.button;
  const { addNewArticleTitle } = cfg.title;

  return (
    <div className={`${s.masterPanel} ${s['dark']}`}>
      <h3 className={s.title}>Master panel</h3>

      <div className={s.formWrap}>
        <div className={s.formBlock}>
          <button
            className={s.button}
            // onClick={() => formModalHandler(addNewAuthor)}
          >
            {addNewArticleBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorPanel;
