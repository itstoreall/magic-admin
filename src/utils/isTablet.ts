const isTablet = () =>
  typeof window !== 'undefined' ? window.innerWidth > 767 : false;

export default isTablet;
