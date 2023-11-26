// import { ApolloError } from '@apollo/client';
import cfg from '../../config/masterPanel.config';
import { ISelectOption } from '../../../../../interfaces';
import FormHandler from '../../../../FormHandler';
import InputSelect from '../../../../FormHandler/InputSelect';
import Button from '../../../../Button';

export interface IAddAuthorToBlogProps {
  handleSubmit(e: React.FormEvent): void;
  title: string;
  closeForm: (s: string) => void;
  isSubmitError: boolean;
  apolloError: string;
  // apolloError: ApolloError | undefined;
  apolloLoading: boolean;
  isSuccess: boolean;
  options: any;
  authorSelect: ISelectOption | null;
  setAuthorSelect(opt: ISelectOption | null): void;
  blogSelect: ISelectOption | null;
  setBlogSelect(opt: ISelectOption | null): void;
}

const AddAuthorToBlog = ({
  handleSubmit,
  title,
  closeForm,
  isSubmitError,
  apolloError,
  apolloLoading,
  isSuccess,
  options,
  authorSelect,
  setAuthorSelect,
  blogSelect,
  setBlogSelect
}: IAddAuthorToBlogProps) => {
  return (
    <>
      {options && options?.admins && (
        <FormHandler
          handleSubmit={handleSubmit}
          title={title}
          closeForm={closeForm}
          isSubmitError={isSubmitError}
          apolloError={apolloError}
          isSuccess={isSuccess}
          formContent={cfg.content.addAuthorToBlog}
        >
          <InputSelect
            options={options.admins}
            selectedValue={authorSelect}
            setSelectedValue={setAuthorSelect}
            placeholder={'Author'}
            disabled={false}
          />

          <InputSelect
            options={options.blogs}
            selectedValue={blogSelect}
            setSelectedValue={setBlogSelect}
            placeholder={'Blog'}
            disabled={false}
          />

          <Button type={'submit'} disabled={apolloLoading}>
            {cfg.submitButton.add}
          </Button>
        </FormHandler>
      )}
    </>
  );
};

export default AddAuthorToBlog;
