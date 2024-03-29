import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFormAction, useLoaderData } from "@remix-run/react";
import { formAction } from "remix-forms";
import invariant from "tiny-invariant";
import Form from "~/components/app/Form";
import { Modality } from "~/domain/modalities/schema";
import { Plan } from "~/domain/plans/schema";
import { Student, StudentSchema } from "~/domain/students/schema";
import { updateStudent } from "~/domain/students/updateStudent";
import { getModalities } from "~/models/modality.server";
import { getPlans } from "~/domain/plans/plan.server";
import { getStudent } from "~/models/student.server";
import { requireOrganizationId } from "~/session.server";
import { toHTMLSelectOptions, toSelectOptions } from "~/shared/helpers";

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
  plans: Plan[];
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
  const plans = await getPlans({ organization_id: organizationId });

  return json({ modalities, student, plans });
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
          plan_id: "Plano",
          name: "Nome",
          email: "Email",
          phone: "Telefone",
          graduation: "Graduação",
          document_number: "CPF",
          weight: "Peso",
        }}
        options={{
          plan_id: toHTMLSelectOptions(data.plans),
        }}
      />
    </div>
  );
}
