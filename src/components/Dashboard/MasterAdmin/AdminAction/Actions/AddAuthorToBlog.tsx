import { ApolloError } from '@apollo/client';
import { ISelectOption } from '../../../../../interfaces';
import cfg from '../../config/masterPanel.config';
import FormHandler from '../../../../FormHandler';
import InputSelect from '../../../../FormHandler/InputSelect';
import Button from '../../../../Button';

export interface IAddAuthorToBlogProps {
  handleSubmit(e: React.FormEvent): void;
  title: string;
  isSubmitError: boolean;
  addError: ApolloError | null;
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
  isSubmitError,
  addError,
  isSuccess,
  options,
  authorSelect,
  setAuthorSelect,
  blogSelect,
  setBlogSelect,
}: IAddAuthorToBlogProps) => {
  return (
    <>
      {options && options?.admins && (
        <FormHandler
          handleSubmit={handleSubmit}
          title={title}
          isSubmitError={isSubmitError}
          apolloError={addError}
          isSuccess={isSuccess}
        >
          <InputSelect
            options={options.admins}
            selectedValue={authorSelect}
            setSelectedValue={setAuthorSelect}
            placeholder={'Author'}
          />

          <InputSelect
            options={options.blogs}
            selectedValue={blogSelect}
            setSelectedValue={setBlogSelect}
            placeholder={'Blog'}
          />

          <Button
            type={'submit'}
            // disabled={loading}
          >
            {cfg.submitButton.add}
          </Button>
        </FormHandler>
      )}
    </>
  );
};

export default AddAuthorToBlog;
