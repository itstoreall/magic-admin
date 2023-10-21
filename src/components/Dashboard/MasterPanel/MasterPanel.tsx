import { useState } from 'react';
import AdminAction from './AdminAction';
import cfg from './config/masterPanel.config';
import s from './MasterPanel.module.scss';

const MasterAdminPanel = () => {
  const [formContent, setFormContent] = useState<string>('');

  const { addNewAuthor, delAuthorFromBlog, addAuthorToBlog, updateBlogTags } =
    cfg.content;

  const {
    addNewAuthorBtn,
    delAuthorFromBlogBtn,
    addAuthorToBlogBtn,
    updateBlogTagsBtn,
  } = cfg.button;

  const {
    addNewAuthorTitle,
    delAuthorFromBlogTitle,
    addAuthorToBlogTitle,
    updateBlogTagsTilte,
  } = cfg.title;

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
            <AdminAction
              formContent={formContent}
              title={addNewAuthorTitle}
              closeForm={setFormContent}
            />
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
              closeForm={setFormContent}
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
              closeForm={setFormContent}
            />
          )}
        </div>

        <div className={s.formBlock}>
          <button
            className={s.button}
            onClick={() => formModalHandler(updateBlogTags)}
          >
            {updateBlogTagsBtn}
          </button>

          {formContent === updateBlogTags && (
            <AdminAction
              formContent={formContent}
              title={updateBlogTagsTilte}
              closeForm={setFormContent}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterAdminPanel;
