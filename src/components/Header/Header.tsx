import s from './Header.module.scss';
import { useGlobalContext } from '../../context/GlobalContext';
import setUpperFirstChar from '../../utils/setUpperFirstChar';
import ReactLogo from '../../assets/icons/ReactLogo/ReactLogo';
import { SITE_ASTRAIA, SITE_HEALTHY } from '../../constants';

const adm = process.env.REACT_APP_ADMIN_ACCESS;
const astraiaSite = SITE_ASTRAIA;
const healthySite = SITE_HEALTHY;

const Header = () => {
  const {
    access,
    setAccess,
    articles,
    setArticles,
    label,
    setLabel,
    isUpdatedArt,
    setIsUpdatedArt,
    isDeletedArt,
    setIsDeletedArt,
    isPreview,
    setIsPreview,
  } = useGlobalContext();

  const login = () => {
    setAccess({ isAdmin: false, author: '', blog: '' });
  };

  const logout = () => {
    adm && localStorage.removeItem(adm);
    setAccess({ isAdmin: false, author: '', blog: '' });
    articles?.length && setArticles([]);
    label !== 'list' && setLabel('list');
    isUpdatedArt && setIsUpdatedArt(false);
    isDeletedArt && setIsDeletedArt(false);
    isPreview && setIsPreview(false);
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
          <div className={s.infoWrap}>
            <span>blog: </span>
            <a
              className={s.refToSite}
              href={
                access?.blog === 'astraia'
                  ? astraiaSite
                  : access?.blog === 'healthy'
                  ? healthySite
                  : '/'
              }
              target='_blank'
              rel='noreferrer'
            >
              <span className={s.value}>{`${
                !access || !access.blog ? null : setUpperFirstChar(access.blog)
              }`}</span>
            </a>
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
