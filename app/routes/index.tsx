import { AcademicCapIcon, CashIcon, UsersIcon } from "@heroicons/react/outline";
import { json, LoaderFunction } from "@remix-run/node";
import {
  Link,
  useFetcher,
  useHref,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { MouseEvent } from "react";
import Button from "~/components/app/SubmitButton";
import CopyUrl from "~/components/home/CopyUrl";
import { Organization } from "~/domain/organizations/schema";
import Default from "~/layout/Default";
import { getOrganization, requireOrganizationId } from "~/session.server";
import { cx } from "~/shared/helpers";
import { useOrganization } from "~/utils";

type LoaderData = {
  origin: string;
};

const actions = [
  {
    key: "modality",
    title: "Crie uma modalidade",
    href: "/modalities",
    text: `Comece criando uma ou mais modalidades ou clique no botão setup para fazer setup de modalidades padrões do sistema.`,
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    key: "plan",
    title: "Crie um plano",
    href: "/plans",
    text: `Crie planos que serão usados pelos alunos ao criar conta. <br /> você pode criar plano como pacote, adicionando mais de uma modalidade.`,
    icon: CashIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    key: "students",
    title: "Cadastre um aluno",
    href: "/students",
    text: "Cadastre um aluno ou copie a url compartilhável abaixo e envie para um aluno.",
    icon: AcademicCapIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  await requireOrganizationId(request);

  return {
    origin: new URL(request.url).origin,
  };
};

// Hide button setup if setuped
export default function Dashboard() {
  const organization = useOrganization();
  const fetcher = useFetcher();
  const data = useLoaderData() as LoaderData;

  const isPopulated = organization?.configurations?.populated_modalities || fetcher.data.error === false;

  const setupModalities = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    fetcher.submit(
      { some: "values" },
      { method: "post", action: "/modalities/setup" }
    );
  };

  return (
    <Default>
      <div className="flex h-full w-full items-center justify-center bg-gray-50">
        <div className="flex w-7/12 flex-col items-center">
          <h4 className="mb-14 text-3xl font-bold text-gray-700">
            Dicas para começar
          </h4>
          <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-3 sm:gap-px sm:divide-y-0">
            {actions.map((action, actionIdx) => (
              <div
                key={action.title}
                className={cx(
                  actionIdx === 0
                    ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                    : "",
                  actionIdx === 2 ? "sm:rounded-tr-lg" : "",
                  actionIdx === actions.length - 3 ? "sm:rounded-bl-lg" : "",
                  actionIdx === actions.length - 1
                    ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                    : "",
                  "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
                )}
              >
                <div>
                  <span
                    className={cx(
                      action.iconBackground,
                      action.iconForeground,
                      "inline-flex rounded-lg p-3 ring-4 ring-white"
                    )}
                  >
                    <action.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <Link
                      prefetch="intent"
                      to={action.href}
                      className="focus:outline-none"
                    >
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.title}
                    </Link>
                  </h3>
                  <p
                    className="mt-2 text-sm text-gray-500"
                    dangerouslySetInnerHTML={{ __html: action.text }}
                  />

                  <div className="relative">
                    {action.key === "modality" && !isPopulated && (
                      <Button
                        disabled={fetcher.state === "loading"}
                        className="mt-10 w-full"
                        onClick={setupModalities}
                      >
                        Setup Modalidades
                      </Button>
                    )}
                    {action.key === "students" && (
                      <CopyUrl
                        text={`${data.origin}/org/${organization.slug}/new-student`}
                      />
                    )}
                  </div>
                </div>
                <span
                  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Default>
  );
}
