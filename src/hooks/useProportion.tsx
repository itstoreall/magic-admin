import { useEffect, useState } from 'react';

type UseProportion = (
  w: number,
  h: number,
  max: number
) => { width: number; height: number };

const calculateSize: UseProportion = (w, h, max) => {
  const targetAspectRatio = w / h;
  const viewportWidth = window.innerWidth;

  let width, height;

  width = viewportWidth <= max ? viewportWidth : max;
  height = Math.floor(width / targetAspectRatio);

  return { width, height };
};

const useProportion: UseProportion = (w, h, max) => {
  const [proportionalSize, setProportionalSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      const newSize = calculateSize(w, h, max);
      setProportionalSize(newSize);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max]);

  return { width: proportionalSize.width, height: proportionalSize.height };
};

export default useProportion;
