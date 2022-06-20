import { makeDomainFunction } from "remix-domains";
import { createPlan } from "./plan.server";
import { EnvironmentSchema } from "~/shared/schemas/environment";
import { PlanSchema } from "./schema";
import { SHIFTS } from "~/components/plans/forms/Shifts";

export const createNewPlan = makeDomainFunction(
  PlanSchema,
  EnvironmentSchema
)(async (values, env) => {
  for (const { name: shift, value: price } of values.shifts) {
    await createPlan(
      {
        name: `${values.name} - ${SHIFTS.get(shift)}`,
        shift,
        price,
        organization_id: env.organization_id as string,
      },
      values.modalities
    );
  }
});
