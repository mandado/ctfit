import { cx } from "~/shared/helpers";

export type BaseButtonProps = JSX.IntrinsicElements["button"] & { to?: string };

export default function BaseButton({
  className,
  to,
  children,
  ...props
}: BaseButtonProps) {
  const classes = cx(
    "inline-flex items-center justify-center rounded-md border border-transparent px-6 py-2 text-base font-medium shadow-sm ring-2 ring-transparent ring-offset-2 ring-offset-transparent focus:outline-none disabled:bg-gray-400",
    className
  );
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
