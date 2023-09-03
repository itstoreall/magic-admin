import { ApolloError } from '@apollo/client';
import FormHandler from '../../../../FormHandler';
import InputSelect from '../../../../FormHandler/InputSelect';
import Button from '../../../../Button';
import { ISelectOption } from '../../../../../interfaces/login';
import cfg from '../../config/masterPanel.config';
import { useEffect, useState } from 'react';

export interface IDelAuthorFromBlogProps {
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

export interface IDelAuthorFromBlogCurrentOpts {
  admins: ISelectOption[];
  blogs: ISelectOption[];
}

const DelAuthorFromBlog = ({
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
            options={currentOpts}
            selectedValue={blogSelect}
            setSelectedValue={setBlogSelect}
            placeholder={currentOpts.length ? 'Blog' : '...'}
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

export default DelAuthorFromBlog;
