import { makeDomainFunction } from "remix-domains";
import { updatePlan as updatePlanData } from "~/models/plan.server";
import { EnvironmentSchema } from "~/shared/schemas/environment";
import { PlanSchema } from "./schema";

export const updatePlan = (id: string) =>
  makeDomainFunction(
    PlanSchema,
    EnvironmentSchema
  )(async (values, env) =>
    updatePlanData(id, { ...values, organization_id: env.organization_id })
  );
