import type { Base } from "~/types/common/base";
import type { OrganizationIdParams } from "./organization.server";
import { supabase } from "./user.server";

import z from "zod";
import type { Merge } from "type-fest";

export const ModalitySchema = z.object({
  name: z.string().min(1, "Preencha o nome"),
});

export type Modality = Merge<ModalityFields, Base>;
export type ModalityFields = z.infer<typeof ModalitySchema>;

export async function getModalities({ organization_id }: OrganizationIdParams) {
  const { data } = await supabase
    .from("modalities")
    .select("id,name")
    .eq("organization_id", organization_id);

  return data;
}

export async function createModality(modality: ModalityFields) {
  const { data, error } = await supabase
    .from("modalities")
    .insert(modality)
    .single();

  if (!error) {
    return data;
  } else {
    throw error;
  }
}

export async function deleteModality({
  id,
  organization_id,
}: Pick<Modality, "id"> & OrganizationIdParams) {
  const { error } = await supabase
    .from("modalities")
    .delete({ returning: "minimal" })
    .match({ id, organization_id });

  if (!error) {
    console.log(error);
    return {};
  }

  return null;
}

export async function getModality({
  id,
  organization_id,
}: Pick<Modality, "id"> & OrganizationIdParams) {
  const { data, error } = await supabase
    .from("modalities")
    .select("*")
    .eq("organization_id", organization_id)
    .eq("id", id)
    .single();

  if (!error) {
    return data as Modality;
  }

  return null;
}
