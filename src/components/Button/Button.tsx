import { CSSProperties, MouseEventHandler } from 'react';
import { Button as ButtonType } from '../../types';
import s from './Button.module.scss';
import useHover from '../../hooks/useHover';

const Button: ButtonType = ({ type, fn, style, hover, disabled, children }) => {
  const { mouseEnter, mouseLeave, styles } = useHover(style, hover);

  return (
    <>
      {style && hover ? (
        <button
          className={s.button}
          type={type ? type : 'button'}
          onClick={fn}
          style={{ ...styles }}
          onMouseEnter={mouseEnter as MouseEventHandler<HTMLButtonElement>}
          onMouseLeave={mouseLeave as MouseEventHandler<HTMLButtonElement>}
          disabled={disabled}
        >
          {children}
        </button>
      ) : style && !hover ? (
        <button
          className={s.button}
          type={type ? type : 'button'}
          onClick={fn}
          style={styles as CSSProperties}
          disabled={disabled}
        >
          {children}
        </button>
      ) : (
        <button
          className={s.button}
          type={type ? type : 'button'}
          onClick={fn}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;

/*

How to use:

import { ReactElement, ReactNode } from 'react';

export type Button = (props: {
  type?: 'button' | 'submit' | 'reset';
  fn?: () => void;
  style?: { [key: string]: string | number };
  hover?: { [key: string]: string | number };
  disabled?: boolean;
  children: ReactNode;
}) => ReactElement;

====================

import { CSSProperties, MouseEventHandler } from 'react';
import { Button } from '@/types';
import s from './Button.module.scss';
import useHover from '@/hooks/useHover';

const Button: Button = ({ type, fn, style, hover, disabled, children }) => {
  const { mouseEnter, mouseLeave, styles } = useHover(style, hover);

  return (
    <>
      {style && hover ? (
        <button
          className={s.button}
          type={type ? type : 'button'}
          onClick={fn}
          style={{ ...styles }}
          onMouseEnter={mouseEnter as MouseEventHandler<HTMLButtonElement>}
          onMouseLeave={mouseLeave as MouseEventHandler<HTMLButtonElement>}
          disabled={disabled}
        >
          {children}
        </button>
      ) : style && !hover ? (
        <button
          className={s.button}
          type={type ? type : 'button'}
          onClick={fn}
          style={styles as CSSProperties}
          disabled={disabled}
        >
          {children}
        </button>
      ) : (
        <button
          className={s.button}
          type={type ? type : 'button'}
          onClick={fn}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </>
  );
};

====================

<Button
  type={'submit'}
  fn={logOut}
  style={{ backgroundColor: 'teal' }}
  // hover={{ color: 'red' }}
  disabled={updateLoading}
>
  Log out
</Button>

====================

@import '../../styles/mixins';
@import '../../theme/index.scss';

.button {
  @include padding(5px 12px);

  color: white;
  background-color: $middleGrey;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: $middleGreyHover;
  }
}

*/
