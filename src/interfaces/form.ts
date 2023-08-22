import { FormEvent, ReactNode } from 'react';

export interface IFormProps {
  children: ReactNode;
  handleSubmit: (event: FormEvent) => void;
}

export interface IFormHandlerProps extends IFormProps {
  title: string;
  isError: boolean;
}
