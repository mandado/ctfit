import { InformationCircleIcon } from "@heroicons/react/solid";
import type { ReactNode } from "react";

export default function Info({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md bg-blue-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700">{children}</p>
          {/* <p className="mt-3 text-sm md:mt-0 md:ml-6">
            <a
              href="#"
              className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
            >
              Details <span aria-hidden="true">&rarr;</span>
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
}
