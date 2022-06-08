import { makeDomainFunction } from "remix-domains";
import { createOrganization } from "~/models/organization.server";
import { EnvironmentSchema } from "~/shared/schemas/environment";
import { OrganizationSchema } from "./schema";

export const createNewOrganization = makeDomainFunction(
  OrganizationSchema,
  EnvironmentSchema
)(async (values, env) =>
  createOrganization({ ...values, user_id: env.user_id as string })
);
