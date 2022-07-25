import { forwardRef } from 'react';
import { label } from './style';

type LabelProps = JSX.IntrinsicElements["label"] & { error?: boolean };
type Ref = HTMLLabelElement;

export const Label = (props: LabelProps) => {
  const { error, className, ...restProps } = props;
  return (
    <label
      {...restProps}
      ref={props.ref}
      className={label({ error, class: className })}
    />
  );
};
