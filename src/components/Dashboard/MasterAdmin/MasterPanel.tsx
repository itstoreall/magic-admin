import { useState } from 'react';
// import { useGlobalContext } from '../../../context/GlobalContext';
import s from './MasterPanel.module.scss';
import AddAuthor from './AddAuthor';

const MasterAdminPanel = () => {
  // const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [formContent, setFormContent] = useState<string>('');

  // const { theme } = useGlobalContext();

  const formModalHandler = (content: string) => {
    // setIsOpenForm(true);
    setFormContent(
      formContent !== content ? content : !formContent ? content : ''

      // setFormContent(
      //   isOpenForm && formContent !== content
      //     ? content
      //     : !isOpenForm && !formContent
      //     ? content
      //     : ''
    );

    // setIsOpenForm(!formContent ? true : true);
    // setFormContent(isOpenForm && formContent !== content ? content : '');
  };

  // console.log('isOpenForm', isOpenForm);

  return (
    <div className={`${s.masterPanel} ${s['dark']}`}>
      <h3 className={s.title}>Master panel</h3>

      <div className={s.formWrap}>
        <div className={s.formBlock}>
          <button
            className={s.button}
            onClick={() => formModalHandler('add_author')}
          >
            Add new author
          </button>

          {formContent === 'add_author' && (
            <AddAuthor
              title={'New author'}
              // isOpenForm={isOpenForm}
              // formModalHandler={formModalHandler}
            />
          )}
        </div>

        <div className={s.formBlock}>
          <button
            className={s.button}
            onClick={() => formModalHandler('delete_author')}
          >
            Delete author
          </button>

          {formContent === 'delete_author' && (
            <AddAuthor title={'Delete author'} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterAdminPanel;
