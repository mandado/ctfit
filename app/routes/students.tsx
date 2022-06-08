import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  NavLink,
  Outlet,
  useLoaderData,
} from "@remix-run/react";
import Default from "~/layout/Default";
import { getStudents } from "~/models/students.server";
import { requireOrganizationId } from "~/session.server";
import { useMatchesData, useUser } from "~/utils";
import {
  FilterIcon,
  SearchIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { Student } from "~/domain/students/schema";

type LoaderData = {
  students: Student[];
};

const directory = [
  {
    id: 1,
    name: "Leslie Abbott",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Hector Adams",
    role: "VP, Marketing",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Blake Alexander",
    role: "Account Coordinator",
    imageUrl:
      "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "Fabricio Andrews",
    role: "Senior Art Director",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);

  const students = await getStudents({ organization_id: organizationId });
  return json({ students });
};

export default function NotesPage() {
  const { students } = useLoaderData() as LoaderData;

  return (
    <Default>
      <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
        <Outlet />
      </main>
      <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
        {/* <Outlet /> */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-lg font-medium text-gray-900">Alunos</h2>
          {/* <p className="mt-1 text-sm text-gray-600">
            Search directory of 3,018 employees
          </p> */}
          <form className="mt-6 flex space-x-4" action="#">
            <div className="min-w-0 flex-1">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                  placeholder="Search"
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              <FilterIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span className="sr-only">Search</span>
            </button>
            <NavLink
              to="new"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              <PlusCircleIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span className="sr-only">Criar Novo</span>
            </NavLink>
          </form>
        </div>
        {/* Directory list */}
        <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
          <div className="relative">
            <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500"></div>
            <ul role="list" className="relative z-0 divide-y divide-gray-200">
              {students.map((student) => (
                <li key={student.id}>
                  <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50">
                    <div className="min-w-0 flex-1">
                      <Link to={student.id} className="focus:outline-none">
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">
                          {student.name}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {student.email}
                        </p>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
    </Default>
  );
}
