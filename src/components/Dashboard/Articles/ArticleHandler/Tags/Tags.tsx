import { useState } from 'react';
import s from './Tags.module.scss';
import InputSelect from '../../../../FormHandler/InputSelect';

const Tags = ({ tags }: { tags: string[] | null }) => {
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<{
    value: string;
    label: string;
  } | null>(null);

  return (
    <>
      {tags && (
        <div className={s.tagsBlock}>
          <div className={s.selectWrap}>
            <InputSelect
              options={[
                {
                  value: 'eee',
                  label: 'Eeee'
                }
              ]}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              placeholder='Tag'
            />
          </div>

          <div className={s.tagsWrap}>
            {tags.map((tag: string, idx: number) => (
              <span key={idx} className={s.tagBox}>
                <span className={s.tag}>{tag}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Tags;
