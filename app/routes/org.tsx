import { Outlet } from "@remix-run/react";

export default function NotesPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
        <Outlet />
    </div>
  );
}
