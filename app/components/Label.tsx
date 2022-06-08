import { cx } from "~/shared/helpers";

export default function Label({
  className,
  ...props
}: JSX.IntrinsicElements["label"]) {
  return (
    <label
      className={cx(
        "mt-1.5 mb-1 block font-medium",
        className,
        !className && "text-gray-700"
      )}
      {...props}
    />
  );
}
