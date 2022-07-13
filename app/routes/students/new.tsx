import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFormAction, useLoaderData } from "@remix-run/react";
import { formAction } from "remix-forms";
import Form from "~/components/app/Form";
import { Modality } from "~/domain/modalities/schema";
import { Plan } from "~/domain/plans/schema";
import { createNewStudent } from "~/domain/students/createStudent";
import { StudentSchema } from "~/domain/students/schema";
import { getModalities } from "~/models/modality.server";
import { getPlans } from "~/domain/plans/plan.server";
import { requireOrganizationId } from "~/session.server";
import { toHTMLSelectOptions } from "~/shared/helpers";

export const action: ActionFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);

  return formAction({
    request,
    schema: StudentSchema,
    mutation: createNewStudent,
    environment: { organization_id: organizationId },
    successPath: "students;",
  });
};

type LoaderData = {
  plans: Plan[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);
  const plans = await getPlans({ organization_id: organizationId });

  return json({ plans });
};

export default function NewStudentPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="p-6">
      <h2 className="mb-4 border-b pb-4 text-2xl">Adicionar Novo Aluno</h2>
      <Form
        schema={StudentSchema}
        labels={{
          plan_id: "Plano",
        }}
        options={{
          plan_id: toHTMLSelectOptions(data.plans),
        }}
      />
    </div>
  );
}
