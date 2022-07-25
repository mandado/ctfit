import { Link } from "@remix-run/react";

type ShellListItemProps = {
  title: string;
  subtitle: string;
  to: string;
};

export default function ShellListItem({
  title,
  subtitle,
  to,
}: ShellListItemProps) {
  return (
    <li>
      <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500 hover:bg-gray-50">
        <div className="min-w-0 flex-1">
          <Link to={to} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="truncate text-sm text-gray-500">{subtitle}</p>
          </Link>
        </div>
      </div>
    </li>
  );
}
