import { Form as RemixForm, FormProps } from "remix-forms";
import type { SomeZodObject } from "zod";
import SubmitButton from "./Button";
import Button from "./Button";
import Error from "./Error";
import Input from "./Input";
import Label from "./Label";
import Select from "./Select";

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
                  className={
                    errors
                      ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                      : undefined
                  }
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
