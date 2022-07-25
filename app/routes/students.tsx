import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useFetcher, useLoaderData, useSubmit } from "@remix-run/react";
import Default from "~/layout/Default";
import { createStudent, getStudents } from "~/models/student.server";
import { requireOrganizationId } from "~/session.server";

import { Student } from "~/domain/students/schema";
import Shell from "~/components/app/Shell";
import ShellListItem from "~/components/app/ShellListItem";
import { useMatchesData } from "~/utils";

type LoaderData = {
  students: Student[];
};
export const action: ActionFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);

  await createStudent({
    organization_id: organizationId,
    email: "",
    graduation: "",
    name: "",
    phone: "",
    weight: 0,
  });
  return redirect(`/students`);
};

export const loader: LoaderFunction = async ({ request }) => {
  if (new URL(request.url).pathname.includes("fill")) {
    return json({});
  }

  const { organizationId } = await requireOrganizationId(request);

  const students = await getStudents({ organization_id: organizationId });
  return json({ students });
};

export default function NotesPage() {
  const isFillScreen = useMatchesData("routes/students/$studentId/fill");
  const { students } = useLoaderData() as LoaderData;
  const fetcher = useFetcher();

  function generateNewStudentRecord() {
    fetcher.submit({}, { method: "post", action: "/students" });
  }

  if (isFillScreen) {
    return <Outlet />;
  }

  return (
    <Default title="Alunos" createPath="/students/new">
      <Outlet />
    </Default>
  );
}
