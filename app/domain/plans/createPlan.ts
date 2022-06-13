import { makeDomainFunction } from "remix-domains";
import { createPlan } from "~/models/plan.server";
import { EnvironmentSchema } from "~/shared/schemas/environment";
import { PlanSchema } from "./schema";

export const createNewPlan = makeDomainFunction(
  PlanSchema,
  EnvironmentSchema
)(async (values, env) =>
  createPlan({ ...values, organization_id: env.organization_id as string })
);
