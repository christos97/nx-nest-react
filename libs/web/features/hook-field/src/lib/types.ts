import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';

export interface HookFieldProps<T = unknown> extends InputHTMLAttributes<T> {
  name: string;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  label?: string;
  value?: string | ReadonlyArray<string> | number | undefined;
  placeholder?: string;
  validation?: HookFormValidationRule;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  errors?: HookFormErrors;
}

export interface HookFormValidationRule {
  required?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
}

export interface HookFormErrors {
  required?: string;
  minLength?: string;
  maxLength?: string;
  pattern?: string;
}
