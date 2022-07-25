import {
  LoaderFunction,
  redirect,
  json,
  ActionFunction,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import SubmitButton from "~/components/app/Button";
import { Link } from "~/components/app/Link";
import { Button } from "~/components/ui";
import { Organization } from "~/domain/organizations/schema";
import { removeOrganization } from "~/models/organization.server";
import { supabase } from "~/models/user.server";
import {
  clearOrganizationSection,
  createOrganizationSession,
  getUserId,
  logout,
  requireUserId,
} from "~/session.server";

type Member = {
  owner: boolean;
  organization_id: string;
  user_id: string;
};

type LoaderData = {
  organizations: Organization[];
  members: Member[];
};

const isOwner = (
  members: LoaderData["members"],
  organization_id: Member["organization_id"]
) => {
  const organization = members.find(
    (item) => item.organization_id === organization_id
  );
  if (!organization) {
    return false;
  }
  return organization.owner;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const { data: organizations, count } = await supabase
    .from("organizations")
    .select(
      `
        *,
        member:members!inner(organization_id, user_id, owner)
      `
    )
    .eq("member.user_id", userId);

  const members = organizations?.map((item) => item.member).flat();

  if (userId && organizations?.length === 0) return redirect("/org/new");

  return json({ organizations, members });
};

export const action: ActionFunction = async ({ request }) => {
  const user_id = await requireUserId(request);
  const form = await request.formData();

  if (form.get("organization_remove")) {
    await removeOrganization({
      id: form.get("organization_remove") as string,
      user_id: user_id,
    });
    await clearOrganizationSection(request);

    return null;
  }

  return createOrganizationSession({
    request,
    remember: true,
    organizationId: form.get("organization") as string,
    redirectTo: "/",
  });
};

export default function Organizations() {
  const { organizations, members } = useLoaderData() as LoaderData;

  return (

    <div className="w-full max-w-lg">
      <div className="flex h-full w-full items-center justify-center">
        <div className="space-y-4 lg:w-[400px]">
          <Form method="post">
            <div className="space-y-4">
              {organizations.map((organization) => (
                <div key={organization.id} className="flex flex-col">
                  <div className="min-w-0 flex-1">
                    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                      <button
                        value={organization.id}
                        name="organization"
                        className="focus:outline-none"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-left text-sm font-medium text-gray-900">
                          {organization.name}
                        </p>
                        <p className="truncate text-left text-sm text-gray-500">
                          {organization.id}
                        </p>
                      </button>
                    </div>
                    {/* add confirmation to telete */}
                  </div>
                  {isOwner(members, organization.id) && (
                    <button
                      value={organization.id}
                      name="organization_remove"
                      className="mt-1 w-auto flex-shrink-0 justify-self-end rounded-lg bg-transparent bg-red-50 px-2 py-1 text-sm text-red-600 hover:bg-red-100 hover:text-red-700"
                    >
                      Excluir Organização
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Form>
          <div className="mt-3">
            <Link to="new" className="w-full justify-center">
              Cadastrar Nova Organização
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
