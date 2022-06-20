import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Default from "~/layout/Default";
import { requireOrganizationId } from "~/session.server";

import { Student } from "~/domain/students/schema";
import Shell from "~/components/app/Shell";
import ShellListItem from "~/components/app/ShellListItem";
import { Plan } from "~/domain/plans/schema";
import { getPlans } from "~/domain/plans/plan.server";

type LoaderData = {
  plans: Plan[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);

  const plans = await getPlans({ organization_id: organizationId });
  return json({ plans });
};

export default function NotesPage() {
  const { plans } = useLoaderData() as LoaderData;

  return (
    <Default>
      <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
        <Outlet />
      </main>
      <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
        <Shell title="Planos">
          <>
            {plans.map((Plan) => (
              <ShellListItem
                key={Plan.id}
                to={Plan.id}
                title={Plan.name}
                subtitle={""}
              />
            ))}
          </>
        </Shell>
      </aside>
    </Default>
  );
}
