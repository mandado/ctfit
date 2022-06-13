import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { formAction } from "remix-forms";
import invariant from "tiny-invariant";
import Form from "~/components/Form";
import { Plan, PlanSchema } from "~/domain/plans/schema";
import { updatePlan } from "~/domain/plans/updatePlan";
import { getPlan } from "~/models/plan.server";
import { requireOrganizationId } from "~/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.planId, "planId not found");

  return formAction({
    request,
    schema: PlanSchema,
    mutation: updatePlan(params.planId),
    environment: { organization_id: organizationId },
  });
};

type LoaderData = {
  plan: Plan;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.planId, "planId not found");

  const plan = await getPlan({
    organization_id: organizationId,
    id: params.planId,
  });
  if (!plan) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ plan });
};

export default function NewStudentPage() {
  const data = useLoaderData() as LoaderData;
  return (
    <div className="p-6">
      <h2 className="mb-4 border-b pb-4 text-2xl">
        Editando dados de {data.plan.name}
      </h2>
      <Form mode="all" schema={PlanSchema} values={data.plan} />
    </div>
  );
}
