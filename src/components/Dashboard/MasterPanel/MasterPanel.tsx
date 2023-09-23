import { useState } from 'react';
import AdminAction from './AdminAction';
import cfg from './config/masterPanel.config';
import s from './MasterPanel.module.scss';

const MasterAdminPanel = () => {
  const [formContent, setFormContent] = useState<string>('');

  const { addNewAuthor, delAuthorFromBlog, addAuthorToBlog } = cfg.content;
  const { addNewAuthorBtn, delAuthorFromBlogBtn, addAuthorToBlogBtn } =
    cfg.button;
  const { addNewAuthorTitle, delAuthorFromBlogTitle, addAuthorToBlogTitle } =
    cfg.title;

  const formModalHandler = (content: string) => {
    setFormContent(
      formContent !== content ? content : !formContent ? content : ''
    );
  };

  return (
    <div className={`${s.masterPanel}`}>
      <h3 className={s.title}>Master</h3>

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

        <div className={s.formBlock}>
          <button
            className={s.button}
            onClick={() => formModalHandler(addAuthorToBlog)}
          >
            {addAuthorToBlogBtn}
          </button>

          {formContent === addAuthorToBlog && (
            <AdminAction
              formContent={formContent}
              title={addAuthorToBlogTitle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterAdminPanel;
