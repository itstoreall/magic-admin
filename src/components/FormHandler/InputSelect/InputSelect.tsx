import Select, { StylesConfig, components } from 'react-select';
import { IInputSelectProps as IISP } from '../../../interfaces/login';
import { ISelectOption as ISO } from '../../../interfaces';
import * as theme from '../../../theme/index';

const NoOptions = (props: any) => (
  <components.NoOptionsMessage {...props}>
    <span style={{ color: 'transparence', backgroundColor: 'transparence' }} />
  </components.NoOptionsMessage>
);

const InputSelect = ({
  options,
  selectedValue,
  setSelectedValue,
  placeholder,
}: IISP) => {
  const handleChange = (selectedOption: ISO | null) => {
    setSelectedValue(selectedOption);
  };

  const customSelectStyles: StylesConfig<ISO, false> = {
    container: base => ({
      ...base,
      marginBottom: '20px',
    }),
    control: (base, state) => ({
      ...base,
      textAlign: 'left',
      boxShadow: 'none',
      outline: 'none',
      border: 'none',
      borderRadius: 0,
      borderBottom: `1px solid ${theme.middleDark}`,
      backgroundColor: state.isFocused
        ? theme.reactBackground
        : theme.reactBackground,
      cursor: 'pointer',
      '&:hover': {
        borderBottomColor: theme.middleDark,
      },
    }),
    input: (base, state) => ({
      ...base,
      outline: state.isMulti ? theme.reactBackground : theme.reactBackground,
      color: theme.light,
      caretColor: theme.middleDark,
    }),
    singleValue: base => ({
      ...base,
      outline: 'none',
      color: theme.light,
    }),
    valueContainer: base => ({
      ...base,
    }),
    placeholder: (base, state) => ({
      ...base,
      color: state.isFocused ? theme.middleDark : theme.middleDark,
    }),
    indicatorSeparator: base => ({
      ...base,
      backgroundColor: theme.reactBackground,
    }),
    dropdownIndicator: base => ({
      ...base,
      color: theme.middleDark,
      '&:hover': {
        color: theme.middleGreyHover,
      },
    }),
    menu: base => ({
      ...base,
      top: '30px',
      outline: 'none',
      boxShadow: 'none',
      borderRadius: 0,
      opacity: 1,
      backgroundColor: 'transparance',
    }),
    menuList: base => ({
      ...base,
      padding: 0,
      backgroundColor: theme.reactBackground,
    }),
    option: (base, state) => ({
      ...base,
      padding: '10px',
      margin: '0px',
      fontSize: '16px',
      outline: 'none',
      backgroundColor: state.isSelected
        ? theme.middleGreyHover
        : theme.middleGreyHover,
      '&:active': {
        backgroundColor: theme.reactBackground,
      },
      color: state.isSelected ? theme.reactBackground : theme.reactBackground,
      textAlign: 'left',
      cursor: 'pointer',
      '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.reactBackground}`,
      },
      '&:hover': {
        backgroundColor: theme.contrastDark,
      },
    }),
  };

  return (
    <Select
      styles={customSelectStyles}
      placeholder={placeholder}
      options={options}
      onChange={handleChange}
      value={selectedValue}
      components={{
        NoOptionsMessage: NoOptions,
      }}
      // isDisabled={true}
    />
  );
};

export default InputSelect;
