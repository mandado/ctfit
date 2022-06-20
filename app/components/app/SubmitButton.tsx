import { cx } from "~/shared/helpers";
import BaseButton, { BaseButtonProps } from "./BaseButton";

export default function Button({ className, ...props }: BaseButtonProps) {
  return (
    <BaseButton
      className={cx(
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-white",
        className
      )}
      {...props}
    />
  );
}
