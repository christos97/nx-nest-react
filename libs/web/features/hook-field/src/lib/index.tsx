import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { HookFieldProps } from '@ntua-saas-10/api-interfaces';
import { FormLabel, TextField } from '@mui/material';

const INPUT_FIELD_TYPES = {
  radioGroup: 'radioGroup',
  textField: 'textField',
} as const;

const Field: React.FC<HookFieldProps> = ({
  name,
  label = '',
  type = 'text',
  placeholder = '',
  validation = {},
  props = {},
  errors = {},
  required = false,
}) => {
  const { register, formState } = useFormContext();
  const error = formState.errors?.[name];

  const renderField = () => {
    switch (type) {
      case INPUT_FIELD_TYPES.textField:
        return <TextField {...register} />;
      default:
        return <TextField />;
    }
  };

  return (
    <div>
      {label && <FormLabel htmlFor={label}>{label}</FormLabel>}
      {renderField()}
      {error && <p className="error">{error.message?.toString()}</p>}
      {errors && errors.required && <p className="error">{errors.required}</p>}
    </div>
  );
};

const HookField: React.FC<HookFieldProps> = ({ ...rest }) => <Field {...rest} />;

export type { HookFieldProps };
export default HookField;
