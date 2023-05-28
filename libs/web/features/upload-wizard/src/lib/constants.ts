import type { HookFieldProps } from '@ntua-saas-10/web/features/hook-field';

const type = 'file';
export const fileField: HookFieldProps = {
  type,
  id: type,
  name: type,
  label: 'File Upload',
  required: true,
  placeholder: '',
  validation: {
    required: 'REQUIRED_TEXT',
  },
  props: {
    required: true,
  },
  errors: {
    required: 'ERROR_TEXT',
  },
};
