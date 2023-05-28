/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import type { BaseHookFormFieldProps } from './types';

// import { HookRadioButtonGroup } from '@ntua-saas-10/web/mui-hook-forms/hook-radio-button-group';
import { HookTextField } from '@ntua-saas-10/web/mui-hook-forms/hook-text-field';

const HookFieldType = {
  text: 'text',
  radioGroup: 'radioGroup',
} as const;

type HookFormFieldProps = BaseHookFormFieldProps & {
  hookFieldType: keyof typeof HookFieldType;
};

const HookFormField: React.FC<HookFormFieldProps> = ({ hookFieldType, ...props }) => {
  switch (hookFieldType.toString()) {
    /**`text` field type */
    case HookFieldType.text: {
      return <HookTextField {...props} />;
    }

    default:
      return null;
  }
};

export default HookFormField;
