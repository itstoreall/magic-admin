import { useState } from 'react';
// import { useGlobalContext } from '../../../context/GlobalContext';
import s from './MasterPanel.module.scss';
import AddAuthor from './AddAuthor';

const MasterAdminPanel = () => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  // const { theme } = useGlobalContext();

  // const formModalHandler = (value?: boolean) => {
  //   setIsOpenForm(value ? value : !isOpenForm);
  // };

  return (
    <div className={`${s.masterPanel} ${s['dark']}`}>
      <h3 className={s.title}>Master panel</h3>

      <div className={s.formWrap}>
        <div className={s.formBlock}>
          <button
            className={s.button}
            onClick={() => setIsOpenForm(!isOpenForm)}
          >
            Add new author
          </button>

          {isOpenForm && <AddAuthor isOpenForm={isOpenForm} />}
        </div>

        {/* <div className={s.formBlock}>
          <button
            className={s.button}
            onClick={() => setIsOpenForm(!isOpenForm)}
          >
            Add new author
          </button>

          {isOpenForm && <AddAuthor isOpenForm={isOpenForm} />}
        </div> */}
      </div>
    </div>
  );
};

export default MasterAdminPanel;
