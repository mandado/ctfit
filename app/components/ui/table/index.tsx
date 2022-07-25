import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { Link } from "~/components/app/Link";
import Button from "../button";

export function Table<T>({
  data,
  path,
  columns,
  onDelete
}: {
  data: any;
  path: string;
  columns: ColumnDef<any, any>[];
  onDelete: (data: T) => void
}) {
  const table = useReactTable({
    data,
    columns: columns.concat({
      accessorKey: "actions",
      header: "Ações",
      cell: (row) => (
        <div className="space-x-4">
          <Link size="small" to={`${path}/${row.row.original?.id}/edit`}>Editar</Link>
          <Button onClick={() => onDelete(row.row.original)} variant="cancel" size="small">Deletar</Button>
        </div>
      ),
    }),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full divide-y roundede divide-gray-300 border">
      <thead className="bg-gray-50">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="divide-x divide-gray-200">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {table.getRowModel().rows.map((row) => {
          const cells = row.getVisibleCells();
          return (
            <tr key={row.id} className="divide-x divide-gray-200">
              {cells.map((cell, cellIdx) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
