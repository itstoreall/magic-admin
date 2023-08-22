import { IFormHandlerProps } from '../../interfaces/form';
import s from './FormHandler.module.scss';
import Form from './Form';

const FormHandler = ({
  children,
  handleSubmit,
  isError,
}: IFormHandlerProps) => {
  return (
    <div className={s.wrap}>
      <div className={`${s.login} ${s['dark']}`}>
        <span className={s.title}>Add new author</span>

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
