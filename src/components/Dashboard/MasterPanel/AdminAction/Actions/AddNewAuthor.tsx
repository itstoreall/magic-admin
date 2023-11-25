import { ChangeEvent } from 'react';
// import { ApolloError } from '@apollo/client';
import FormHandler from '../../../../FormHandler';
import InputSelect from '../../../../FormHandler/InputSelect';
import Input from '../../../../FormHandler/Input';
import Button from '../../../../Button';
import { ISelectOption } from '../../../../../interfaces';
import cfg from '../../config/masterPanel.config';

export interface IAddNewAuthorProps {
  handleSubmit(e: React.FormEvent): void;
  title: string;
  closeForm: (s: string) => void;
  isSubmitError: boolean;
  apolloError: string;
  // apolloError: ApolloError | null;
  apolloLoading: boolean;
  isSuccess: boolean;
  options: any;
  blog: ISelectOption | null;
  setBlog(opt: ISelectOption | null): void;
  authorName: string;
  handleInput(e: ChangeEvent<HTMLInputElement>): void;
  login: string;
  password: string;
}

const AddNewAuthor = ({
  handleSubmit,
  title,
  closeForm,
  isSubmitError,
  apolloError,
  apolloLoading,
  isSuccess,
  options,
  blog,
  setBlog,
  authorName,
  handleInput,
  login,
  password
}: IAddNewAuthorProps) => {
  return (
    <FormHandler
      handleSubmit={handleSubmit}
      title={title}
      closeForm={closeForm}
      isSubmitError={isSubmitError}
      apolloError={apolloError}
      isSuccess={isSuccess}
    >
      <InputSelect
        options={options}
        selectedValue={blog}
        setSelectedValue={setBlog}
        placeholder={'Blog'}
        disabled={false}
      />

      <Input
        type={'text'}
        value={authorName}
        name={'authorName'}
        placeholder={'Author'}
        handleInput={handleInput}
      />

      <Input
        type={'text'}
        value={login}
        name={'login'}
        placeholder={'Login'}
        handleInput={handleInput}
      />

      <Input
        type={'text'}
        value={password}
        name={'password'}
        placeholder={'Password'}
        handleInput={handleInput}
      />

      <Button type={'submit'} disabled={apolloLoading}>
        {cfg.submitButton.add}
      </Button>
    </FormHandler>
  );
};

export default AddNewAuthor;
