type IHTMLInputTypeAttribute =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export type FieldSpec = {
  name: string;
  label?: string;
  type?: IHTMLInputTypeAttribute;
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
