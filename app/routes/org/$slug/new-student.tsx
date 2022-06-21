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
import invariant from "tiny-invariant";
import { getOrganizationBySlug } from "~/models/organization.server";
import { Organization } from "~/domain/organizations/schema";

export const action: ActionFunction = async ({ request }) => {
  return formAction({
    request,
    schema: StudentSchema,
    mutation: createNewStudent,
  });
};

type LoaderData = {
  plans: Plan[];
  organization: Pick<Organization, "id" | "name">;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.slug, "slugId not found");
  const organization = await getOrganizationBySlug(params.slug);

  if (!organization) {
    throw new Response("Not Found", { status: 404 });
  }

  const plans = await getPlans({ organization_id: organization.id });

  return json({ plans, organization });
};

export default function NewStudentPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-50">
      <div className="w-[400px] rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 pb-4 text-2xl">
          Criar cadastro no {data.organization.name}
        </h2>
        <Form
          schema={StudentSchema}
          values={{
            organization_id: data.organization.id,
          }}
          labels={{
            plan_id: "Plano",
          }}
          options={{
            plan_id: toHTMLSelectOptions(data.plans),
          }}
        />
      </div>
    </div>
  );
}
