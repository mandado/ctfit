import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Merge } from "type-fest";
import { button, ButtonProps as ButtonPropsStyle } from "./style";

type ButtonProps = JSX.IntrinsicElements["button"] & ButtonPropsStyle;

export const Button = (props: ButtonProps) => {
  const { variant, size, children, ...otherProps } = props;
  return (
    <button {...otherProps} className={button({ variant, size })}>
      {children}
    </button>
  );
};

export const SubmitButton = (props: ButtonProps) => {
  return (
    <div className="mt-6 block flex justify-end">
      <Button {...props} />
    </div>
  )
}

export default Button;
