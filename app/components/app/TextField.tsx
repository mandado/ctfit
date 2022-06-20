import React from "react";
import Error from "./Error";
import Input from "./Input";
import Label from "./Label";

type TextFieldProps = {
  label: string;
  name: string;
  error?: string[];
  defaultValue?: string;
};

export default function TextField({
  name,
  label,
  error,
  defaultValue,
}: TextFieldProps) {
  const applyClassError = (style: string) => (error?.length ? style : "");
  return (
    <>
      <Label className={applyClassError("text-red-500")}>{label}</Label>
      <Input
        className={applyClassError("border-red-500")}
        name={name}
        defaultValue={defaultValue}
      />

      {error && <Error>{error}</Error>}
    </>
  );
}
