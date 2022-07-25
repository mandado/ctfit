import { Link, LinkProps as LinkPropsRemix } from "@remix-run/react";
import { forwardRef } from "react";
import { Merge } from "type-fest";
import { cx } from "~/shared/helpers";
import { button, ButtonProps } from "../ui/button/style";

export type BaseButtonProps = JSX.IntrinsicElements["a"];
export function isExternalUrl(str: string) {
  return /^((https?:|s?ftp:|file:\/|chrome:)?\/\/|mailto:|tel:)/.test(
    str.toLowerCase()
  );
}

type LinkProps = Merge<ButtonProps, LinkPropsRemix>;

const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, variant, size, className, ...props }, ref) => {
    const classes = button({
      class: className,
      variant,
      size,
    });

    if (typeof to === "string" && isExternalUrl(to)) {
      const { replace, state, ...domProps } = props;
      return <a {...domProps} className={classes} ref={ref} href={to} />;
    }
    return <Link to={to} {...props} className={classes} ref={ref} />;
  }
);
CustomLink.displayName = "Link";

export { CustomLink as Link };
