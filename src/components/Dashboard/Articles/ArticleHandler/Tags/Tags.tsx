import { SetStateAction, useEffect, useState } from 'react';
import s from './Tags.module.scss';
import InputSelect from '../../../../FormHandler/InputSelect';
import setUpperFirstChar from '../../../../../utils/setUpperFirstChar';
import { SelectOption } from '../../../../../types';

type TagsProps = {
  blogTags: string[] | null;
  articleTags: string[] | null;
  localTags: string[] | null;
  setLocalTags: (s: string[]) => void;
};

type OptionsType = SetStateAction<SelectOption[] | null>;

const labels = {
  init: 'init',
  select: 'select',
  remove: 'remove'
};

const Tags = ({
  blogTags,
  articleTags,
  localTags,
  setLocalTags
}: TagsProps) => {
  const [options, setOptions] = useState<SelectOption[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );

  useEffect(() => {
    if (blogTags && articleTags) {
      blogTags && updateOptions(labels.init, blogTags, '');
      setLocalTags(articleTags);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogTags, articleTags]);

  useEffect(() => {
    if (selectedOption) {
      const currentTags = localTags
        ? [...localTags, selectedOption?.value]
        : [selectedOption?.value];

      setLocalTags(currentTags);
      blogTags && updateOptions(labels.select, blogTags, selectedOption?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const updateOptions = (
    label: string,
    tagArr: string[],
    selectedTag: string
  ) => {
    const options: OptionsType = [];

    if (!blogTags) return;

    console.log('articleTags', articleTags);

    if (label === labels.init || label === labels.select) {
      tagArr.forEach(tag => {
        if (label === labels.init && articleTags?.includes(tag)) return;
        if (localTags?.includes(tag)) return;
        if (tag === selectedTag) return;

        const optionTitle = setUpperFirstChar(tag);
        options.push({ value: tag, label: optionTitle });
      });
    }

    if (label === labels.remove) {
      blogTags.forEach(tag => {
        if (tagArr?.includes(tag)) return;
        const optionTitle = setUpperFirstChar(tag);
        options.push({ value: tag, label: optionTitle });
      });
    }

    setOptions(options);
    setSelectedOption(null);
  };

  const removeTagFromLocals = (tag: string) => {
    const options: SetStateAction<SelectOption[] | null> = [];

    if (localTags && blogTags && options) {
      const updatedLocalTags = localTags.filter(el => el !== tag);
      setLocalTags(updatedLocalTags);
      updateOptions('remove', updatedLocalTags, '');
    }
  };

  return (
    <>
      {options && (
        <div className={s.tagsBlock}>
          <div className={s.selectWrap}>
            <InputSelect
              options={options}
              selectedValue={selectedOption}
              setSelectedValue={setSelectedOption}
              placeholder='Tag'
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
      )}
    </>
  );
};

export default Tags;
