import {
  FilterIcon,
  SearchIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { Link, NavLink } from "@remix-run/react";
import { ReactNode } from "react";

type ShellProps = {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
};

export default function Shell({ title, actions, children }: ShellProps) {
  return (
    <>
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
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
            <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
        {actions}
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
        <div className="relative">
          <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500"></div>
          <ul className="relative z-0 divide-y divide-gray-200">{children}</ul>
        </div>
      </nav>
    </>
  );
}
