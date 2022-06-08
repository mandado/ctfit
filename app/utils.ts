import { useMemo } from "react";
import { useMatches } from "@remix-run/react";
import type { User } from "./models/user.server";
import { Organization } from "./domain/organizations/schema";

export function useMatchesData(id: string) {
  const matchingRoutes = useMatches();

  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );

  return route?.data;
}

export function isUser(user: User) {
  return user && typeof user === "object";
}
export function isOrganization(organization: Organization) {
  return organization && typeof organization === "object";
}

export function useOptionalUser() {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useOptionalOrganization() {
  const data = useMatchesData("root");
  if (!data || !isOrganization(data.organization)) {
    return undefined;
  }
  return data.organization;
}

export function useUser(): Pick<User, "id" | "email"> | never {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function useOrganization(): Pick<Organization, "id" | "name"> | never {
  const maybeOrganization = useOptionalOrganization();
  if (!maybeOrganization) {
    throw new Error(
      "No organization found in root loader, but user is required by useOrganization. If organization is optional, try useOptionalOrganization instead."
    );
  }
  return maybeOrganization;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}
