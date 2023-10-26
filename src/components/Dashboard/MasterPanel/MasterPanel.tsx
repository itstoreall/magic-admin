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
    updateBlogTagsBtn
  } = cfg.button;

  const {
    addNewAuthorTitle,
    delAuthorFromBlogTitle,
    addAuthorToBlogTitle,
    updateBlogTagsTitle
  } = cfg.title;

  const formModalHandler = (cont: string) =>
    setFormContent(formContent !== cont ? cont : !formContent ? cont : '');

  const actionTitle = () => {
    switch (formContent) {
      case addNewAuthor:
        return addNewAuthorTitle;
      case delAuthorFromBlog:
        return delAuthorFromBlogTitle;
      case addAuthorToBlog:
        return addAuthorToBlogTitle;
      case updateBlogTags:
        return updateBlogTagsTitle;
      default:
        return '';
    }
  };

  return (
    <div className={`${s.masterPanel}`}>
      <h3 className={s.title}>Master</h3>

      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '100%',
          maxWidth: '322px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      >
        <AdminAction
          formContent={formContent}
          title={actionTitle()}
          closeForm={setFormContent}
        />
      </div>

      <div className={s.formWrap}>
        <div className={s.formBlock}>
          <button
            className={s.button}
            onClick={() => formModalHandler(addNewAuthor)}
          >
            {addNewAuthorBtn}
          </button>
        </div>

        <div className={s.formBlock}>
          <button
            className={s.button}
            onClick={() => formModalHandler(delAuthorFromBlog)}
          >
            {delAuthorFromBlogBtn}
          </button>
        </div>

        <div className={s.formBlock}>
          <button
            className={s.button}
            onClick={() => formModalHandler(addAuthorToBlog)}
          >
            {addAuthorToBlogBtn}
          </button>
        </div>

        <div className={s.formBlock}>
          <button
            className={s.button}
            onClick={() => formModalHandler(updateBlogTags)}
          >
            {updateBlogTagsBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterAdminPanel;
