import { forwardRef } from "react";
import Input from "../input";
import { Label } from "../label";
import { Error } from "../error/index";

type ButtonProps = {
  label: string;
  name?: string;
  error?: string[];
  defaultValue?: string;
};
type Ref = HTMLDivElement;

export const TextField = forwardRef<Ref, ButtonProps>(
  ({ name, label, error, defaultValue }, ref) => {
    return (
      <div ref={ref} className="block">
        <Label error={!!error?.length}>{label}</Label>
        <Input name={name} defaultValue={defaultValue} />

        {error && <Error>{error[0]}</Error>}
      </div>
    );
  }
);
