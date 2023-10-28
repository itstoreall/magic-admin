// import { ApolloError } from '@apollo/client';
import FormHandler from '../../../../FormHandler';
import InputSelect from '../../../../FormHandler/InputSelect';
import Button from '../../../../Button';
import { ISelectOption } from '../../../../../interfaces';
import cfg from '../../config/masterPanel.config';
import { useEffect, useState } from 'react';

export interface IDelAuthorFromBlogProps {
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

export interface IDelAuthorFromBlogCurrentOpts {
  admins: ISelectOption[];
  blogs: ISelectOption[];
}

const DelAuthorFromBlog = ({
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
}: IDelAuthorFromBlogProps) => {
  const [currentOpts, setCurrentOpts] = useState<ISelectOption[]>([]);

  useEffect(() => {
    if (authorSelect && options)
      setCurrentOpts(options.blogs[authorSelect.value]);
  }, [authorSelect, options]);

  useEffect(() => {
    !currentOpts.find(opt => blogSelect && opt.value === blogSelect?.value) &&
      setBlogSelect(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOpts]);

  return (
    <>
      {options && (
        <FormHandler
          handleSubmit={handleSubmit}
          title={title}
          closeForm={closeForm}
          isSubmitError={isSubmitError}
          apolloError={apolloError}
          isSuccess={isSuccess}
        >
          <InputSelect
            options={options.admins}
            selectedValue={authorSelect}
            setSelectedValue={setAuthorSelect}
            placeholder={'Author'}
          />

          <InputSelect
            options={currentOpts}
            selectedValue={blogSelect}
            setSelectedValue={setBlogSelect}
            placeholder={currentOpts.length ? 'Blog' : '...'}
          />

          <Button type={'submit'} disabled={apolloLoading}>
            {cfg.submitButton.delete}
          </Button>
        </FormHandler>
      )}
    </>
  );
};

export default DelAuthorFromBlog;
