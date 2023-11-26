import { SetStateAction, useEffect, useState } from 'react';
import setUpperFirstChar from '../../../../../utils/setUpperFirstChar';
import InputSelect from '../../../../FormHandler/InputSelect';
import { SelectOption } from '../../../../../types';
import { labels } from './config';
import * as t from './types';
import s from './Tags.module.scss';

const Tags = (props: t.TagsProps) => {
  const [options, setOptions] = useState<SelectOption[] | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<SelectOption | null>(null);

  const {
    blogTags,
    articleTags,
    localTags,
    setLocalTags,
    isReset,
    handleClickReset
  } = props;

  // console.log('');
  // console.log('blogTags', blogTags);
  // console.log('articleTags', articleTags);
  // console.log('localTags', localTags);
  // console.log('options', options);

  useEffect(() => {
    if (!blogTags) return;
    updateOpts({ label: labels.init, tags: blogTags, selectedTag: '' });
    !localTags && articleTags && setLocalTags(articleTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogTags, articleTags]);

  useEffect(() => {
    if (!selectedOpt) return;

    const currentTags = localTags
      ? [...localTags, selectedOpt?.value]
      : [selectedOpt?.value];

    setLocalTags(currentTags);

    if (!blogTags) return;

    updateOpts({
      label: labels.select,
      tags: blogTags,
      selectedTag: selectedOpt?.value
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOpt]);

  useEffect(() => {
    if (!blogTags) return;
    isReset !== null &&
      updateOpts({
        label: labels.reset,
        tags: blogTags,
        selectedTag: ''
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReset]);

  const updateOpts: t.UpdateOptions = args => {
    const { label, tags, selectedTag } = args;
    const options: t.OptionsType = [];

    if (!blogTags) return;

    if (label === labels.reset) {
      tags.forEach(tag => {
        const optionTitle = setUpperFirstChar(tag);
        options.push({ value: tag, label: optionTitle });
      });

      setTimeout(() => {
        handleClickReset(null);
      }, 2000);
    }

    if (label === labels.init || label === labels.select) {
      tags.forEach(tag => {
        if (!localTags && label === labels.init && articleTags?.includes(tag))
          return;
        if (localTags?.includes(tag)) return;
        if (tag === selectedTag) return;

        const optionTitle = setUpperFirstChar(tag);
        options.push({ value: tag, label: optionTitle });
      });
    }

    if (label === labels.remove) {
      blogTags.forEach(tag => {
        if (tags?.includes(tag)) return;
        const optionTitle = setUpperFirstChar(tag);
        options.push({ value: tag, label: optionTitle });
      });
    }

    setOptions(options);
    setSelectedOpt(null);
  };

  const removeTagFromLocals = (tag: string) => {
    const options: SetStateAction<SelectOption[] | null> = [];

    if (localTags && blogTags && options) {
      const updatedTags = localTags.filter(el => el !== tag);
      setLocalTags(updatedTags);
      updateOpts({ label: labels.remove, tags: updatedTags, selectedTag: '' });
    }
  };

  return (
    <>
      <div className={s.tagsBlock}>
        <div className={s.selectWrap}>
          <InputSelect
            options={options ? options : []}
            selectedValue={selectedOpt}
            setSelectedValue={setSelectedOpt}
            placeholder={!options?.length ? 'No tags' : 'Tag'}
            disabled={!options?.length ? true : false}
          />
        </div>

        {localTags && (
          <div className={s.tagsWrap}>
            {localTags.map((tag: string, idx: number) => (
              <span key={idx} className={s.tagBox}>
                <span className={s.tag}>{tag}</span>
                <span
                  className={s.closeButton}
                  onClick={() => removeTagFromLocals(tag)}
                />
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Tags;
