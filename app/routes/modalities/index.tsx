import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireOrganizationId } from "~/session.server";
import { getPlans } from "~/domain/plans/plan.server";
import { Plan } from "~/domain/plans/schema";
import { Table } from "~/components/ui/table";

import { createColumnHelper } from "@tanstack/react-table";
import { Modality } from "~/domain/modalities/schema";
import { getModalities } from "~/models/modality.server";

type LoaderData = {
  modalities: Modality[];
};

const columnHelper = createColumnHelper<Plan>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
  }),
];

export const loader: LoaderFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);

  const modalities = await getModalities({ organization_id: organizationId });
  return json({ modalities });
};

export default function PlanIndexPage() {
  const { modalities } = useLoaderData() as LoaderData;
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Table
        onDelete={(plan: Modality) => console.log(plan)}
        path="/modalities"
        data={modalities}
        columns={columns}
        notFound={{
          title: "Nenhuma modalidade encontrada, que tal criar uma nova ?",
          subtitle:
            "Clique no botão acima criar novo, para criar novo uma nova modalidade.",
        }}
      />
    </div>
  );
}
