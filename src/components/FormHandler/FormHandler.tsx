import cfg from '../Dashboard/MasterPanel/config/masterPanel.config';
import { IFormHandlerProps } from '../../interfaces/form';
import Form from './Form';
import Success from '../../assets/icons/Success';
import * as theme from '../../theme';
import s from './FormHandler.module.scss';

const FormHandler = ({
  children,
  handleSubmit,
  title,
  closeForm,
  isSubmitError,
  apolloError,
  isSuccess,
  formContent
}: IFormHandlerProps) => {
  const { updateBlogTags } = cfg.content;

  const setContentStyle = () => {
    return formContent === updateBlogTags ? 'updateTags' : '';
  };

  return (
    <div className={`${s.formWrap} ${s[setContentStyle()]}`}>
      <div className={s.formBlock}>
        <span className={s.closeButton} onClick={() => closeForm('')} />
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
          {apolloError === 'Access denied!'
            ? 'Wrong login or password!'
            : `${apolloError}`}
        </p>
      )}
    </div>
  );
};

export default FormHandler;
