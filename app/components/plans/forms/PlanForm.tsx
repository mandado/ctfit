import { Form } from "@remix-run/react";
import { errorMessagesFor } from "remix-domains";
import SubmitButton from "~/components/app/Button";
import ComboBox from "~/components/app/Combobox";
import Error from "~/components/app/Error";
import TextField from "~/components/app/TextField";
import { Plan } from "~/domain/plans/schema";
import { ErrorsSchema } from "~/types/common/form";
import { Shifts } from "./Shifts";

export default function PlanForm({
  modalities,
  values,
  errors,
}: {
  values?: Plan;
  modalities: any;
  errors?: ErrorsSchema;
}) {
  return (
    <Form method="post">
      <TextField
        error={errors && errorMessagesFor(errors, "name")}
        name="name"
        label="Nome"
        defaultValue={values?.name}
      />
      <ComboBox
        isMulti
        label="Modalidades"
        name="modalities"
        error={errors && errorMessagesFor(errors, "modalities")}
        options={modalities}
        defaultValue={values?.plans_modalities?.map(({ modality }) => ({
          label: modality.name,
          value: modality.id,
        }))}
      />
      <Shifts
        values={{ shift: values?.shift, price: values?.price }}
        errors={errors}
      />
      <SubmitButton>Salvar</SubmitButton>
    </Form>
  );
}
