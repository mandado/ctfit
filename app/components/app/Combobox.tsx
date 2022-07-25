import type { GroupBase, Props } from "react-select";
import Select from "react-select";
import { errorMessagesFor } from "remix-domains";
import Label from "./Label";
import { Error } from "~/components/ui/error/index";

type CustomProps = { label: string; error?: string[] };

function ComboBox<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group> & CustomProps) {
  const applyClassError = (style: string) => (props.error?.length ? style : "");

  return (
    <>
      <Label className={applyClassError("text-red-500")}>{props.label}</Label>
      <Select
        {...props}
        styles={{
          input: (base) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
            },
          }),
        }}
      />
      {props.error && <Error>{props.error[0]}</Error>}
    </>
  );
}
ComboBox.displayName = "ComboBox";

export default ComboBox;
