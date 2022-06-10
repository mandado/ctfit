import type { ActionFunction } from "@remix-run/node";
import { formAction } from "remix-forms";
import Form from "~/components/Form";
import { createNewOrganization } from "~/domain/organizations/createOrganization";
import { OrganizationSchema } from "~/domain/organizations/schema";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  return formAction({
    request,
    schema: OrganizationSchema,
    mutation: createNewOrganization,
    successPath: "organizations",
    environment: { user_id: userId },
  });
};

export default function newOrganizationPage() {
  return (
    <div className="rounded-xl border bg-gray-50 p-6">
      <h2 className="mb-4 pb-4 text-2xl">Adicionar Nova Organização</h2>
      <Form schema={OrganizationSchema} />
    </div>
  );
}
