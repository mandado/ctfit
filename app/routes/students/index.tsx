import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useFetcher, useLoaderData, useSubmit } from "@remix-run/react";
import Default from "~/layout/Default";
import { createStudent, getStudents } from "~/models/student.server";
import { requireOrganizationId } from "~/session.server";
import { createColumnHelper } from "@tanstack/react-table";
import { Student } from "~/domain/students/schema";
import Shell from "~/components/app/Shell";
import ShellListItem from "~/components/app/ShellListItem";
import { useMatchesData } from "~/utils";
import { Table } from "~/components/ui/table";

type LoaderData = {
  students: Student[];
};

const columnHelper = createColumnHelper<Student>();

const columns = [
  columnHelper.accessor("name", {
    header: "Nome",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("phone", {
    header: "Telefone",
  }),
  columnHelper.accessor("plan", {
    header: "plano",
    cell: (info) => info.getValue()?.name,
  }),
];

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

  if (isFillScreen) {
    return <Outlet />;
  }

  return (
    <Table
      onDelete={(plan: Student) => console.log(plan)}
      path="/students"
      data={students}
      columns={columns}
      notFound={{
        title: "Nenhum aluno encontrado, que tal criar um novo ?",
        subtitle:
          "Clique no botão acima criar novo, para criar novo um novo aluno.",
      }}
    />
  );
}
