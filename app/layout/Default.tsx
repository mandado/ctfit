/* This example requires Tailwind CSS v2.0+ */
import { Fragment, ReactNode } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { cx } from "~/shared/helpers";
import { useOrganization, useUser } from "~/utils";
import { NavLink } from "react-router-dom";
import { Form } from "@remix-run/react";
import { Link } from "~/components/app/Link";
import Avvvatars from "avvvatars-react";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Alunos", href: "/students" },
  { name: "Modalidades", href: "/modalities" },
  { name: "Planos", href: "/plans" },
];
const userNavigation = [
  { name: "Organizações", href: "/org" },
  { name: "Configurações", href: "/settings" },
];

export default function Default({
  children,
  title,
  createPath,
}: {
  children: ReactNode;
  title: string;
  createPath?: string;
}) {
  const user = useUser();
  const organization = useOrganization();
  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="border-b border-gray-700">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                            alt="Workflow"
                          />
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <NavLink
                                key={item.name}
                                to={item.href}
                                className={({ isActive }) =>
                                  cx(
                                    isActive
                                      ? "bg-gray-900 text-white"
                                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "rounded-md px-3 py-2 text-sm font-medium"
                                  )
                                }
                                // aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <button
                            type="button"
                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>

                          {/* Profile dropdown */}
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Abrir menu</span>
                                <Avvvatars value={user.email} size={40} />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <>
                                  {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                      {({ active }) => (
                                        <NavLink
                                          to={item.href}
                                          className={({ isActive }) =>
                                            cx(
                                              isActive ? "bg-gray-100" : "",
                                              "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            )
                                          }
                                        >
                                          {item.name}
                                        </NavLink>
                                      )}
                                    </Menu.Item>
                                  ))}
                                  <Menu.Item>
                                    <Form action="/logout" method="post">
                                      <button
                                        type="submit"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        Sair
                                      </button>
                                    </Form>
                                  </Menu.Item>
                                </>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Abrir menu</span>
                          {open ? (
                            <XIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <MenuIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                  <div className="space-y-1 px-2 py-3 sm:px-3">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        // as="a"
                        to={item.href}
                        className={({ isActive }) =>
                          cx(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )
                        }
                        // aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <Avvvatars value={user.email} size={40} />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {organization.name || "-"}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {user.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">Ver notificações</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto flex max-w-7xl justify-between px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">{title}</h1>

              {createPath && (
                <Link variant="secondary" to={createPath}>
                  Criar Novo
                </Link>
              )}
            </div>
            <div className="mx-auto flex max-w-7xl justify-between px-4 sm:px-6 lg:px-8">
              {createPath && (
                <Link
                  variant="secondaryLink"
                  size="small"
                  to={createPath?.split("/")[0]}
                >
                  Voltar para listagem
                </Link>
              )}
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
