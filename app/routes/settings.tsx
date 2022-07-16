import { ActionFunction } from "@remix-run/node";
import Default from "~/layout/Default";
import { requireOrganizationId } from "~/session.server";

import { Form, useSubmit, useTransition } from "@remix-run/react";
import { FormEvent, useState } from "react";
import Button from "~/components/app/SubmitButton";
import { updateOrganization } from "~/models/organization.server";
import { useOrganization } from "~/utils";

export const action: ActionFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);

  const formData = await request.clone().formData();

  const enable_signup = formData.get("enable_signup") === 'true';

  await updateOrganization(organizationId, {
    configurations: {
      enable_signup,
    },
  });

  return null;
};

export default function Configurations() {
  const organization = useOrganization();
  const transition = useTransition();
  const submit = useSubmit();

  const toggleSignup = function (event: FormEvent<HTMLInputElement>) {
    submit(
      { enable_signup: String(event.currentTarget.checked) },
      { method: "post" }
    );
  };

  return (
    <Default>
      <main className="w-full max-w-screen-sm p-4">
        <h2 className="text-lg font-medium text-gray-900">Configurações</h2>

        <div className="space-y-4 py-5">
          <div className="relative flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                onChange={toggleSignup}
                defaultChecked={organization?.configurations?.enable_signup}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="comments" className="font-medium text-gray-700">
                Cadastro de alunos
              </label>
              <p id="comments-description" className="text-gray-500">
                Ao habilitar esta opção os alunos podem se cadastrar livremente
                na plataforma no seu ct.
              </p>
            </div>
          </div>
          <div className="mt-4">
            {transition.state === "submitting" ? "Salvando" : ""}
            {transition.state === "loading" ? "Salvo" : ""}
          </div>
        </div>
      </main>
    </Default>
  );
}
