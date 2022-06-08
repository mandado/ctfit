import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { requireOrganizationId, requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import {
  deleteModality,
  getModality,
  Modality,
} from "~/models/modality.server";

type LoaderData = {
  modality: Modality;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.modalityId, "modalityId not found");

  const modality = await getModality({ organizationId, id: params.modalityId });
  if (!modality) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ modality });
};

export const action: ActionFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.modalityId, "noteId not found");

  await deleteModality({ organizationId, id: params.modalityId });

  return redirect("/modalities");
};

export default function NoteDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.modality.name}</h3>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}
