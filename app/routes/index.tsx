import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Default from "~/layout/Default";
import { requireOrganizationId } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireOrganizationId(request);

  return null;
};

export default function NotesPage() {
  return (
    <Default>
      <div className="p-6">asdsad</div>
    </Default>
  );
}
