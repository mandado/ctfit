import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import Default from "~/layout/Default";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

// export const loader: LoaderFunction = async ({ request }) => {
//   const userId = await requireUserId(request);
//   const noteListItems = await getNoteListItems({ userId });
//   return json({ noteListItems });
// };

export default function NotesPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-lg">
        <Outlet />
      </div>
    </div>
  );
}
