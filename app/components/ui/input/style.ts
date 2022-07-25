import { cva, VariantProps } from "class-variance-authority";

export const input = cva(
  ["form-input disabled:bg-gray-100 disabled:border-transparent shadow-sm block w-full sm:text-sm border rounded-md"],
  {
    variants: {
      variant: {
        initial: [
          "border-gray-300",
          "focus:ring-gray-500",
          "focus:border-gray-500",
        ],
        error: ["border-red-500", "focus:ring-red-500", "focus:border-red-500"],
      },
      // size: {
      //   small: ["text-sm", "py-1", "px-2"],
      //   medium: ["text-base", "py-2", "px-4"],
      // },
    },
    defaultVariants: {
      variant: "initial",
    },
  }
);

export type InputProps = VariantProps<typeof input>;
