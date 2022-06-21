import { ClipboardCopyIcon } from "@heroicons/react/outline";
import { SortAscendingIcon, UsersIcon } from "@heroicons/react/solid";
import useClipboard from "react-use-clipboard";

export default function CopyUrl({ text }: { text: string }) {
  const [isCopied, setCopied] = useClipboard(text);

  return (
    <div className="mt-10 flex rounded-md shadow-sm">
      <div className="relative flex flex-grow items-stretch focus-within:z-10">
        <input
          defaultValue={text}
          readOnly
          className="block w-full rounded-none rounded-l-md border border-gray-300 bg-slate-50 px-4 text-slate-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="John Smith"
        />
      </div>
      <button
        type="button"
        onClick={setCopied}
        className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <ClipboardCopyIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <span>{isCopied ? "Copiado!" : "Copiar"}</span>
      </button>
    </div>
  );
}
