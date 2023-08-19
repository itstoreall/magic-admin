import s from './Header.module.scss';
import { useGlobalContext } from '../../context/GlobalContext';
import setUpperFirstChar from '../../utils/setUpperFirstChar';
import ReactLogo from '../../assets/icons/ReactLogo/ReactLogo';

const adm = process.env.REACT_APP_ADMIN_ACCESS;

const Header = () => {
  const { access, setAccess } = useGlobalContext();

  const login = () => {
    setAccess({ isAdmin: false, author: '', blog: '' });
  };

  const logout = () => {
    adm && localStorage.removeItem(adm);
    setAccess({ isAdmin: false, author: '', blog: '' });
  };

  const enterHandler = () => {
    if (!access) return login();
    if (!access?.isAdmin) return;
    logout();
  };

  const admin = !access || !access.isAdmin ? '' : access.isAdmin && 'admin';

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={`${s.content} ${s[admin]}`}>
          <ReactLogo />
          <div className={s.infoWrop}>
            <span>blog: </span>
            <span className={s.value}>{`${
              !access || !access.blog ? null : setUpperFirstChar(access.blog)
            }`}</span>
            <span> | auth: </span>
            <span className={s.value}>{`${
              !access || !access.author ? null : access.author
            }`}</span>
            <span> | log: </span>
            <span
              className={`${s.value} ${s.button}`}
              onClick={enterHandler}
            >{`${!access ? 'process' : !access?.isAdmin ? 'in' : 'out'}`}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
