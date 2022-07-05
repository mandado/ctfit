import { ActionFunction } from "@remix-run/node";
import Default from "~/layout/Default";
import { requireOrganizationId } from "~/session.server";

import { Student } from "~/domain/students/schema";
import { useOrganization } from "~/utils";

export const action: ActionFunction = async ({ request }) => {
  await requireOrganizationId(request);

  return null;
};

export default function Configurations() {
  const organization = useOrganization();

  return (
    <Default>
      <main className="relative z-0 flex-1 overflow-y-auto p-4 focus:outline-none xl:order-last">
        <h2 className="text-lg font-medium text-gray-900">Configurações</h2>
      </main>
    </Default>
  );
}
