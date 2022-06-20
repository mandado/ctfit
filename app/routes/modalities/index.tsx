import { Link } from "~/components/app/Link";

export default function ModalitiesIndexPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center p-6">
        <p className="text-center font-semibold">
          Nenhuma modalidade selecionada.
          <br />
          Clique em uma modalidade do lado esquerdo, ou:
        </p>

        <Link to="new" className="mt-4">
          Criar nova modalidade
        </Link>
      </div>
    </div>
  );
}
