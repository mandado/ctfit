import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFormAction, useLoaderData } from "@remix-run/react";
import { formAction } from "remix-forms";
import invariant from "tiny-invariant";
import Form from "~/components/Form";
import { Student, StudentSchema } from "~/domain/students/schema";
import { updateStudent } from "~/domain/students/updateStudent";
import { getModalities, Modality } from "~/models/modality.server";
import { getStudent } from "~/models/students.server";
import { requireOrganizationId } from "~/session.server";
import { toSelectOptions } from "~/shared/helpers";

export const action: ActionFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.studentId, "studentId not found");

  return formAction({
    request,
    schema: StudentSchema,
    mutation: updateStudent(params.studentId),
    environment: { organizationId },
  });
};

type LoaderData = {
  modalities: Modality[];
  student: Student;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.studentId, "studentId not found");

  const student = await getStudent({
    organization_id: organizationId,
    id: params.studentId,
  });
  if (!student) {
    throw new Response("Not Found", { status: 404 });
  }

  const modalities = await getModalities({ organization_id: organizationId });

  return json({ modalities, student });
};

export default function NewStudentPage() {
  const data = useLoaderData() as LoaderData;
  return (
    <div className="p-6">
      <h2 className="mb-4 border-b pb-4 text-2xl">
        Editando dados de {data.student.name}
      </h2>
      <Form
        mode="all"
        schema={StudentSchema}
        values={data.student}
        labels={{
          modality_id: "Modalidade",
        }}
        options={{
          modality_id: toSelectOptions(data.modalities),
        }}
      />
    </div>
  );
}
