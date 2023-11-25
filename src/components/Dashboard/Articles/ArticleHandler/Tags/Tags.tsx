import { SetStateAction, useEffect, useState } from 'react';
import setUpperFirstChar from '../../../../../utils/setUpperFirstChar';
import InputSelect from '../../../../FormHandler/InputSelect';
import { SelectOption } from '../../../../../types';
import * as t from './types';
import s from './Tags.module.scss';

// type TagsProps = {
//   blogTags: string[] | null;
//   articleTags: string[] | null;
//   localTags: string[] | null;
//   setLocalTags: (s: string[]) => void;
// };

// type OptionsType = SetStateAction<SelectOption[] | null>;

// type UpdateOptionsArgs = {
//   label: string;
//   updatedTags: string[];
//   selectedTag: string;
// };

// type UpdateOptions = (args: UpdateOptionsArgs) => void;

const labels = {
  init: 'init',
  select: 'select',
  remove: 'remove'
};

const Tags = (props: t.TagsProps) => {
  const [options, setOptions] = useState<SelectOption[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );

  const { blogTags, articleTags, localTags, setLocalTags } = props;

  useEffect(() => {
    if (blogTags && articleTags) {
      blogTags &&
        updateOptions({
          label: labels.init,
          updatedTags: blogTags,
          selectedTag: ''
        });
      !localTags && setLocalTags(articleTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogTags, articleTags]);

  useEffect(() => {
    if (selectedOption) {
      const currentTags = localTags
        ? [...localTags, selectedOption?.value]
        : [selectedOption?.value];

      setLocalTags(currentTags);

      blogTags &&
        updateOptions({
          label: labels.select,
          updatedTags: blogTags,
          selectedTag: selectedOption?.value
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const updateOptions: t.UpdateOptions = args => {
    const { label, updatedTags, selectedTag } = args;
    const options: t.OptionsType = [];

    console.log('updatedTags', updatedTags);

    if (!blogTags) return;

    if (label === labels.init || label === labels.select) {
      updatedTags.forEach(tag => {
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
        if (updatedTags?.includes(tag)) return;
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
      const updatedTags = localTags.filter(el => el !== tag);
      setLocalTags(updatedTags);
      console.log('updatedTags', updatedTags);
      updateOptions({ label: 'remove', updatedTags, selectedTag: '' });
    }
  };

  return (
    <>
      {options ? (
        <div className={s.tagsBlock}>
          <div className={s.selectWrap}>
            <InputSelect
              options={options}
              selectedValue={selectedOption}
              setSelectedValue={setSelectedOption}
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
      ) : (
        <div className={s.tagsBlock}>
          <div className={s.selectWrap}>
            <InputSelect
              options={[]}
              selectedValue={selectedOption}
              setSelectedValue={setSelectedOption}
              placeholder={'Tag'}
              disabled={false}
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
