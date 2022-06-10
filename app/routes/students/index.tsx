import { Link } from "~/components/Link";

export default function StudentsIndexPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center p-6">
        <p className="text-center font-semibold">
          Nenhum aluno selecionado.
          <br />
          Clique em um aluno do lado esquerdo, ou:
        </p>

        <Link to="new" className="mt-4">
          Criar novo aluno
        </Link>
      </div>
    </div>
  );
}
