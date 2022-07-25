import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Merge } from 'type-fest';
import { checkbox, CheckboxProps as CheckboxPropsStyle } from './style';

type InputProps = Merge<
  ComponentPropsWithoutRef<'input'>,
  CheckboxPropsStyle
>;
type Ref = HTMLInputElement;

export const Checkbox = forwardRef<Ref, InputProps>((props, ref) => {
  const { error, className, ...restProps } = props;
  return (
    <input
      {...restProps}
      ref={ref}
      className={checkbox({ error, class: className })}
      type="checkbox"
    />
  );
})
