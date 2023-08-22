import { IFormHandlerProps } from '../../interfaces/form';
import s from './FormHandler.module.scss';
import Form from './Form';

const FormHandler = ({
  children,
  handleSubmit,
  title,
  isError,
}: IFormHandlerProps) => {
  return (
    <div className={`${s.wrap} ${s['dark']}`}>
      <div className={s.form}>
        <span className={s.title}>{title}</span>

        <Form handleSubmit={handleSubmit}>{children}</Form>
      </div>

      {isError && <p className={s.loginError}>Все поля обязательны</p>}

      {/* {error && (
        <p className={s.loginError}>
          {error.message === 'Access denied!'
            ? 'Неверный логин или пароль'
            : `${error.message}`}
        </p>
      )} */}
    </div>
  );
};

export default FormHandler;
