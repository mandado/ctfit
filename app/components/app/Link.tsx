import { Link, LinkProps } from "@remix-run/react";
import { forwardRef } from "react";
import { cx } from "~/shared/helpers";

export type BaseButtonProps = JSX.IntrinsicElements["a"];
export function isExternalUrl(str: string) {
  return /^((https?:|s?ftp:|file:\/|chrome:)?\/\/|mailto:|tel:)/.test(
    str.toLowerCase()
  );
}

const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, className, ...props }, ref) => {
    const classes = cx(
      "inline-flex items-center justify-center rounded-md border border-transparent px-6 py-2 text-base font-medium shadow-sm ring-2 ring-transparent ring-offset-2 ring-offset-transparent focus:outline-none disabled:bg-gray-400",
      " text-indigo-700 bg-indigo-100 hover:bg-indigo-200",
      className
    );

    if (typeof to === "string" && isExternalUrl(to)) {
      const { replace, state, ...domProps } = props;
      return <a {...domProps} className={classes} ref={ref} href={to} />;
    }
    return <Link to={to} {...props} className={classes} ref={ref} />;
  }
);
CustomLink.displayName = "Link";

export { CustomLink as Link };
