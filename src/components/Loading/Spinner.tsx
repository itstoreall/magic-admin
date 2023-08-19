import spinner from '../../assets/animated/spinner-three-dots.svg';
import s from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={s.spinnerWrap}>
      <img src={spinner} alt='spinner' />
    </div>
  );
};

export default Spinner;
