import type { ActionFunction } from "@remix-run/node";
import { formAction } from "remix-forms";
import Form from "~/components/Form";
import { createNewPlan } from "~/domain/plans/createPlan";
import { PlanSchema } from "~/domain/plans/schema";
import { requireOrganizationId, requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);

  return formAction({
    request,
    schema: PlanSchema,
    mutation: createNewPlan,
    successPath: "plans",
    environment: { organization_id: organizationId },
  });
};

export default function newModalitiesPage() {
  return (
    <div className="rounded-xl p-6">
      <h2 className="mb-4 pb-4 text-2xl">Adicionar Novo Plano</h2>
      <Form schema={PlanSchema} />
    </div>
  );
}
