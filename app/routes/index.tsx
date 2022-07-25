import {
  AcademicCapIcon,
  CashIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { LoaderFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { MouseEvent } from "react";
import CopyUrl from "~/components/home/CopyUrl";
import { Button } from "~/components/ui/button";
import Default from "~/layout/Default";
import { requireOrganizationId } from "~/session.server";
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
    textLink: "Ir para página de modalidades",
    text: `Comece criando uma ou mais modalidades ou clique no botão setup para fazer setup de modalidades padrões do sistema.`,
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    key: "plan",
    title: "Crie um plano",
    textLink: "Ir para página de planos",
    href: "/plans",
    text: `Crie planos que serão usados pelos alunos ao criar conta. <br /> você pode criar plano como pacote, adicionando mais de uma modalidade.`,
    icon: CashIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    key: "students",
    title: "Cadastre um aluno",
    textLink: "Ir para página de alunos",
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

export default function Index() {
  const organization = useOrganization();
  const fetcher = useFetcher();
  const data = useLoaderData() as LoaderData;

  const isPopulated =
    organization?.configurations?.populated_modalities ||
    fetcher.data?.error === false;

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
      <div className="grid h-full w-full grid-cols-3 gap-6">
        {actions.map((action, actionIdx) => (
          <section
            className={cx(
              "overflow-hidden flex flex-col rounded-lg bg-white shadow",
              actionIdx < 2 ? "col-span-6" : "col-span-12"
            )}
          >
            <h4 className="flex gap-2 bg-gray-100 p-4 text-xl font-semibold text-gray-800">
              <QuestionMarkCircleIcon width="22" className="text-current" />
              {action.title}
            </h4>
            <p
              className="mt-2 h-full flex-grow p-4 text-sm text-gray-800"
              dangerouslySetInnerHTML={{ __html: action.text }}
            />
            {action.key === "students" && (
              <div className=" bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <InformationCircleIcon
                      className="h-5 w-5 text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">
                      Lembre-se de ativar em{" "}
                      <span className="font-bold">configurações</span> a opção{" "}
                      <span className="font-bold">cadastro de alunos</span> para
                      permitir cadastros no seu ct.
                    </p>
                    <p className="mt-3 text-sm md:mt-0 md:ml-6">
                      <Link
                        prefetch="intent"
                        to={action.href}
                        className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                      >
                        Ir para configurações{" "}
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )}
            <footer className="p-y divide-y divide-gray-200">
              <div
                className={cx(
                  (action.key === "modality" || action.key === "students") &&
                    "p-4"
                )}
              >
                {action.key === "modality" && !isPopulated && (
                  <Button
                    disabled={fetcher.state === "loading"}
                    className="w-full"
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
              <div className="flex p-4">
                <Link
                  prefetch="intent"
                  to={action.href}
                  className="tefocus:outline-none text-base font-medium text-gray-600"
                >
                  {action.textLink}
                </Link>
              </div>
            </footer>
          </section>
        ))}
      </div>
    </Default>
  );
}
