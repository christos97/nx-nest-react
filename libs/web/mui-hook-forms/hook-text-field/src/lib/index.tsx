/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  TextFieldElement,
  TextFieldElementProps,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form-mui';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import { forwardRef } from 'react';

interface HookTextFieldProps<T extends FieldValues = FieldValues>
  extends Omit<TextFieldElementProps<T>, 'name' | 'control'> {
  name: Path<T>;
  control: Control<FieldValues | T>;
  defaultValue?: string;
  required?: boolean;
  rules?: Record<string, unknown>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HookTextField: React.FC<HookTextFieldProps<FieldValues | any>> = ({
  name,
  control,
  defaultValue = '',
  ...props
}) => {
  const theme = useTheme();
  const StyledTextFieldElement = styled(TextFieldElement)<TextFieldElementProps>(() => ({
    backgroundColor: '#fff',
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px`,
    color: theme.palette.text.primary,
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },

    '& .Mui-focused': {
      borderColor: theme.palette.secondary.main,
    },
  }));
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{ required: !!props.required }}
      shouldUnregister={false}
      render={({ field }) => <StyledTextFieldElement {...field} {...props} />}
    />
  );
};

export default HookTextField;
