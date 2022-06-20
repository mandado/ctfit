import { FormEvent, useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import { errorMessagesFor } from "remix-domains";
import Error from "~/components/app/Error";
import { PlanForm } from "~/domain/plans/schema";
import { ErrorsSchema } from "~/types/common/form";
import Input from "../../app/Input";
import Label from "../../app/Label";
import Info from "./Info";

export const SHIFTS = new Map([
  ["morning", "Manhã"],
  ["afternoon", "Tarde"],
  ["night", "Noite"],
]);

export function Shifts({
  errors,
  values,
}: {
  errors?: ErrorsSchema;
  values: { shift?: string; price?: number };
}) {
  const [inputsEnabled, setInputsEnabled] = useState<string[]>([]);

  const toggleInput = (event: FormEvent<HTMLInputElement>) => {
    const { checked, value } = event.currentTarget;
    const inputName = `input_${value}`;

    if (checked) {
      setInputsEnabled((previous) => [...previous, inputName]);
    } else {
      setInputsEnabled((previous) =>
        previous.filter((item) => item !== inputName)
      );
    }
  };

  return (
    <fieldset className="mt-4 space-y-5">
      <legend className="mt-1.5 mb-1 block font-medium text-gray-700">
        Turnos
      </legend>
      <Info>
        <>
          Ao selecionar um mais turnos para esse plano. <br />
          Será gerado a mesma quantidade de planos mantendo toda a configuração,
          diferenciando apenas o nome, preço e o turno.
          <br />E o nome será no formato: <b>nome - nome do turno.</b>
          <br />
          <br />
          <b>Válido apenas para criação.</b>
        </>
      </Info>
      {Array.from(SHIFTS)
        .filter(([key]) => (values.shift ? key === values.shift : true))
        .map(([key, label], index) => (
          <div key={key} className="relative flex items-start">
            <div className="flex h-5 items-center">
              <input
                id={`checkbox_${key}`}
                aria-describedby="comments-description"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                value={key}
                name={`shifts[${index}][name]`}
                onChange={toggleInput}
                readOnly={!!values.shift}
                defaultChecked={values.shift === key}
              />
            </div>
            <div className="ml-3 text-sm">
              <Label className="mt-0" htmlFor={`comments_${key}`}>
                {label}
              </Label>
              <Input
                id={`input_${key}`}
                type="number"
                name={`shifts[${index}][value]`}
                defaultValue={(values.shift === key && values.price) || ""}
                disabled={
                  !values.shift
                    ? !inputsEnabled.includes(`input_${key}`)
                    : values.shift !== key
                }
              />
              {errors && (
                <Error>
                  {errorMessagesFor(errors, `shifts.${index}.value`)}
                </Error>
              )}
            </div>
          </div>
        ))}
      {errors && <Error>{errorMessagesFor(errors, "shifts")}</Error>}
    </fieldset>
  );
}
