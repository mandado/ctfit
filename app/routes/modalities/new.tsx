import type { ActionFunction } from "@remix-run/node";
import { formAction } from "remix-forms";
import Form from "~/components/app/Form";
import { createNewModality } from "~/domain/modalities/createModality";
import { ModalitySchema } from "~/domain/modalities/schema";
import { requireOrganizationId, requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);

  return formAction({
    request,
    schema: ModalitySchema,
    mutation: createNewModality,
    successPath: "modalities",
    environment: { organization_id: organizationId },
  });
};

export default function newModalitiesPage() {
  return (
    <div className="rounded-xl p-6">
      <h2 className="mb-4 pb-4 text-2xl">Adicionar Nova Modalidade</h2>
      <Form labels={{ name: "Nome" }} schema={ModalitySchema} />
    </div>
  );
}
