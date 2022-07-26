import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireOrganizationId } from "~/session.server";
import { getPlans } from "~/domain/plans/plan.server";
import { Plan } from "~/domain/plans/schema";
import { Table } from "~/components/ui/table";

import { createColumnHelper } from "@tanstack/react-table";

type LoaderData = {
  plans: Plan[];
};

const columnHelper = createColumnHelper<Plan>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Nome",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Preço",
    cell: (info) => <i>{info.getValue()}</i>,
  }),
  columnHelper.accessor("plans_modalities", {
    cell: (info) => (
      <i>
        {info
          .getValue()
          ?.map((item) => item.modality.name)
          .join(", ")}
      </i>
    ),
    header: "Modalidades",
  }),
];

export const loader: LoaderFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);

  const plans = await getPlans({ organization_id: organizationId });
  return json({ plans });
};

export default function PlanIndexPage() {
  const { plans } = useLoaderData() as LoaderData;
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Table
        onDelete={(plan: Plan) => console.log(plan)}
        path="/plans"
        data={plans}
        columns={columns}
      />
    </div>
  );
}
