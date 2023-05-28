import { HTMLInputTypeAttribute } from 'react';
import { FieldName } from 'react-hook-form';

export type FieldSpec = {
  name: FieldName<never>;
  label?: string;
  type?: HTMLInputTypeAttribute;
  autocomplete?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  defaultValue?: string;
  options?: string[];
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
};
