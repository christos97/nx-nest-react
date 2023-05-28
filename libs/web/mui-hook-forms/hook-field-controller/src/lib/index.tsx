import type { ControllerContainerProps } from '@ntua-saas-10/web/mui-hook-forms/hook-form-field';
import type { JSXElementConstructor, ReactElement } from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type ControllerRenderProps,
} from 'react-hook-form';

interface HookFieldControllerProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  renderField: (
    field: ControllerRenderProps<FieldValues, string>,
  ) => ReactElement<any, string | JSXElementConstructor<any>>;
}

const HookFieldController: React.FC<HookFieldControllerProps> = ({
  name,
  control,
  renderField,
}) => {
  return <Controller name={name} control={control} render={({ field }) => renderField(field)} />;
};

// Higher-Order Component
const withHookFormController = <T extends FieldValues = FieldValues>(
  FieldComponent: React.ComponentType<ControllerRenderProps<T, Path<T>>>,
  fieldProps: Omit<ControllerRenderProps<T, Path<T>>, 'render'>,
): React.FC<ControllerContainerProps<T>> => {
  return ({ name, control }) => {
    return (
      <HookFieldController
        name={name}
        control={control}
        renderField={(field) => <FieldComponent {...field} {...fieldProps} />}
      />
    );
  };
};

export default withHookFormController;
