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
    <Default>
      <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
        <Outlet />
      </main>
      <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
        <Shell
          actions={
            <>
              <button
                type="submit"
                onClick={generateNewStudentRecord}
                className="mt-4 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Gerar Cadastro compartilhável
              </button>
            </>
          }
          title="Alunos"
        >
          <>
            {students.map((student) => (
              <ShellListItem
                key={student.id}
                to={student.id}
                title={student.name || student.id}
                subtitle={student.phone || ""}
              />
            ))}
          </>
        </Shell>
      </aside>
    </Default>
  );
}
