/* eslint-disable react-hooks/exhaustive-deps */
// import { ApolloError } from '@apollo/client';
import { ISelectOption } from '../../../../../interfaces';
import cfg from '../../config/masterPanel.config';
import FormHandler from '../../../../FormHandler';
import InputSelect from '../../../../FormHandler/InputSelect';
import { useEffect, useRef, useState } from 'react';
import Button from '../../../../Button';
import s from '../AdminAction.module.scss';

export interface IUpdateBlogTagsProps {
  handleSubmit(e: React.FormEvent): void;
  title: string;
  closeForm: (s: string) => void;
  isSubmitError: boolean;
  apolloError: string;
  apolloLoading: boolean;
  isSuccess: boolean;
  options: any;
  blogSelect: ISelectOption | null;
  setBlogSelect(opt: ISelectOption | null): void;
  blogTags: string[];
  localTags: string[];
  setLocalTags: (arr: string[]) => void;
}

const UpdateBlogTags = ({
  handleSubmit,
  title,
  closeForm,
  isSubmitError,
  apolloError,
  apolloLoading,
  isSuccess,
  options,
  blogSelect,
  setBlogSelect,
  blogTags,
  localTags,
  setLocalTags
}: IUpdateBlogTagsProps) => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [inputValueWidth, setInputValueWidth] = useState<number>(20);
  const [isErr, setIsErr] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ref = contentRef.current;
    ref && setInputValueWidth(ref?.clientWidth);
  });

  useEffect(() => {
    setLocalTags(blogTags);
  }, [blogTags]);

  const handleInputValue = (value: string) => {
    isErr && setIsErr(false);
    setInputValue(value);
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = localTags.filter(tag => tag !== tagToRemove);
    setLocalTags(updatedTags);
  };

  const addTag = (tagToAdd: string) => {
    const tag = tagToAdd.toLocaleLowerCase();
    if (localTags.includes(tag)) return setIsErr(true);
    setLocalTags([...localTags, tag]);
    setInputValue(null);
    isErr && setIsErr(false);
  };

  const isReadyToSubmit = () => inputValue && inputValue?.length > 1;
  const isNewTag = (tag: string) => (blogTags.includes(tag) ? '' : 'new');
  const isError = isErr ? 'error' : '';
  const switchToSubmitStyle = isReadyToSubmit() ? 'is' : '';
  const addTagButtonStyle = `${s.tagButton} ${s.add} ${s[switchToSubmitStyle]}`;

  const Tags = () => (
    <>
      {localTags.map((tag: string, idx: number) => (
        <span key={idx} className={s.tagBox}>
          <span className={`${s.tag} ${s[isNewTag(tag)]}`}>{tag}</span>
          <span
            className={`${s.tagButton} ${s.remove} ${s[isNewTag(tag)]}`}
            onClick={() => removeTag(tag)}
          />
        </span>
      ))}
    </>
  );

  const TagInput = () => (
    <span className={s.tagBox}>
      {inputValue !== null && (
        <>
          <input
            className={`${s.tagInput} ${s[isError]}`}
            style={{ width: `${inputValueWidth}px` }}
            value={inputValue}
            onChange={e => handleInputValue(e.target.value)}
            autoFocus
          />
          <span className={s.inputValueDublicate} ref={contentRef}>
            {inputValue}
          </span>
        </>
      )}
      <span
        className={addTagButtonStyle}
        onClick={() =>
          isReadyToSubmit() && inputValue
            ? addTag(inputValue)
            : setInputValue('')
        }
      />
    </span>
  );

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
          formContent={cfg.content.updateBlogTags}
        >
          <InputSelect
            options={options.blogs}
            selectedValue={blogSelect}
            setSelectedValue={setBlogSelect}
            placeholder={'Blog'}
            disabled={false}
          />

          <div className={s.blogTagsWrap}>
            {localTags.length ? (
              <>
                <Tags />
                <TagInput />
              </>
            ) : (
              <>
                <span className={s.noTags}>no tags!</span>
                {blogSelect && <TagInput />}
              </>
            )}
          </div>

          <Button type={'submit'} disabled={apolloLoading}>
            {cfg.submitButton.add}
          </Button>
        </FormHandler>
      )}
    </>
  );
};

export default UpdateBlogTags;
