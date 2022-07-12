import type { ActionFunction } from "@remix-run/node";
import { formAction } from "remix-forms";
import Form from "~/components/app/Form";
import { createNewOrganization } from "~/domain/organizations/createOrganization";
import { OrganizationSchema } from "~/domain/organizations/schema";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  return formAction({
    request,
    schema: OrganizationSchema,
    mutation: createNewOrganization,
    successPath: "org",
    environment: { user_id: userId },
  });
};

export default function newOrganizationPage() {
  return (
    <div className="rounded-xl border bg-gray-50 p-6">
      <h2 className="mb-4 pb-4 text-2xl">Dê um nome para o seu ct</h2>
      <Form
        hiddenFields={["slug", "user_id", "configurations"]}
        schema={OrganizationSchema}
        labels={{ name: "Nome" }}
      >
        {({ Field, Errors, Button }) => (
          <>
            <Field name="name" />
            <Errors />
            <Button />
          </>
        )}
      </Form>
    </div>
  );
}
