import { forwardRef } from 'react';
import { Merge } from 'type-fest';
import {select, SelectProps as SelectPropsStyle } from './style';

type SelectProps = Merge<JSX.IntrinsicElements["select"], SelectPropsStyle>

export const Select = forwardRef<
  HTMLSelectElement,
  SelectProps
>(({ className, error, ...props }, ref) => (
  <select
    {...props}
    ref={ref}
    className={select({ error, class: className })}
  />
));

Select.displayName = "Select";
