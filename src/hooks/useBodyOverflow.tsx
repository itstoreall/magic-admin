import { useEffect } from 'react';

const config = {
  hidden: 'hidden',
  auto: 'auto'
};

export const useBodyOverflow = (isOpen: boolean) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? config.hidden : config.auto;
    return () => {
      document.body.style.overflow = config.auto;
    };
  }, [isOpen]);
};
