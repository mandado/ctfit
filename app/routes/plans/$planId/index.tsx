import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Plan } from "~/domain/plans/schema";
import { deletePlan, getPlan } from "~/models/plan.server";
import { requireOrganizationId } from "~/session.server";
import { format } from "date-fns";
import { formatDate } from "~/shared/format";

type LoaderData = {
  modality: Plan;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.planId, "planId not found");

  const modality = await getPlan({
    organization_id: organizationId,
    id: params.planId,
  });

  if (!modality) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ modality });
};

export const action: ActionFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.planId, "planId not found");

  await deletePlan({
    organization_id: organizationId,
    id: params.planId,
  });

  return redirect("/modalities");
};

export default function PlanDetailsPage() {
  const { modality } = useLoaderData() as LoaderData;

  return (
    <div>
      <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="truncate text-2xl font-bold text-gray-900">
          {modality.name}
        </h1>
      </div>

      <hr className="my-4" />
      <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-sm text-gray-900">{modality.id}</dd>
          </div>
        </dl>
      </div>
      <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Criado em</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(modality.created_at)}
            </dd>
          </div>
        </dl>
      </div>
      <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="flex space-x-3">
            <Link
              to={`/plans/${modality.id}/edit`}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Editar
            </Link>
            <Form method="post">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </Form>
          </div>
        </dl>
      </div>
    </div>
  );
}
