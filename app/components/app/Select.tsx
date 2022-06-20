import React from "react";
import { cx } from "~/shared/helpers";

const Select = React.forwardRef<
  HTMLSelectElement,
  JSX.IntrinsicElements["select"] & {
    error?: string[];
  }
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cx(
      "form-select block w-full rounded-md py-2 pl-3 pr-10 text-base text-gray-800 focus:outline-none sm:text-sm",
      className,
      !className && "border-gray-300 focus:border-pink-500 focus:ring-pink-500"
    )}
    {...props}
  />
));

Select.displayName = "Select";

export default Select;
