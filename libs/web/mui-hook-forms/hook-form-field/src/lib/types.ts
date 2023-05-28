import type { Control, FieldValues, FieldName, Path } from 'react-hook-form';
import type { RadioButtonGroupProps } from 'react-hook-form-mui';

export interface BaseHookFormFieldProps<T extends FieldValues = FieldValues> {
  name: FieldName<T>;
  control: Control<FieldValues | T>;
}

/** `ControllerContainerProps` */
export interface ControllerContainerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<FieldValues | T>;
}

export type Direction = 'vertical' | 'horizontal';

/** `HookRadioButtonGroupProps` */
export interface HookRadioButtonGroupProps<T extends FieldValues = FieldValues>
  extends Omit<RadioButtonGroupProps<T>, 'name' | 'control'>,
    BaseHookFormFieldProps<T> {
  options: RadioButtonGroupProps<T>['options'];
  direction?: Direction;
}
