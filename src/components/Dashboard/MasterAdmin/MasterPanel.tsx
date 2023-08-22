import { useState } from 'react';
import { useGlobalContext } from '../../../context/GlobalContext';
import s from './MasterPanel.module.scss';
import AddAuthor from './AddAuthor';

const MasterAdminPanel = () => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  const { access } = useGlobalContext();

  return (
    <div className={s.masterPanel}>
      <h3 className={s.title}>Master panel</h3>

      <button className={s.button} onClick={() => setIsOpenForm(!isOpenForm)}>
        {access?.author}
      </button>
      {isOpenForm && <AddAuthor />}
    </div>
  );
};

export default MasterAdminPanel;
