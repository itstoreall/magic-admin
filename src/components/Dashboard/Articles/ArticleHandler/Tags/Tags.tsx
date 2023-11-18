import { SetStateAction, useEffect, useState } from 'react';
import s from './Tags.module.scss';
import InputSelect from '../../../../FormHandler/InputSelect';
import setUpperFirstChar from '../../../../../utils/setUpperFirstChar';
import { SelectOption } from '../../../../../types';

type TagsProps = {
  tags: string[] | null;
  localTags: string[] | null;
  setLocalTags: (s: string[]) => void;
};

const labels = {
  init: 'init',
  select: 'select',
  remove: 'remove'
};

const Tags = ({ tags, localTags, setLocalTags }: TagsProps) => {
  const [options, setOptions] = useState<SelectOption[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );

  useEffect(() => {
    tags && updateOptions(labels.init, tags, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  useEffect(() => {
    if (selectedOption) {
      const currentTags = localTags
        ? [...localTags, selectedOption?.value]
        : [selectedOption?.value];

      setLocalTags(currentTags);
      tags && updateOptions(labels.select, tags, selectedOption?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const updateOptions = (
    label: string,
    tagArr: string[],
    selectedTag: string
  ) => {
    const options: SetStateAction<SelectOption[] | null> = [];

    if (!tags) return;

    if (label === labels.init || label === labels.select) {
      tagArr.forEach(tag => {
        if (localTags?.includes(tag)) return;
        if (tag === selectedTag) return;
        const optionTitle = setUpperFirstChar(tag);
        options.push({ value: tag, label: optionTitle });
      });
    }

    if (label === labels.remove) {
      tags.forEach(tag => {
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

    if (localTags && tags && options) {
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
