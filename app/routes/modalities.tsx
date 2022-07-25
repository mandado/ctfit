import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Default from "~/layout/Default";
import { requireOrganizationId } from "~/session.server";

import { Student } from "~/domain/students/schema";
import Shell from "~/components/app/Shell";
import ShellListItem from "~/components/app/ShellListItem";
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
    <Default title="Modalidades" createPath="/modalities/new">
      <Outlet />
    </Default>
  );
}
