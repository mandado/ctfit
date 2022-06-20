import { makeDomainFunction } from "remix-domains";
import { updatePlan as updatePlanData } from "./plan.server";
import { EnvironmentSchema } from "~/shared/schemas/environment";
import { PlanSchema } from "./schema";
import { supabase } from "~/models/user.server";
import { id } from "date-fns/locale";

export const updatePlan = (id: string) =>
  makeDomainFunction(
    PlanSchema,
    EnvironmentSchema
  )(async (values, env) => {
    console.log(values);
    const { error } = await supabase
      .from("plans_modalities")
      .delete()
      .match({ plan_id: id, organization_id: env.organization_id });

    if (error) {
      console.log(error);
      throw error;
    }

    for (const { name: shift, value: price } of values.shifts) {
      await updatePlanData(
        id,
        {
          name: values.name,
          shift,
          price,
          organization_id: env.organization_id as string,
        },
        values.modalities
      );
    }
  });
