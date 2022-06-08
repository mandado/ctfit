import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import {
  createModality,
  getModalities,
  Modality,
} from "~/models/modality.server";
import { createStudent, Student } from "~/models/students.server";
// import { createNote } from "~/models/note.server";
import { requireOrganizationId, requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);

  const formData = await request.formData();
  const name = formData.get("name");

  if (typeof name !== "string" || name.length === 0) {
    return json({ errors: { name: "Title is required" } }, { status: 400 });
  }

  const modality = await createModality({
    name,
    organization_id: organizationId,
  });

  return redirect(`/modalities/${modality.id}`);
};

type ActionData = {
  modalities: Modality[];
  errors?: {
    name: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireOrganizationId(request);

  return null;
};

export default function NewStudentPage() {
  const action = useActionData() as ActionData;

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Nome: </span>
          <input
            name="name"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
          {action?.errors?.name}
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
