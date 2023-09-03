import { useEffect, useState } from 'react';
import s from './MasterPanel.module.scss';
import AdminAction from './AdminAction';
import cfg from './config/masterPanel.config';

const MasterAdminPanel = () => {
  const [formContent, setFormContent] = useState<string>('');

  const { addNewAuthor, delAuthorFromBlog } = cfg.content;
  const { addNewAuthorBtn, delAuthorFromBlogBtn } = cfg.button;
  const { addNewAuthorTitle, delAuthorFromBlogTitle } = cfg.title;

  // const { theme } = useGlobalContext();

  const formModalHandler = (content: string) => {
    setFormContent(
      formContent !== content ? content : !formContent ? content : ''
    );
  };

  // console.log('isOpenForm', isOpenForm);

  return (
    <div className={`${s.masterPanel} ${s['dark']}`}>
      <h3 className={s.title}>Master panel</h3>

      <div className={s.formWrap}>
        <div className={s.formBlock}>
          <button
            className={s.button}
            onClick={() => formModalHandler(addNewAuthor)}
          >
            {addNewAuthorBtn}
          </button>

          {formContent === addNewAuthor && (
            <AdminAction formContent={formContent} title={addNewAuthorTitle} />
          )}
        </div>

        <div className={s.formBlock}>
          <button
            className={s.button}
            onClick={() => formModalHandler(delAuthorFromBlog)}
          >
            {delAuthorFromBlogBtn}
          </button>

          {formContent === delAuthorFromBlog && (
            <AdminAction
              formContent={formContent}
              title={delAuthorFromBlogTitle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterAdminPanel;
