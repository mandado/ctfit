import { cva, VariantProps } from 'class-variance-authority';

export const select = cva(
  [
    "form-select block w-full rounded-md py-2 pl-3 pr-10 text-base text-gray-800 focus:outline-none sm:text-sm",
    "border-gray-300 focus:border-gray-500 focus:ring-gray-500"
  ],
  {
    variants: {
      error: {
        false: [],
        true: ['border-red-500', 'focus:ring-red-500', 'focus:border-red-500'],
      },
    },
    defaultVariants: {
      error: false
    },
  }
);

export type SelectProps = VariantProps<typeof select>;
