import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFormAction, useLoaderData } from "@remix-run/react";
import { formAction } from "remix-forms";
import Form from "~/components/Form";
import { Modality } from "~/domain/modalities/schema";
import { Plan } from "~/domain/plans/schema";
import { createNewStudent } from "~/domain/students/createStudent";
import { StudentSchema } from "~/domain/students/schema";
import { getModalities } from "~/models/modality.server";
import { getPlans } from "~/models/plan.server";
import { requireOrganizationId } from "~/session.server";
import { toSelectOptions } from "~/shared/helpers";

export const action: ActionFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);

  return formAction({
    request,
    schema: StudentSchema,
    mutation: createNewStudent,
    environment: { organization_id: organizationId },
  });
};

type LoaderData = {
  modalities: Modality[];
  plans: Plan[]
};

export const loader: LoaderFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);
  const modalities = await getModalities({ organization_id: organizationId });
  const plans = await getPlans({ organization_id: organizationId });

  return json({ modalities, plans });
};

export default function NewStudentPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="p-6">
      <h2 className="mb-4 border-b pb-4 text-2xl">Adicionar Novo Aluno</h2>
      <Form
        schema={StudentSchema}
        labels={{
          modality_id: "Modalidade",
          plan_id: "Plano",
        }}
        options={{
          modality_id: toSelectOptions(data.modalities),
          plan_id: toSelectOptions(data.plans),
        }}
      />
    </div>
  );
}
