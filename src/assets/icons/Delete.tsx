const Delete = ({ fill, el }: { fill: string; el: string }) => {
  const width = el === 'field' ? '12' : el === 'article' ? '30' : '';
  const height = el === 'field' ? '12' : el === 'article' ? '30' : '';
  const viewBox =
    el === 'field' ? '2.5 9.5 18 5' : el === 'article' ? '5 2 14 20' : '';

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M18.984 3.984V6H5.015V3.984h3.469L9.515 3h4.969l1.031.984h3.469zM6 18.984v-12h12v12q0 .797-.609 1.406t-1.406.609H8.016q-.797 0-1.406-.609t-.609-1.406z' />
    </svg>
  );
};

export default Delete;
