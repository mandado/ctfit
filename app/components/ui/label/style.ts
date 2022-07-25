import { cva, VariantProps } from "class-variance-authority";

export const label = cva("mt-1.5 mb-1 block font-medium text-gray-700", {
  variants: {
    error: {
      true: "text-red-500",
      false: null
    }
  }
});
