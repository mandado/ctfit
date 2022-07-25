import { cva, VariantProps } from 'class-variance-authority';

export const checkbox = cva(
  [
    'form-checkbox h-4 w-4 rounded',
    'border-gray-300',
    'focus:ring-gray-500',
    'focus:border-gray-500',
    'text-gray-600',
  ],
  {
    variants: {
      error: {
        false: [],
        true: ['border-red-500', 'focus:ring-red-500', 'focus:border-red-500'],
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

export type CheckboxProps = VariantProps<typeof checkbox>;
