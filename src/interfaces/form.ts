import { ApolloError } from '@apollo/client';
import { FormEvent, ReactNode } from 'react';

export interface IFormProps {
  children: ReactNode;
  handleSubmit: (event: FormEvent) => void;
}

export interface IFormHandlerProps extends IFormProps {
  title: string;
  isSubmitError: boolean;
  apolloError: ApolloError | null;
  isSuccess: boolean;
}