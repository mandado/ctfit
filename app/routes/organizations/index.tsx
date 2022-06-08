import {
  LoaderFunction,
  redirect,
  json,
  ActionFunction,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Link } from "~/components/Link";
import Button from "~/components/SubmitButton";
import { Organization } from "~/domain/organizations/schema";
import { supabase } from "~/models/user.server";
import {
  createOrganizationSession,
  getUserId,
  requireUserId,
} from "~/session.server";

type LoaderData = {
  organizations: Organization[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  const { data: organizations, count } = await supabase
    .from("organizations")
    .select(
      `
        *,
        member:members(organization_id)
      `
    )
    .eq("members.user_id", userId);

  if (userId && count === 0) return redirect("/organizations/new");

  return json({ organizations });
};

export const action: ActionFunction = async ({ request }) => {
  await requireUserId(request);
  const form = await request.formData();

  return createOrganizationSession({
    request,
    remember: true,
    organizationId: form.get("organization") as string,
    redirectTo: "/students",
  });
};

export default function Organizations() {
  const { organizations } = useLoaderData() as LoaderData;

  return (
    <div className="space-y-4">
      <Form method="post">
        <div className="space-y-4">
          {organizations.map((organization) => (
            <div
              key={organization.id}
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
            >
              <div className="min-w-0 flex-1">
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
            </div>
          ))}
        </div>
      </Form>
      <div className="mt-3">
        <Link to="new" className="w-full">
          Cadastrar Nova Organização
        </Link>
      </div>
    </div>
  );
}
