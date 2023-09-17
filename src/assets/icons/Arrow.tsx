const Arrow = ({ fill, direction }: { fill: string; direction: string }) => (
  <svg
    width='12'
    height='8'
    viewBox='0 0 22 13'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    style={direction !== 'up' ? { transform: 'rotate(-180deg)' } : {}}
  >
    <path
      d='M20 11L11 2L2.14876 11'
      stroke={fill}
      strokeWidth='2.5'
      strokeLinecap='round'
    />
  </svg>
);

export default Arrow;
