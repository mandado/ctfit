import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { formAction } from "remix-forms";
import invariant from "tiny-invariant";
import Form from "~/components/app/Form";
import { Plan, PlanSchema } from "~/domain/plans/schema";
import { updatePlan } from "~/domain/plans/updatePlan";
import { getPlan } from "~/domain/plans/plan.server";
import { requireOrganizationId } from "~/session.server";
import PlanForm from "~/components/plans/forms/PlanForm";
import { getModalities } from "~/models/modality.server";
import { Modality } from "~/domain/modalities/schema";
import { toSelectOptions } from "~/shared/helpers";
import { inputFromForm } from "remix-domains";
import { ErrorsSchema } from "~/types/common/form";

export const action: ActionFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.planId, "planId not found");

  const formData = await inputFromForm(request);
  const result = await updatePlan(params.planId)(formData, {
    organization_id: organizationId,
  });

  if (!result.success) {
    return {
      errors: result.inputErrors,
    };
  }

  return redirect("/plans");
};

type LoaderData = {
  plan: Plan;
  modalities: Modality[];
};

type ActionData = {
  errors?: ErrorsSchema;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.planId, "planId not found");

  const [plan, modalities] = await Promise.all([
    getPlan({
      organization_id: organizationId,
      id: params.planId,
    }),
    getModalities({
      organization_id: organizationId,
    }),
  ]);

  if (!plan) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ plan, modalities });
};

export default function NewStudentPage() {
  const data = useLoaderData() as LoaderData;
  const form = useActionData() as ActionData;

  return (
    <div className="p-6">
      <h2 className="mb-4 border-b pb-4 text-2xl">
        Editando dados de {data.plan.name}
      </h2>
      <PlanForm
        errors={form?.errors}
        modalities={toSelectOptions(data.modalities)}
        values={data.plan}
      />
    </div>
  );
}
