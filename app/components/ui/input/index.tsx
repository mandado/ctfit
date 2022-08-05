import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Merge } from "type-fest";
import { input, InputProps as InputPropsStyle } from "./style";

type InputProps = Merge<ComponentPropsWithoutRef<"input">, InputPropsStyle>;
type Ref = HTMLInputElement;

export const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const { variant, type, className, ...restProps } = props;
  return (
    <input
      {...restProps}
      ref={ref}
      className={input({ variant, class: className })}
      type={type}
    />
  );
});

Input.displayName = "Input";

export default Input;
