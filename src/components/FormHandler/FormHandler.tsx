import { IFormHandlerProps } from '../../interfaces/form';
import Form from './Form';
import Success from '../../assets/icons/Success';
import * as theme from '../../theme';
import s from './FormHandler.module.scss';

const FormHandler = ({
  children,
  handleSubmit,
  title,
  isSubmitError,
  apolloError,
  isSuccess,
}: IFormHandlerProps) => {
  return (
    <div className={`${s.formWrap}`}>
      <div className={s.form}>
        <span className={s.title}>{title}</span>

        {isSuccess ? (
          <Success fill={theme.reactColor} />
        ) : (
          <Form handleSubmit={handleSubmit}>{children}</Form>
        )}
      </div>

      {isSubmitError && <p className={s.submitError}>All fields required</p>}

      {apolloError && (
        <p className={s.submitError}>
          {apolloError.message === 'Access denied!'
            ? 'Wrong login or password!'
            : `${apolloError.message}`}
        </p>
      )}
    </div>
  );
};

export default FormHandler;
