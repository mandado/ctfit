import { PlanForm, Plan } from "~/domain/plans/schema";
import type { OrganizationIdParams } from "./organization.server";
import { supabase } from "./user.server";

const TABLE = 'plans';

export async function getPlans({ organization_id }: OrganizationIdParams) {
  const { data } = await supabase
    .from(TABLE)
    .select("id,name")
    .eq("organization_id", organization_id);

  return data;
}

export async function createPlan(plan: PlanForm) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(plan)
    .single();

  if (!error) {
    return data;
  } else {
    throw error;
  }
}

export async function deletePlan({
  id,
  organization_id,
}: Pick<Plan, "id"> & OrganizationIdParams) {
  const { error } = await supabase
    .from(TABLE)
    .delete({ returning: "minimal" })
    .match({ id, organization_id });

  if (!error) {
    console.log(error);
    return {};
  }

  return null;
}

export async function getPlan({
  id,
  organization_id,
}: Pick<Plan, "id"> & OrganizationIdParams) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("organization_id", organization_id)
    .eq("id", id)
    .single();

  if (!error) {
    return data as Plan;
  }

  return null;
}

export async function updatePlan(id: string, plan: PlanForm) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(plan)
    .eq("id", id)
    .single();

  if (!error) {
    return data;
  }

  return null;
}
