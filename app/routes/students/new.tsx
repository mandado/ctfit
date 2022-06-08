import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFormAction, useLoaderData } from "@remix-run/react";
import { formAction } from "remix-forms";
import Form from "~/components/Form";
import { createNewStudent } from "~/domain/students/createStudent";
import { StudentSchema } from "~/domain/students/schema";
import { getModalities, Modality } from "~/models/modality.server";
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
};

export const loader: LoaderFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);
  const modalities = await getModalities({ organization_id: organizationId });

  return json({ modalities });
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
        }}
        options={{
          modality_id: toSelectOptions(data.modalities),
        }}
      />
    </div>
  );
}
