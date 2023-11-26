import { ISelectOption } from '.';

export interface IInputSelectProps {
  options: ISelectOption[];
  selectedValue: ISelectOption | null;
  setSelectedValue: (obj: ISelectOption | null) => void;
  placeholder: string;
  disabled: boolean;
}
