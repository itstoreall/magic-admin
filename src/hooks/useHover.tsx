import { useState } from 'react';

export type StyleObject = {
  [key: string]: string | number;
};

export type UseHover = (
  style?: StyleObject,
  hover?: StyleObject
) => {
  isHovered: boolean;
  mouseEnter: (() => void) | null;
  mouseLeave: (() => void) | null;
  styles: StyleObject | null;
};

const useHover: UseHover = (style, hover) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  if (!style && !hover)
    return { isHovered, mouseEnter: null, mouseLeave: null, styles: null };

  if (style && !hover)
    return { isHovered, mouseEnter: null, mouseLeave: null, styles: style };

  const mouseEnter = () => setIsHovered(true);
  const mouseLeave = () => setIsHovered(false);

  const styles = isHovered && hover ? { ...style, ...hover } : style || {};

  return { isHovered, mouseEnter, mouseLeave, styles };
};

export default useHover;
