/* eslint-disable react-hooks/exhaustive-deps */
import { ApolloError } from '@apollo/client';
import { ISelectOption } from '../../../../../interfaces';
import cfg from '../../config/masterPanel.config';
import FormHandler from '../../../../FormHandler';
import InputSelect from '../../../../FormHandler/InputSelect';
import Button from '../../../../Button';
import s from '../AdminAction.module.scss';
import { useEffect, useRef, useState } from 'react';

export interface IUpdateBlogTagsProps {
  handleSubmit(e: React.FormEvent): void;
  title: string;
  closeForm: (s: string) => void;
  isSubmitError: boolean;
  apolloError: ApolloError | undefined;
  isSuccess: boolean;
  options: any;
  blogSelect: ISelectOption | null;
  setBlogSelect(opt: ISelectOption | null): void;
  blogTags: string[];
}

const UpdateBlogTags = ({
  handleSubmit,
  title,
  closeForm,
  isSubmitError,
  apolloError,
  isSuccess,
  options,
  blogSelect,
  setBlogSelect,
  blogTags,
}: IUpdateBlogTagsProps) => {
  const [localTags, setLocalTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [inputValueWidth, setInputValueWidth] = useState<number>(20);
  const [isErr, setIsErr] = useState<boolean>(false);

  // console.log(11, blogSelect);

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ref = contentRef.current;
    ref && console.log('ref', ref.clientWidth);
    ref && setInputValueWidth(ref?.clientWidth);
  });

  console.log('inputValueWidth', inputValueWidth);

  useEffect(() => {
    setLocalTags(blogTags);
  }, [blogTags]);

  // console.log('localTags', localTags);

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

  console.log('localTags ---->', localTags);

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
          apolloError={apolloError || null}
          isSuccess={isSuccess}
        >
          <InputSelect
            options={options.blogs}
            selectedValue={blogSelect}
            setSelectedValue={setBlogSelect}
            placeholder={'Blog'}
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

export default UpdateBlogTags;
