import Select, { StylesConfig, components } from 'react-select';
import {
  IInputSelectProps as IISP,
  ISelectOption as ISO,
} from '../../../interfaces/login';
import * as theme from '../../../theme/index';

const NoOptions = (props: any) => (
  <components.NoOptionsMessage {...props}>
    <span style={{ color: 'transparence', backgroundColor: 'transparence' }} />
  </components.NoOptionsMessage>
);

const InputSelect = ({ options, selectedValue, setSelectedValue }: IISP) => {
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
      borderBottom: `1px solid ${theme.middleGrey}`,
      backgroundColor: state.isFocused
        ? theme.reactBackground
        : theme.reactBackground,
      cursor: 'pointer',
      '&:hover': {
        borderBottomColor: theme.middleGrey,
      },
    }),
    input: (base, state) => ({
      ...base,
      outline: state.isMulti ? theme.reactBackground : theme.reactBackground,
      color: theme.colorWhite,
      caretColor: theme.middleGrey,
    }),
    singleValue: base => ({
      ...base,
      outline: 'none',
      color: theme.colorWhite,
    }),
    valueContainer: base => ({
      ...base,
    }),
    placeholder: (base, state) => ({
      ...base,
      color: state.isFocused ? theme.middleGreyHover : theme.middleGreyHover,
    }),
    indicatorSeparator: base => ({
      ...base,
      backgroundColor: theme.reactBackground,
    }),
    dropdownIndicator: base => ({
      ...base,
      color: theme.middleGreyHover,
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
      backgroundColor: state.isSelected ? theme.middleGrey : theme.middleGrey,
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
        backgroundColor: theme.contrstDark,
      },
    }),
  };

  return (
    <Select
      styles={customSelectStyles}
      placeholder={'Блог'}
      options={options}
      onChange={handleChange}
      value={selectedValue}
      components={{
        NoOptionsMessage: NoOptions,
      }}
    />
  );
};

export default InputSelect;
