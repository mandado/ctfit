import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { deleteStudent, getStudent } from "~/models/students.server";
import { requireOrganizationId } from "~/session.server";
import invariant from "tiny-invariant";
import { Student } from "~/domain/students/schema";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import Avvvatars from "avvvatars-react";

type LoaderData = {
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

  return json({ student });
};

export const action: ActionFunction = async ({ request, params }) => {
  const { organizationId } = await requireOrganizationId(request);
  invariant(params.studentId, "studentId not found");

  await deleteStudent({
    organization_id: organizationId,
    id: params.studentId,
  });

  return redirect("/students");
};

export default function NoteDetailsPage() {
  const { student } = useLoaderData() as LoaderData;

  return (
    <>
      {/* Breadcrumb */}
      <nav
        className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
        aria-label="Breadcrumb"
      >
        <a
          href="#"
          className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
        >
          <ChevronLeftIcon
            className="-ml-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <span>Directory</span>
        </a>
      </nav>

      <article>
        {/* Profile header */}
        <div>
          <div>
            <div className="h-32 w-full bg-gray-50 object-cover lg:h-48"></div>
          </div>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="flex">
                <div className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32">
                  <Avvvatars value={student.email} size={128} />
                </div>
              </div>
              <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                  <h1 className="truncate text-2xl font-bold text-gray-900">
                    {student.name}
                  </h1>
                </div>
                <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <Link
                    to={`/students/${student.id}/edit`}
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  >
                    Editar
                  </Link>
                  <Form method="post">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </Form>
                </div>
              </div>
            </div>
            <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {student.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Description list */}
        <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">ID</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.id}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Nome</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Peso</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.weight}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Telefone</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.phone}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Graduação</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {student.graduation}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">CPF</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {student.document_number}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Pagamento Mensal
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {student.monthly_payment}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Modalidade</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {student.modality?.name}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Criado em</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {student.created_at}
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </>
  );
}
