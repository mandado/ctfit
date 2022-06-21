import { CheckCircleIcon } from "@heroicons/react/outline";
import { Link } from "@remix-run/react";
import { ReactNode } from "react";

export default function SuccessMessageJoin({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mb-4 rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            Conta criada com sucesso
          </h3>
          <div className="mt-2 text-sm text-green-700">
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
