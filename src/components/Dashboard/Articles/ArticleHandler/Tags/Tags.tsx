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

const Tags = ({ tags, localTags, setLocalTags }: TagsProps) => {
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [options, setOptions] = useState<SelectOption[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );

  // if (tags) {
  //   const blogs = allBlogs?.reduce((acc: ISO[], adm) => {
  //     // console.log(0, allBlogs, adm);
  //     const optionTitle = setUpperFirstChar(adm.title);
  //     acc = [...acc, { value: adm.title, label: optionTitle }];
  //     return acc;
  //   }, []);

  //   return { blogs };
  // }

  useEffect(() => {
    console.log('tags', tags);

    tags && updateOptions('');

    // const options: SetStateAction<SelectOption[] | null> = [];

    // if (tags) {
    //   tags.forEach(tag => {
    //     const optionTitle = setUpperFirstChar(tag);
    //     options.push({ value: tag, label: optionTitle });
    //   });
    // }

    // tags && setOptions(options);
  }, [tags]);

  useEffect(() => {
    console.log('selectedOption', selectedOption);

    if (selectedOption) {
      const currentTags = localTags
        ? [...localTags, selectedOption?.value]
        : [selectedOption?.value];

      setLocalTags(currentTags);
      updateOptions(selectedOption?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const updateOptions = (selectedTag: string) => {
    const options: SetStateAction<SelectOption[] | null> = [];

    if (tags) {
      tags.forEach(tag => {
        if (localTags?.includes(tag)) return;
        if (localTags?.includes(selectedTag)) return;
        const optionTitle = setUpperFirstChar(tag);
        options.push({ value: tag, label: optionTitle });
      });
    }

    tags && setOptions(options);
  };

  // console.log('options', options);
  // console.log('localTags', localTags);

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
                  <span className={s.closeButton} />
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
