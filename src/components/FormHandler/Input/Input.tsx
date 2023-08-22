export interface IInputProps {
  type: string;
  value: string;
  name: string;
  placeholder: string;
  handleInput: any;
}

const Input = (props: IInputProps) => {
  const { type, value, name, placeholder, handleInput } = props;

  return (
    <input
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={handleInput}
    />
  );
};

export default Input;
