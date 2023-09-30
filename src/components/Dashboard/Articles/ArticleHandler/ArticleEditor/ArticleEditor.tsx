import { useState } from 'react';
import {
  ChangeInputValue,
  ChangeTextareaValue,
  MoveElement,
} from '../../../../../types';
import { colorWhite, middleDark } from '../../../../../theme';
import { useArticleHandlerContext } from '../../../../../context/ArticleHandlerContext';
import useViewport from '../../../../../hooks/useViewport';
import s from './ArticleEditor.module.scss';
import Button from '../../../../Button';
import DotsHorizontal from '../../../../../assets/icons/DotsHorizontal';
import DotsVertical from '../../../../../assets/icons/DotsVertical';
import Arrow from '../../../../../assets/icons/Arrow';
import Delete from '../../../../../assets/icons/Delete';
import Edit from '../../../../../assets/icons/Edit';

const ArticleEditor = () => {
  const [element, setElement] = useState<string>('');
  const [action, setAction] = useState<string | null>(null);
  const [isOpenEditMenu, setIsOpenEditMenu] = useState<boolean>(false);

  const { viewport } = useViewport();
  const {
    textareaValue,
    setTextareaValue,
    editIndex,
    setEditIndex,
    articleElements,
    setArticleElements,
    submitError,
    setSubmitError,
  } = useArticleHandlerContext();

  const cleanStates = () => {
    setAction(null);
    setEditIndex(null);
    setElement('');
    setTextareaValue('');
    submitError && setSubmitError('');
  };

  const changeInputValue: ChangeInputValue = event => {
    setTextareaValue(event.target.value);
    submitError && setSubmitError('');
  };

  const changeTextareaValue: ChangeTextareaValue = event => {
    setTextareaValue(event.target.value);
    submitError && setSubmitError('');
  };

  const addElement = (name: string) => {
    setIsOpenEditMenu(false);
    setAction('add');

    if (textareaValue.trim() !== '') {
      if (editIndex !== null) {
        setArticleElements(prevElements => {
          const updatedParagraphs = [...prevElements];
          updatedParagraphs[editIndex].text = textareaValue.trim();
          return updatedParagraphs;
        });
      } else {
        setArticleElements(prevElements => [
          ...prevElements,
          { name, text: textareaValue.trim() },
        ]);
      }

      return cleanStates();
    }

    editIndex !== null && deleteElement(editIndex);
  };

  const editElement = (idx: number, element: string) => {
    setIsOpenEditMenu(false);
    setAction('edit');
    setElement(element);
    setEditIndex(idx);
    setTextareaValue(articleElements[idx].text);
  };

  const deleteElement = (index: number) => {
    setIsOpenEditMenu(false);

    setArticleElements(prevElements => {
      const updatedParagraphs = [...prevElements];
      updatedParagraphs.splice(index, 1);
      return updatedParagraphs;
    });

    // localStorage.removeItem(art);

    cleanStates();
  };

  const moveElementInArray: MoveElement = (array, fromIndex, toIndex) => {
    const element = array[fromIndex];
    array.splice(fromIndex, 1);
    array.splice(toIndex, 0, element);
  };

  const moveUp = (index: number) => {
    setIsOpenEditMenu(false);

    if (index > 0) {
      setArticleElements(prevElements => {
        const updatedParagraphs = [...prevElements];
        moveElementInArray(updatedParagraphs, index, index - 1);
        return updatedParagraphs;
      });
    }
  };

  const moveDown = (index: number) => {
    setIsOpenEditMenu(false);

    if (index < articleElements.length - 1) {
      setArticleElements(prevElements => {
        const updatedParagraphs = [...prevElements];
        moveElementInArray(updatedParagraphs, index, index + 1);
        return updatedParagraphs;
      });
    }
  };

  const editMenuHandler = (index: number) => {
    cleanStates();
    setEditIndex(index);
    setIsOpenEditMenu(!isOpenEditMenu);
  };

  // console.log('');
  // console.log('action', action);
  // console.log('editIndex', editIndex);
  // console.log('element', element);
  // console.log('isOpenEditMenu', isOpenEditMenu);
  // console.log('viewport', viewport);

  return (
    <div className={`${s.articleEditor}`}>
      <p className={`${s.infoText}`}>{'Article editor'}</p>
      {articleElements?.length ? (
        <>
          <ul className={`${s.fildList}`}>
            {articleElements.map((el, index) => (
              <li
                key={index}
                className={`${s.fildItem} ${
                  action && editIndex === index ? s[action] : s['element']
                }`}
              >
                {el.name === 'title' ? (
                  <>
                    {action === 'edit' &&
                    editIndex === index &&
                    element === 'title' ? (
                      <>
                        <input
                          className={`${s.field} ${s.input}`}
                          type='text'
                          value={textareaValue}
                          onChange={changeInputValue}
                          name='title'
                          placeholder={'Subtitle'}
                        />
                        <div className={`${s.techButtons}`}>
                          <div
                            className={`${s.techButton}`}
                            onClick={() => addElement('title')}
                          >
                            {editIndex !== null ? 'Save' : 'Add'}
                          </div>
                          <div
                            className={`${s.techButton}`}
                            onClick={() => cleanStates()}
                          >
                            {'Cancel'}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className={s.elementPreview}>
                        <h2 className={`${s.field} ${s.element} ${s.title}`}>
                          {el.text}
                        </h2>

                        <div className={`${s.editElenemtMenu}`}>
                          {isOpenEditMenu && index === editIndex && (
                            <>
                              <div
                                className={`${s.techButton} ${s.edit}`}
                                onClick={() => editElement(index, el.name)}
                              >
                                <Edit fill={colorWhite} />
                              </div>

                              <div
                                className={`${s.techButton} ${s.delete}`}
                                onClick={() => deleteElement(index)}
                              >
                                <Delete fill={colorWhite} el={'field'} />
                              </div>

                              {index !== articleElements.length - 1 && (
                                <div
                                  className={`${s.techButton} ${s.down}`}
                                  onClick={() => moveDown(index)}
                                >
                                  <Arrow fill={colorWhite} direction={'down'} />
                                </div>
                              )}

                              {index !== 0 && (
                                <div
                                  className={`${s.techButton} ${s.up}`}
                                  onClick={() => moveUp(index)}
                                >
                                  <Arrow fill={colorWhite} direction={'up'} />
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        <div>
                          <div
                            className={`${s.threeDotsButton}`}
                            onClick={() => editMenuHandler(index)}
                          >
                            {viewport === 'mobile' ? (
                              <DotsVertical fill={middleDark} />
                            ) : (
                              <DotsHorizontal fill={middleDark} />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {action === 'edit' &&
                    editIndex === index &&
                    element === 'paragraph' ? (
                      <>
                        <textarea
                          className={`${s.field} ${s.textarea}`}
                          value={textareaValue}
                          onChange={changeTextareaValue}
                          placeholder={'Paragraph...'}
                        />
                        <div className={`${s.techButtons}`}>
                          <div
                            className={`${s.techButton}`}
                            onClick={() => addElement('paragraph')}
                          >
                            {editIndex !== null ? 'Save' : 'Add'}
                          </div>
                          <div
                            className={`${s.techButton}`}
                            onClick={() => cleanStates()}
                          >
                            {'Cancel'}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className={s.elementPreview}>
                        <p className={`${s.field} ${s.element} ${s.paragraph}`}>
                          {el.text}
                        </p>

                        <div className={`${s.editElenemtMenu}`}>
                          {isOpenEditMenu && index === editIndex && (
                            <>
                              <div
                                className={`${s.techButton} ${s.edit}`}
                                onClick={() => editElement(index, el.name)}
                              >
                                <Edit fill={colorWhite} />
                              </div>

                              <div
                                className={`${s.techButton} ${s.delete}`}
                                onClick={() => deleteElement(index)}
                              >
                                <Delete fill={colorWhite} el={'field'} />
                              </div>

                              {index !== articleElements.length - 1 && (
                                <div
                                  className={`${s.techButton} ${s.down}`}
                                  onClick={() => moveDown(index)}
                                >
                                  <Arrow fill={colorWhite} direction={'down'} />
                                </div>
                              )}

                              {index !== 0 && (
                                <div
                                  className={`${s.techButton} ${s.up}`}
                                  onClick={() => moveUp(index)}
                                >
                                  <Arrow fill={colorWhite} direction={'up'} />
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        <div
                          className={`${s.threeDotsButton}`}
                          onClick={() => editMenuHandler(index)}
                        >
                          {viewport === 'mobile' ? (
                            <DotsVertical fill={middleDark} />
                          ) : (
                            <DotsHorizontal fill={middleDark} />
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className={s.addElement}>
        {/* {!articleElements?.length && (
          <p className={`${s.infoText}`}>{'Article content'}</p>
        )} */}

        {element && action === 'add' && (
          <>
            {element === 'title' ? (
              <input
                className={`${s.field} ${s.input}`}
                type='text'
                value={textareaValue}
                onChange={changeInputValue}
                name='title'
                placeholder={'Subtitle'}
              />
            ) : (
              <textarea
                className={`${s.field} ${s.textarea}`}
                value={textareaValue}
                onChange={changeTextareaValue}
                placeholder={'Paragraph...'}
              />
            )}

            <div className={`${s.techButtons}`}>
              <div
                className={`${s.techButton}`}
                onClick={() =>
                  addElement(element === 'title' ? 'title' : 'paragraph')
                }
              >
                {editIndex !== null ? 'Save' : 'Add'}
              </div>
              <div className={`${s.techButton}`} onClick={() => cleanStates()}>
                {'Cancel'}
              </div>
            </div>
          </>
        )}

        {!element && (
          <div className={`${s.addElementButtons}`}>
            <Button
              fn={() => {
                setElement('title');
                setAction('add');
              }}
            >
              Subtitle
            </Button>
            <Button
              fn={() => {
                setElement('text');
                setAction('add');
              }}
            >
              Paragraph
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleEditor;
