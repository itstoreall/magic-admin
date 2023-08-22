export interface ISelectOption {
  value: string;
  label: string;
}

export interface IInputSelectProps {
  options: ISelectOption[];
  selectedValue: ISelectOption | null;
  setSelectedValue: (obj: ISelectOption | null) => void;
  placeholder: string;
}
