import { FormEvent } from 'react';
import s from './Form.module.scss';
import { IFormProps } from '../../../interfaces/form';

const Form = ({ children, handleSubmit }: IFormProps) => {
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <form className={`${s.form} ${s['dark']}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
