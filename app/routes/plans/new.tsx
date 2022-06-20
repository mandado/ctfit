import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { formAction } from "remix-forms";
import type { Modality } from "~/domain/modalities/schema";
import { createNewPlan } from "~/domain/plans/createPlan";
import { PlanSchema } from "~/domain/plans/schema";
import PlanForm from "~/components/plans/forms/PlanForm";
import { toSelectOptions } from "~/shared/helpers";
import { getModalities } from "~/models/modality.server";
import { requireOrganizationId } from "~/session.server";
import { z, ZodIssue } from "zod";
import {
  errorMessagesFor,
  errorMessagesForSchema,
  inputFromForm,
  UnpackResult,
} from "remix-domains";
import { createPlan } from "~/domain/plans/plan.server";
import { ErrorsSchema } from "~/types/common/form";

type LoaderData = {
  modalities: Modality[];
};
type Result = UnpackResult<typeof createNewPlan>;

type ActionData = {
  errors?: ErrorsSchema;
};

export const action: ActionFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);

  const formData = await inputFromForm(request);
  const result = await createNewPlan(formData, {
    organization_id: organizationId,
  });

  if (!result.success) {
    return {
      errors: result.inputErrors,
    };
  }

  return redirect("/plans");
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  const modalities = await getModalities({
    organization_id: organizationId,
  });

  return json({ modalities });
};

export default function NewPlanPage() {
  const { modalities } = useLoaderData() as LoaderData;
  const form = useActionData() as ActionData;

  return (
    <div className="rounded-xl p-6">
      <h2 className="mb-4 pb-4 text-2xl">Adicionar Novo Plano</h2>
      <PlanForm
        errors={form?.errors}
        modalities={toSelectOptions(modalities)}
      />
    </div>
  );
}
