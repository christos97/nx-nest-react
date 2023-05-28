/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import styled from '@emotion/styled';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { RadioButtonGroup } from 'react-hook-form-mui';
import type {
  Direction,
  HookRadioButtonGroupProps,
} from '@ntua-saas-10/web/mui-hook-forms/hook-form-field';

const DefaultStyledRadioButtonGroup = styled('div')(({ direction }: { direction?: Direction }) => ({
  display: 'flex',
  flexDirection: direction === 'vertical' ? 'column' : 'row',
  gap: '0.5rem',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem',
  margin: '0 auto',
}));

const HookRadioButtonGroup: React.FC<HookRadioButtonGroupProps> = ({
  direction = 'vertical',
  options = [],
  ...props
}) => {
  return (
    <Controller
      name={props.name.toString()}
      control={props.control}
      render={({ field }) => (
        <DefaultStyledRadioButtonGroup
          direction={direction}
          className={clsx(DefaultStyledRadioButtonGroup, props.styledClassName)}
        >
          <RadioButtonGroup {...field} {...props} options={options} />
        </DefaultStyledRadioButtonGroup>
      )}
    />
  );
};

export default HookRadioButtonGroup;
