import { Form as RemixForm, FormProps } from "remix-forms";
import type { SomeZodObject } from "zod";
import { SubmitButton, Input, Select, Label, Error } from "../ui";
import Errors from "./Errors";

export default function Form<Schema extends SomeZodObject>(
  props: FormProps<Schema>
) {
  return (
    <RemixForm<Schema>
      hiddenFields={["organization_id", "user_id"]}
      inputComponent={Input}
      selectComponent={Select}
      labelComponent={Label}
      buttonComponent={SubmitButton}
      buttonLabel="Salvar"
      renderField={({ Field, ...props }) => {
        const { name, errors } = props;

        return (
          <Field key={name as string} {...props}>
            {({ Label, SmartInput, Errors }) => (
              <>
                <Label className={errors ? "text-red-600" : undefined} />
                <SmartInput
                  {... errors?.length && ({ variant: 'error' })}
                />
                <Errors />
              </>
            )}
          </Field>
        );
      }}
      errorComponent={Error}
      {...props}
    />
  );
}
