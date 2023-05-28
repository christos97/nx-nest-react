import React from 'react';
import { StyledEngineProvider } from '@mui/material';
import { FieldValues, FormContainer, FormContainerProps, UseFormReturn } from 'react-hook-form-mui';

export interface HookFormContainerProps<T extends FieldValues = FieldValues>
  extends Omit<FormContainerProps, 'formContext' | 'onSuccess'> {
  children: React.ReactNode;
  onSuccess: (data: T) => void;
  formContext?: UseFormReturn<T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HookFormContainer: React.FC<HookFormContainerProps<any>> = (props) => {
  const { children, formContext, ...restProps } = props;
  const formContainerProps = {
    ...restProps,
    ...(formContext ? { formContext } : {}),
  };
  console.log(formContainerProps.defaultValues);
  return (
    <StyledEngineProvider injectFirst>
      <FormContainer {...formContainerProps}>{children}</FormContainer>
    </StyledEngineProvider>
  );
};

export default HookFormContainer;
