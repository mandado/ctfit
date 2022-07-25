import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Merge } from 'type-fest';
import { radio, RadioProps as RadioPropsStyle } from './style';

type InputProps = Merge<
  ComponentPropsWithoutRef<'input'>,
  RadioPropsStyle
>;
type Ref = HTMLInputElement;

export const Radio = forwardRef<Ref, InputProps>((props, ref) => {
  const { error, className, ...restProps } = props;
  return (
    <input
      {...restProps}
      ref={ref}
      className={radio({ error, class: className })}
      type="radio"
    />
  );
})
