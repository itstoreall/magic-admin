const isLandscape = () =>
  typeof window !== 'undefined'
    ? window.innerWidth > window.innerHeight
    : false;

export default isLandscape;
