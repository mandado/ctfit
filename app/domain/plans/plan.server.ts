import { PlanForm, Plan } from "~/domain/plans/schema";
import type { OrganizationIdParams } from "../../models/organization.server";
import { supabase } from "../../models/user.server";

const TABLE = "plans";

export async function getPlans({ organization_id }: OrganizationIdParams) {
  const { data } = await supabase
    .from(TABLE)
    .select("id,name")
    .eq("organization_id", organization_id);

  return data;
}

export async function createPlan(
  plan: Omit<Plan, "updated_at" | "created_at" | "id">,
  modality_ids: string[]
) {
  const { data, error } = await supabase.from(TABLE).insert(plan).single();

  if (!error) {
    for (const modality_id of modality_ids) {
      const { error } = await supabase
        .from("plans_modalities")
        .insert({
          plan_id: data.id,
          modality_id,
          organization_id: plan.organization_id,
        })
        .single();

      if (error) {
        throw error;
      }
    }

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
    .eq("id", id)
    .eq("organization_id", organization_id);

  if (!error) {
    return {};
  }

  console.log(error);
  return null;
}

export async function getPlan({
  id,
  organization_id,
}: Pick<Plan, "id"> & OrganizationIdParams) {
  const { data, error } = await supabase
    .from(TABLE)
    .select(
      `
      *,
      plans_modalities(modality:modalities(id, name))
    `
    )
    .eq("organization_id", organization_id)
    .eq("id", id)
    .single();

  if (!error) {
    return data as Plan;
  }

  return null;
}

export async function updatePlan(
  id: string,
  plan: Omit<Plan, "updated_at" | "created_at" | "id">,
  modality_ids: string[]
) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(plan)
    .eq("id", id)
    .single();

  if (!error) {
    for (const modality_id of modality_ids) {
      const { error } = await supabase
        .from("plans_modalities")
        .insert({
          plan_id: id,
          modality_id,
          organization_id: plan.organization_id,
        })
        .single();

      if (error) {
        console.log(error);
        throw error;
      }
    }

    return data;
  }
  console.log(error);

  throw error;
}
