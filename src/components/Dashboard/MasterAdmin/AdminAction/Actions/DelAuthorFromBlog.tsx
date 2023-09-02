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
  blog: ISelectOption | null;
  setBlog(opt: ISelectOption | null): void;
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
  blog,
  setBlog,
}: IDelAuthorFromBlogProps) => {
  // const [selectedAdm, setSelectedAdm] = useState<string>('');
  const [currentOpts, setCurrentOpts] = useState<ISelectOption[]>([]);

  useEffect(() => {
    // setCurrentOpts();
    if (authorSelect) {
      // console.log('authorSelect --------->', authorSelect.value);
      // console.log(
      //   'options.blogs --------->',
      //   options.blogs[authorSelect.value]
      // );

      setCurrentOpts(options.blogs[authorSelect.value]);
    }
  }, [authorSelect]);

  console.log('currentOpts --------->', currentOpts);
  console.log('options ---->', options);

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
            selectedValue={blog}
            setSelectedValue={setBlog}
            placeholder={currentOpts.length ? 'Blog' : ''}
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
