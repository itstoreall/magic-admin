import { ApolloError } from '@apollo/client';
import FormHandler from '../../../../FormHandler';
import InputSelect from '../../../../FormHandler/InputSelect';
import Button from '../../../../Button';
import { ISelectOption } from '../../../../../interfaces/login';
import cfg from '../../config/masterPanel.config';

export interface IDelAuthorFromBlogProps {
  handleSubmit(e: React.FormEvent): void;
  title: string;
  isSubmitError: boolean;
  addError: ApolloError | null;
  isSuccess: boolean;
  options: any;
  blog: ISelectOption | null;
  setBlog(opt: ISelectOption | null): void;
}

const DelAuthorFromBlog = ({
  handleSubmit,
  title,
  isSubmitError,
  addError,
  isSuccess,
  options,
  blog,
  setBlog,
}: IDelAuthorFromBlogProps) => {
  return (
    <FormHandler
      handleSubmit={handleSubmit}
      title={title}
      isSubmitError={isSubmitError}
      apolloError={addError}
      isSuccess={isSuccess}
    >
      <InputSelect
        options={options}
        selectedValue={blog}
        setSelectedValue={setBlog}
        placeholder={'Blog'}
      />

      <InputSelect
        options={options}
        selectedValue={blog}
        setSelectedValue={setBlog}
        placeholder={'Blog'}
      />

      <Button
        type={'submit'}
        // disabled={loading}
      >
        {cfg.submitButton.add}
      </Button>
    </FormHandler>
  );
};

export default DelAuthorFromBlog;
