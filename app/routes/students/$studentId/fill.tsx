import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFormAction, useLoaderData } from "@remix-run/react";
import { formAction } from "remix-forms";
import invariant from "tiny-invariant";
import Form from "~/components/Form";
import { Modality } from "~/domain/modalities/schema";
import { Student, StudentSchema } from "~/domain/students/schema";
import { updateStudent } from "~/domain/students/updateStudent";
import { getModalities } from "~/models/modality.server";
import { getStudent, getStudentById } from "~/models/student.server";
import { requireOrganizationId } from "~/session.server";
import { toSelectOptions } from "~/shared/helpers";

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.studentId, "studentId not found");
  const form = await request.clone().formData();

  return formAction({
    request,
    schema: StudentSchema,
    mutation: updateStudent(params.studentId),
    environment: { organization_id: form.get("organization_id") },
  });
};

type LoaderData = {
  modalities: Modality[];
  student: Student;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.studentId, "studentId not found");

  //  validaar async email e cpf
  // if (result?.error?.message?.includes("unique_document_number_user")) {
  //   throw new InputError(
  //     "Já existe um cadastro com este cpf.",
  //     "document_number"
  //   );
  // }

  // if (result?.error?.message?.includes("unique_email_user")) {
  //   throw new InputError("Já existe um cadastro com este email.", "email");
  // }

  const student = await getStudentById({
    id: params.studentId,
  });

  if (!student) {
    throw new Response("Not Found", { status: 404 });
  }

  const hasFilled = Object.values(student).every((item) => item !== "");

  if (hasFilled) {
    throw new Response("Not Found", { status: 403 });
  }

  const modalities = await getModalities({
    organization_id: student.organization_id,
  });

  return json({ modalities, student });
};

export default function NewStudentPage() {
  const data = useLoaderData() as LoaderData;
  return (
    <div className="h-full overflow-y-scroll p-6">
      <Form
        hiddenFields={["organization_id", "plan_id"]}
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
