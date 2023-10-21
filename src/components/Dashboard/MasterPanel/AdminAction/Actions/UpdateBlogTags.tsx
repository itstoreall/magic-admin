import { ApolloError } from '@apollo/client';
import { ISelectOption } from '../../../../../interfaces';
// import cfg from '../../config/masterPanel.config';
import FormHandler from '../../../../FormHandler';
import InputSelect from '../../../../FormHandler/InputSelect';
// import Button from '../../../../Button';

export interface IUpdateBlogTagsProps {
  handleSubmit(e: React.FormEvent): void;
  title: string;
  closeForm: (s: string) => void;
  isSubmitError: boolean;
  apolloError: ApolloError | undefined;
  isSuccess: boolean;
  options: any;
  authorSelect: ISelectOption | null;
  setAuthorSelect(opt: ISelectOption | null): void;
  blogSelect: ISelectOption | null;
  setBlogSelect(opt: ISelectOption | null): void;
}

const UpdateBlogTags = ({
  handleSubmit,
  title,
  closeForm,
  isSubmitError,
  apolloError,
  isSuccess,
  options,
  authorSelect,
  setAuthorSelect,
  blogSelect,
  setBlogSelect,
}: IUpdateBlogTagsProps) => {
  // console.log(11);
  return (
    <>
      {/* {options && options?.admins && ( */}
      <FormHandler
        handleSubmit={handleSubmit}
        title={title}
        closeForm={closeForm}
        isSubmitError={isSubmitError}
        apolloError={apolloError || null}
        isSuccess={isSuccess}
      >
        <InputSelect
          options={options.blogs}
          selectedValue={blogSelect}
          setSelectedValue={setBlogSelect}
          placeholder={'Blog'}
        />
        {/* <InputSelect
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
        </Button> */}
      </FormHandler>
      {/* )} */}
    </>
  );
};

export default UpdateBlogTags;
