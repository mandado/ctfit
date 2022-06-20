import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { formAction } from "remix-forms";
import invariant from "tiny-invariant";
import Form from "~/components/app/Form";
import { Modality, ModalitySchema } from "~/domain/modalities/schema";
import { updateModality } from "~/domain/modalities/updateModality";
import { Student, StudentSchema } from "~/domain/students/schema";
import { getModality } from "~/models/modality.server";
import { requireOrganizationId } from "~/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.modalityId, "modalityId not found");

  return formAction({
    request,
    schema: StudentSchema,
    mutation: updateModality(params.modalityId),
    environment: { organization_id: organizationId },
  });
};

type LoaderData = {
  modality: Modality;
  student: Student;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.modalityId, "modalityId not found");

  const modality = await getModality({
    organization_id: organizationId,
    id: params.modalityId,
  });
  if (!modality) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ modality });
};

export default function NewStudentPage() {
  const data = useLoaderData() as LoaderData;
  return (
    <div className="p-6">
      <h2 className="mb-4 border-b pb-4 text-2xl">
        Editando dados de {data.modality.name}
      </h2>
      <Form mode="all" schema={ModalitySchema} values={data.modality} />
    </div>
  );
}
