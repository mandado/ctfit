import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Default from "~/layout/Default";
import { requireOrganizationId } from "~/session.server";

import { Student } from "~/domain/students/schema";
import Shell from "~/components/Shell";
import ShellListItem from "~/components/ShellListItem";
import { Modality } from "~/domain/modalities/schema";
import { getModalities } from "~/models/modality.server";

type LoaderData = {
  modalities: Modality[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);

  const modalities = await getModalities({ organization_id: organizationId });
  return json({ modalities });
};

export default function NotesPage() {
  const { modalities } = useLoaderData() as LoaderData;

  return (
    <Default>
      <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
        <Outlet />
      </main>
      <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
        <Shell title="Modalidades">
          <>
            {modalities.map((modality) => (
              <ShellListItem
                key={modality.id}
                to={modality.id}
                title={modality.name}
                subtitle={""}
              />
            ))}
          </>
        </Shell>
      </aside>
    </Default>
  );
}
